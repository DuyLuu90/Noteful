import React from 'react'
import NoteButtons from './NoteButtons'
import NoteContext from '../../NoteContext'

export default class NoteBox extends React.Component {
    render() {
        const d= new Date(this.props.note.modified).toDateString()
        const noteId= this.props.note.id
        return (
            <NoteContext.Consumer>
            {value=>
                <div className='noteBox'>
                    <div className='noteNav'>
                        <h3> {this.props.note.name} </h3>
                        <NoteButtons noteId={noteId}/>   
                    </div>
                    <div className='noteFooter'>
                        Modified on {d}
                    </div>     
                </div>
                } 
            </NoteContext.Consumer> ) }    
}
