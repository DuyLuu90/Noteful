import React from 'react'
import {withRouter} from 'react-router-dom';
import NoteContext from '../NoteContext'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faFolderOpen, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

function NoteButtons (props) {
    return (
        <NoteContext.Consumer>
            {value=>
            <div>
                <FontAwesomeIcon icon={faFolderOpen} className='icon'
                onClick={()=>props.history.push(`/note/${props.noteId}`)}/>{' '}
                <FontAwesomeIcon icon={faEdit} className='icon'
                onClick={()=>props.history.push(`/updateNote/${props.noteId}`)}/>{' '}
                <FontAwesomeIcon icon={faTrash} className='icon'
                onClick={()=>{
                    value.deleteNote(props.noteId)
                    //props.history.push('/')
                }}/>{' '}
            </div>   
            }
        </NoteContext.Consumer>)
}
export default withRouter(NoteButtons)