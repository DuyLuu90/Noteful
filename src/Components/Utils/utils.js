import React from 'react';
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrash,} from '@fortawesome/free-solid-svg-icons'
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
              <div>
                <Link to={`/forms/folders/${folder.id}`}aria-label="edit-form">
                    <FontAwesomeIcon icon={faEdit} className='icon'/>
                </Link>
                <FontAwesomeIcon icon={faTrash} className='icon'
                onClick={()=>props.deleteFolder('folders',folder.id)}/>
              </div>
            </div>)}
        </div>
    )
}

export function NoteBox(props={}){
    const {note}= props
    const d= new Date(note.modified).toDateString()
    return (
        <div className='noteBox'>
            <div className='noteNav'>
                <div className='note_title'> 
                    <Link to={`/notes/${note.id}`} aria-label="note-details">
                        {note.name} 
                    </Link>
                </div>
                <div>
                    <Link to={`/forms/notes/${note.id}`} aria-label="edit-note">
                        <FontAwesomeIcon icon={faEdit} className='icon'/>
                    </Link>
                    <FontAwesomeIcon icon={faTrash} className='icon'
                    onClick={()=>props.deleteNote('notes',note.id)}/>
                </div>
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

/*
    const icons=[
        {name: faFolderOpen, method:()=>props.history.push(`/note/${note.id}`)},
        {name:faEdit, method:()=>props.history.push(`/forms/notes/${note.id}`)},
        {name: faTrash, method:()=>props.deleteNote('notes',note.id)},
    ]
*/
