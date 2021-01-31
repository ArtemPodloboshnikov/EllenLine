import {useState} from 'react'
import classes from './FilesUploader.module.scss';

const FilesUploader = (props) => {

    const [drag, setDrag] = useState(false);
    const [countFiles, setCountFiles] = useState(0);
    function FileListItems(files){
        let b = new ClipboardEvent("").clipboardData || new DataTransfer()
        for (let i = 0, len = files.length; i<len; i++) b.items.add(files[i])
        return b.files
    }
    const onDragStart = (e) =>{

        e.preventDefault()
        setDrag(true);

    }
    const onDragLeave = (e) =>{

        e.preventDefault()
        setDrag(false);

    }
    const onDrop = (e) =>{

        e.preventDefault()
        let files = [...e.dataTransfer.files];
        console.log(files);
        document.getElementsByName(props.name)[0].files = new FileListItems(files);
        setDrag(false);
        setCountFiles(files.length);
    }
    const changeInputFile = () => {

        const files = document.getElementsByName(props.name);
        setCountFiles(files[0].files.length);
    }
    return (
        <div className={classes.wrap + ' ' + props.className}>
            <input onChange={changeInputFile} ref={props.register} name={props.name} id={classes.file} type='file' multiple={true}/>
            {props.placeholder? <div className={classes.placeholder + ' ' + props.classPlaceholder}>{props.placeholder}</div> : ''}
            {
                drag? 
                <div className={classes.drag + ' ' + props.classInput}
                     onDragStart={onDragStart}
                     onDragLeave={onDragLeave}
                     onDragOver={onDragStart}
                     onDrop={onDrop}
                >Отпустите файлы, чтобы загрузить их</div>
                :
                <label for={classes.file} className={classes.drop + ' ' + props.classInput}
                     onDragStart={onDragStart}
                     onDragLeave={onDragLeave}
                     onDragOver={onDragStart}
                >{countFiles? countFiles + ' файла': 'Перетащите файлы, чтобы загрузить их'}</label>
            }
        </div>
    )
}

export default FilesUploader
