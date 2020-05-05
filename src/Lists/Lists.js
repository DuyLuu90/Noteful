import React from 'react';
import {withRouter} from 'react-router-dom'
import NoteContext from '../NoteContext'
import FolderList from '../Components/FolderList/FolderList'
import NoteList from '../Components/NoteList/NoteList'
import {getFolderName} from '../functions'


function Lists(props) {
    let notes;
    let title;
    return (
    <NoteContext.Consumer>
        {value=>{
            if (props.match.params.folderId) {
                const folderId=props.match.params.folderId;
                const folderName= getFolderName(value.folders,folderId)
                title = `Notes | ${folderName}`
                notes= value.notes.filter(note=>note.folderId===folderId);
            }
            else {
                title= 'All Notes';
                notes= value.notes;
            }
            return (
                <div className='main'>
                    <FolderList />
                    <NoteList notes={notes} title={title}/>
                </div>)
        }}
    </NoteContext.Consumer>
        
    )
}
export default withRouter(Lists) 