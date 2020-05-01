import React from 'react';
import NoteContext from '../NoteContext';
import PropTypes from 'prop-types'
import './forms.css'

class AddNote extends React.Component {
    constructor (props) {
        super(props)
        this.state= {
            id: this.props.note.id,
            name: this.props.note.name,
            modified: new Date().toLocaleString(),
            folderId:  this.props.note.folderId,
            content: this.props.note.content
        }
    }
    static defaultProps= {
        note: {id:'',name:'',content:'', folderId:''},
    }
    getFolderName(folders,id) {
        const folder= folders.find(folder=>folder.id===id)
        if (folder) return folder.name
        else return ''
    }
    updateName(name) {
        this.setState({name})
    }
    updateFolderId(folderId) {  
        this.setState({folderId})
    }
    updateContent(content) {
        this.setState({content})
    } 
    updateId= (id) =>{
        this.setState({id})
    }
    generateRandomId=() => {
        const id = Math.random().toString(36).substring(2,4)+ Math.random().toString(36).substring(2,4)
        this.setState({id})
    }
    /*
    componentDidMount() {
        setInterval(()=>{
            const id = Math.random().toString(36).substring(2,4)+ Math.random().toString(36).substring(2,4)
            this.setState({id})
        },1000) }
    componentWillUnmount() {
        clearInterval(this.interval)
    }*/

    render() {
        return (
        <NoteContext.Consumer>
            {value=>
            <form>
                <h3>Add/Update note</h3>
                <div className='form_data'>
                    <label htmlFor='folderSelection'>Select a folder: </label>
                    <select name='folderSelection' id='folderSelection'
                    onChange={e=>this.updateFolderId(e.target.value)}>
                        <optgroup label='Default'>
                            <option value={this.state.folderId}>
                                {value.getFolderName(value.folders,this.state.folderId) }
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
                    <input type="text" name="noteName" id="noteName" value={this.state.name}
                    onChange={e=>this.updateName(e.target.value)}/>
                </div>
                <div className='form_data'>
                    <label htmlFor="noteContent">Content: </label>
                    <textarea type="text" name="noteContent" id="noteContent" value={this.state.content}
                    onChange={e=>this.updateContent(e.target.value)}/>
                </div>
                <div className='form_data'>
                    <label htmlFor="noteId">ID: </label>
                    <input type="text" name="noteId" id="noteId" value={this.state.id}
                    onChange={e=>this.updateId(e.target.value)}/>
                </div>

                <div className='form_control'>
                    <button type='button' 
                        onClick={(e)=>{
                            e.preventDefault();
                            this.props.history.goBack()}}>Back</button>
                    <button type='button' 
                        onClick={(e)=>{
                            e.preventDefault();
                            this.generateRandomId()}}>Generate random ID</button>
                    <button type='submit' className='save'
                        disabled={
                            (!this.state.id)||(!this.state.name)||
                            (!this.state.content)||(!this.state.folderId)}
                        onClick={(e)=>{
                            e.preventDefault();
                            console.log(this.state)
                            const id= this.props.note.id;
                            if (id.length !==0)  value.modifyNote(id, this.state)
                            else value.updateNote(this.state)}}>Save</button>
                </div>   
            </form> }
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

