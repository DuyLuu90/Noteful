import React from 'react'
import NoteCom from './Components/NoteCom'

export default function Note(props) {
    const note= props.notes.find(note=>note.id===props.match.params.noteId)
    return (
        <div>
            <NoteCom note={note} />
            <div className='content'>
                {note.content}
            </div>
            <button onClick={()=>props.history.goBack()}>
                GO BACK
            </button>
        </div>

    )
}