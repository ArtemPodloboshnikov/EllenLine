const multer  = require("multer");
const markdown = require('markdown').markdown;
const showdown = require('showdown');
const converter = new showdown.Converter();
converter.setOption('tables', true);

function transliterate(word){
    let a = {"Ё":"YO","Й":"I","Ц":"TS","У":"U","К":"K","Е":"E","Н":"N","Г":"G","Ш":"SH","Щ":"SCH","З":"Z","Х":"H","Ъ":"'","ё":"yo","й":"i","ц":"ts","у":"u","к":"k","е":"e","н":"n","г":"g","ш":"sh","щ":"sch","з":"z","х":"h","ъ":"'","Ф":"F","Ы":"I","В":"V","А":"A","П":"P","Р":"R","О":"O","Л":"L","Д":"D","Ж":"ZH","Э":"E","ф":"f","ы":"i","в":"v","а":"a","п":"p","р":"r","о":"o","л":"l","д":"d","ж":"zh","э":"e","Я":"Ya","Ч":"CH","С":"S","М":"M","И":"I","Т":"T","Ь":"'","Б":"B","Ю":"YU","я":"ya","ч":"ch","с":"s","м":"m","и":"i","т":"t","ь":"'","б":"b","ю":"yu", " ":"_"};
    return word.split('').map(function (char) { 
      return a[char] || char; 
    }).join("");
  }
  
function filesUploader(path, mimetypes = ["image/png", "image/jpg", "image/jpeg", "image/svg+xml"]){
      const storageConfig = multer.diskStorage({
          destination: (req, file, cb) =>{
              cb(null, path);
          },
          filename: (req, file, cb) =>{
              cb(null, transliterate(file.originalname));
          }
      });
  
      const fileFilter = (req, file, cb) => {
          
          let flag = false;
  
          mimetypes.map(mimetype => {
  
              if (mimetype === file.mimetype)
              {
                  flag = true;
              }
              
          })
  
          cb(null, flag);
          
      }
  
      return multer({storage:storageConfig, fileFilter: fileFilter, limits : {fileSize : 1000000}}).array("photos[]");
  }

/**
 * Converting data from DB of buffer type to string
 * 
 * @param {array} array Array which contain a data from DB
 * @param {array} keys Array which contain a keys from specified in sql query
 * @return {array} New array with string data, number data don't convert to string
 * 
 * Annotation: args = [['title' => 'key from sql query'], ['id' => 'key from sql query', 'id_relax' => 'new name of field', true => 'converting value as string']]
 */
function ConvertDataToString(array, keys)
{
    let new_array = [];
    const isNumber = (val) => {

        if (!isNaN(val))
            return true;
        else
            return false;
    }
    array.map((elem)=>{
        let object = {};
        keys.map((key)=>{

            if (elem[key[0]] !== undefined)
            {
                if (key[1] != undefined)
                {
                    if (isNumber(elem[key[0]]))
                    {
                        if (key[2] != undefined)
                        {
                            object[key[1]] = elem[key[0]].toString();
                        }
                        else
                        {
                            
                            object[key[1]] = elem[key[0]]
                        }
                    }
                    else
                    {
                        object[key[1]] = elem[key[0]].toString();

                    }
                }
                else
                {

                    if (isNumber(elem[key[0]]))
                    {
                        object[key[0]] = (elem[key[0]] !== null)? elem[key[0]].toString() * 1 : null;
                    }
                    else
                    {
                        object[key[0]] = elem[key[0]].toString();

                    }
                }
            }

        })

        new_array.push(object);
    })

    return new_array;
} 

function sqlQueryUpdate(table, values)
{
    let sql = 'UPDATE ' + table + ' SET ';
    values.map((value)=>{

        if (value[1] !== undefined)
        {

            if (value[2] !== undefined)
            {
                sql += value[0] + ` = AES_ENCRYPT('${value[1]}', '${value[2]}'), `;    
            }
            else
            {
                
                sql += value[0] + ` = ${value[1]}, `;
            }
        }
    })

    sql = sql.substring(0, sql.length - 2);

    return sql;
} 

function multiplyConditions(sql, conditions, column, view)
{
    const isNumber = (value, password) =>{

        if (!isNaN(value))
        {
            value = parseInt(value);
        }
        else
        {
            value = `AES_ENCRYPT('${value}', '${password}')`;
        }

        return value;
    }
    
    let new_conditions = '';

    if (view == 'IN')
    {
        new_conditions = ` WHERE ${column} IN (${isNumber(conditions[0].value, conditions[0].password)}`;
        for (let i = 1; i < conditions.length; i++)
        {
    
            new_conditions += ', ' + isNumber(conditions[i].value, conditions[i].password)
        }
    
        new_conditions += ')'
        
    }
    else 
    if (view == '=')
    {
        new_conditions = ` WHERE ${column[0]} = ${isNumber(conditions[0].value, conditions[0].password)}`;
        for (let i = 1; i < conditions.length; i++)
        {
    
            new_conditions += ` AND ${column[i]} = ` + isNumber(conditions[i].value, conditions[i].password)
        }
    
    }

    return sql + new_conditions;
}

function parseMarkdownToHTML(object)
{

    if (typeof object == 'object')
    {
        
        for (let value of Object.values(object))
        {
            if (Array.isArray(value.content))
            {
                let temp_array = [];
                for (let item of value.content)
                {
                    temp_array.push(markdown.toHTML(item))
                }
    
                value.content = temp_array;
            }
            else
            {  
                value.content = markdown.toHTML(value.content);
            }
            
        }
    }
    else
    {
        console.log(converter.makeHtml(object)) 
        let result = markdown.toHTML(object);
        let checkHtml = /<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>/.test(result);

        if (!checkHtml)
        {
            result = converter.makeHtml(object);
        }
        return result;
    }
}

module.exports.transliterate = transliterate;
module.exports.filesUploader = filesUploader;
module.exports.ConvertDataToString = ConvertDataToString;
module.exports.sqlQueryUpdate = sqlQueryUpdate;
module.exports.multiplyConditions = multiplyConditions;
module.exports.parseMarkdownToHTML = parseMarkdownToHTML;
