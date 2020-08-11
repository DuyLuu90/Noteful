import React from 'react';
//import ValidationError from './ValidationError'
import {ValidationError} from '../Utils/utils'
import NoteContext from '../../Context/NoteContext';
import PropTypes from 'prop-types'
import {randomId, validateName,validateId, getFolderName} from '../../service/functions'
import './forms.css'

class AddNote extends React.Component {
    constructor (props) {
        super(props)
        this.notes=[]
        this.state= {
            id: {value:this.props.note.id, touch:false},
            name: {value:this.props.note.name, touch:false},
            modified: new Date().toLocaleString(),
            folderId:this.props.note.folderId,
            content: this.props.note.content,
            statusMessage: false
        }
    }
    static defaultProps= {
        note: {id:'',name:'',content:'', folderId:''},
    }
    updateName(name) {
        this.setState({name:{value:name,touch:true}})
    }
    updateId= (id) =>{
        this.setState({id:{value:id,touch:true}})
    }
    updateFolderId(folderId) {  
        this.setState({folderId})
    }
    updateContent(content) {
        this.setState({content})
    } 
    
    reset=()=> {
        const id= this.state.id
        const name=this.state.name
        this.setState({
            id: {...id, touch: false},
            name: {...name, touch: false},
            statusMessage:true
        }) 
    }
    hideStatusMessage=()=> {
        this.setState({statusMessage: false})
    }
    render() {
        return (
        <NoteContext.Consumer>
            {value=>{
            this.notes= value.notes;
            const nameError= validateName(this.notes,this.props.note.name,this.state.name.value)
            const idError=validateId(this.notes,this.props.note.id,this.state.id.value)
            const note = {
                id: this.state.id.value,
                name: this.state.name.value,
                modified: this.state.modified,
                content: this.state.content, 
                folderId: this.state.folderId}
            return(
            <form>
                <h3>Add/Update note</h3>
                <div className='form_data'>
                    <label htmlFor='folderSelection'>Select a folder: </label>
                    <select name='folderSelection' id='folderSelection'
                    onClick={this.hideStatusMessage}
                    onChange={e=>this.updateFolderId(e.target.value)}>
                        <optgroup label='Default'>
                            <option value={this.state.folderId}>
                                {getFolderName(value.folders,this.state.folderId) }
                            </option>
                        </optgroup>
                        <optgroup label='All folders'>
                            {value.folders.map(folderSelection=>(
                            <option value={folderSelection.id} key={folderSelection.id}>
                                {folderSelection.name}
                            </option>))}
                        </optgroup>  
                    </select>   
                </div>
                <div className='form_data'>
                    <label htmlFor="noteName">Name: </label>
                    <input type="text" name="noteName" id="noteName" value={this.state.name.value}
                    onClick={this.hideStatusMessage}
                    onChange={e=>this.updateName(e.target.value)}/>
                </div>
                {this.state.name.touch && <ValidationError message={nameError} />
                }
                <div className='form_data'>
                    <label htmlFor="noteContent">Content: </label>
                    <textarea type="text" name="noteContent" id="noteContent" value={this.state.content}
                    onClick={this.hideStatusMessage}
                    onChange={e=>this.updateContent(e.target.value)}/>
                </div>
                <div className='form_data'>
                    <label htmlFor="noteId">ID: </label>
                    <input type="text" name="noteId" id="noteId" value={this.state.id.value}
                    onClick={this.hideStatusMessage}
                    disabled={this.props.note.id}
                    onChange={e=>this.updateId(e.target.value)}/>
                </div>
                {this.state.id.touch && (
                <ValidationError message={idError} />)
                }
                {this.state.statusMessage && <div style={{color:'red'}}>Your entries've been saved. You can add more items or go back!</div>}
                <div className='form_control'>
                    <input type='button' value='Back'
                        onClick={()=>this.props.history.goBack()}/>
                    <input type='button' value='Generate random ID'
                        onClick={()=>this.updateId(randomId())}/>

                    <input type='button' className='save' value='Save'
                        disabled={
                            (nameError)||(idError)||
                            (!this.state.content)||(!this.state.folderId)}
                        onClick={()=>{
                            const id= this.props.note.id;
                            if (id.length !==0) value.modifyNote(id, note)  
                            else value.updateNote(note);
                            this.reset() ; }}/>
                </div>   
            </form>)}}
        </NoteContext.Consumer> )
    }
}

AddNote.propTypes = {
    //note: PropTypes.object.isRequired, 
    note: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        folderId: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
    })
}

export default AddNote;

