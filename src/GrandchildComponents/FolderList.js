import React from 'react';
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import NoteContext from '../NoteContext'
import './GrandChild.css'

export default function FolderList() {
    return(
      <NoteContext.Consumer>
        {value=>
          <div className='folder_list'>
            <header>
              <div className='title'>Folder List</div>
              <div className='counter'>
                <div className='count'>{value.folders.length}</div>
                <Link to={`/updateFolder`} className='add'><FontAwesomeIcon icon={faPlus}/></Link>
              </div>
            </header>
            {value.folders.map(folder=>
            <div className='folderBox' key={folder.id}>
              <Link to={`/folder/${folder.id}`}  className='folderName'>
              {folder.name}
              </Link>
              <FontAwesomeIcon icon={faTrash} className='icon'
              onClick={()=>value.deleteFolder(folder.id)}/>
            </div>
               )}
          </div>
        }
      </NoteContext.Consumer>
        
    )
}