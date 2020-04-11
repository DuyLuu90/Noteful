import React from 'react';
import NoteCom from './Components/NoteCom'

export default function Main(props) {
    const allNotes= props.notes.map(note=>( <NoteCom note={note} key={note.id}/>))
    return (
        <div>
            {allNotes}
            <button type='button'>Add new note</button>
        </div>
    )
}

