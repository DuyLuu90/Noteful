import React from 'react'
import NoteCom from './Components/NoteCom'

export default function Notes(props) {
    const fileredNotes= props.notes.filter(note=>note.folderId===props.match.params.folderId).map(note=>(
    <NoteCom note={note} key={note.id}/> ))
    return (  
        <div>
            {fileredNotes}
            <button type='button'>Add new note</button>        
        </div>
        
    )          
}