import React from 'react';
import {Link} from 'react-router-dom'

export default function Folder(props) {
    return(
        <form className='folder_list'>
            {props.folders.map(folder=>
              <Link to={`/folder/${folder.id}`} key={folder.id}>
                {folder.name}
              </Link> )}
            <button type='button'>Add new folder</button>
        </form>
    )
}