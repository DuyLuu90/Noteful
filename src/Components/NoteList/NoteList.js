import React from 'react'
import NoteBox from './NoteBox' 
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus } from '@fortawesome/free-solid-svg-icons'

function NoteList(props) {
    return (  
        <div className='noteList'>
            <header>
                <div className='title'>
                    {props.title}
                </div>
                <div className='counter'>
                    <div className='count'>{props.notes.length}</div>
                    <Link to={`/updateNote`} className='add'><FontAwesomeIcon icon={faPlus}/></Link>
                </div>  
            </header> 
            <div className='note_list'>
                {props.notes.map(note=>(<NoteBox note={note} key={note.id}/> ))} 
            </div>       
        </div> )          
}
NoteList.defaultProps = {
    title: '',
    notes: []
}
export default NoteList;