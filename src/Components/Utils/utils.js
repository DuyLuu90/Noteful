import React from 'react';
//import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFolderOpen, faEdit, faTrash,} from '@fortawesome/free-solid-svg-icons'
import './utils.css'

export function FolderList(props){
    const folders= props.folders||[]
    //const {folders,deleteFolder,openFolder}= props
    return (
        <div className='folder_list'>
            <div className='folderBox'>
                <span className='folderName' onClick={()=>props.displayAll()}>All folders</span>
            </div>
            {folders.map(folder=>
            <div className='folderBox' key={folder.id}>
              <span className='folderName' onClick={()=>props.openFolder(folder.id)} >{folder.name}</span>
              <FontAwesomeIcon icon={faTrash} className='icon'
              onClick={()=>props.deleteFolder(folder.id)}/>
            </div>)}
        </div>
    )
}

export function NoteBox(props={}){
    const {note}= props
    const d= new Date(note.modified).toDateString()
    const icons=[
        {name: faFolderOpen, method:()=>props.history.push(`/note/${note.id}`)},
        {name:faEdit, method:()=>props.history.push(`/updateNote/${note.id}`)},
        {name: faTrash, method:()=>props.deleteNote(note.id)},
    ]
    const buttons= ControlButtons(icons)
    return (
        <div className='noteBox'>
            <div className='noteNav'>
                <h3> {note.name} </h3>
                {buttons} 
            </div>
            <div className='noteFooter'>
                Modified on {d}
            </div>     
        </div>
    )
}
export function ControlButtons(icons=[]){
    return (
        <div>
            {icons.map((icon,index)=>
            <FontAwesomeIcon icon={icon.name} key={index}
            onClick= {icon.method}
            />)}
        </div>
    )

}
export function ValidationError(props){
    if(props.message) {
        return (
          <div className="error">{props.message}</div>
        );
      }
    
    return <></>
}
/*
function NoteButtons(props={}){
    const {history,noteId,deleteNote}=props
    return(
        <div>
            <FontAwesomeIcon icon={faFolderOpen} className='icon'
                onClick={()=>history.push(`/note/${noteId}`)}/>{' '}
            <FontAwesomeIcon icon={faEdit} className='icon'
                onClick={()=>history.push(`/updateNote/${noteId}`)}/>{' '}
            <FontAwesomeIcon icon={faTrash} className='icon'
                onClick={()=>deleteNote(noteId)}/>{' '}
        </div>
    )
}*/
