import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import {NoteBox} from '../Utils/utils'
import NoteContext from '../../Context/NoteContext'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'

export default function NoteDetails(props) {
    const {id}= props.match.params
    return (
        <NoteContext.Consumer>
            {value=>{
                const errorMessage= 'The page content does not exist or it has been deleted. Please go back!'
                const note= value.notes.find(note=>note.id===Number(id)) || {content: errorMessage}
                return (
                    <div className='main'>
                        <h3 className='back'onClick={()=>props.history.goBack()}>
                            <FontAwesomeIcon icon={faArrowAltCircleLeft} className='icon'/>
                        </h3>
                        <div className='note_details'>
                            <ErrorBoundary>
                                {note.name && <NoteBox note={note} deleteNote={value.deleteItem}/>}
                                <div className='content'>
                                    {(note.content===errorMessage)
                                    ?<div style={{color:'red'}}>{errorMessage}</div>
                                    :note.content}
                                </div>
                            </ErrorBoundary>  
                        </div>
                    </div>)
            }}    
        </NoteContext.Consumer>
    )
}