const multer  = require("multer");

function transliterate(word){
    let a = {"Ё":"YO","Й":"I","Ц":"TS","У":"U","К":"K","Е":"E","Н":"N","Г":"G","Ш":"SH","Щ":"SCH","З":"Z","Х":"H","Ъ":"'","ё":"yo","й":"i","ц":"ts","у":"u","к":"k","е":"e","н":"n","г":"g","ш":"sh","щ":"sch","з":"z","х":"h","ъ":"'","Ф":"F","Ы":"I","В":"V","А":"a","П":"P","Р":"R","О":"O","Л":"L","Д":"D","Ж":"ZH","Э":"E","ф":"f","ы":"i","в":"v","а":"a","п":"p","р":"r","о":"o","л":"l","д":"d","ж":"zh","э":"e","Я":"Ya","Ч":"CH","С":"S","М":"M","И":"I","Т":"T","Ь":"'","Б":"B","Ю":"YU","я":"ya","ч":"ch","с":"s","м":"m","и":"i","т":"t","ь":"'","б":"b","ю":"yu", " ":"_"};
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
 * Annotation: args = [['title' => 'key from sql query'], ['id' => 'key from sql query', 'id_relax' => 'new name of field']]
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

            if (elem[key[0]] != undefined)
            {
                if (key[1] != undefined)
                {
                    if (isNumber(elem[key[0]]))
                    {

                        object[key[1]] = elem[key[0]]
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

                        object[key[0]] = elem[key[0]]
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

module.exports.transliterate = transliterate;
module.exports.filesUploader = filesUploader;
module.exports.ConvertDataToString = ConvertDataToString;
