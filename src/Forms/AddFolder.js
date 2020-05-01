import React from 'react';
import ValidationError from './ValidationError'
import NoteContext from '../NoteContext'
import './forms.css'


class AddFolder extends React.Component {
    constructor(props) {
        super(props)
        this.folders= [];
        this.state = {
            name: {value:'', touched: false},
            id: {value:'', touched: false},
            addedItem: []
        }
    }
    //folders = [] //->AddFolder.folders

    updateName(name) {
        this.setState({name:{value:name, touched: true}})
    }
    validateName= ()=> {
        const name = this.state.name.value.trim().toLocaleLowerCase()
        const folder= this.folders.find(folder=>folder.name.toLocaleLowerCase()===name)
        if (name.length === 0) return 'Name is required'
        else if (name.length < 3) return 'Name must be at least 3 characters long'
        else if (folder) return 'Name already exists' 
    }
    validateId() {
        const id = this.state.id.value.trim();
        const folder=this.folders.find(folder=>folder.id===id)
        if (id.length === 0) return 'ID is required'
        else if (id.length < 8) return 'ID must be at least 8 characters long'
        else if (folder) return 'ID already exists' 
    }
    updateId(id) {
        this.setState({id:{value:id, touched: true}})
    }
    generateRandomId=(e) => {
        e.preventDefault();
        const id = Math.random().toString(36).substring(2,6)+ Math.random().toString(36).substring(2,6)
        this.setState({id:{value:id, touched: true}})
    }
    reset=()=> {
        this.setState({
            name: {value:'',touched:false},
            id: {value:'',touched:false}
        })
    }
    
    render() {
        return (
        <NoteContext.Consumer>
        {(value={})=>{
        this.folders= value.folders
        const nameError= this.validateName()
        const idError=this.validateId()
        const folder= {
            name: this.state.name.value,
            id: this.state.id.value}
        return(
        <form>
            <h3>Add new folder</h3>
            <div className='form_data'>
                <label htmlFor="folderName">Enter Name: </label>
                <input type="text" name="folderName" id="folderName"
                value={this.state.name.value}
                onChange={e=>this.updateName(e.target.value)}/>
            </div>
            {this.state.name.touched && (
                <ValidationError message={nameError} />)
            }
            <div className='form_data'>
                <label htmlFor="folderId">Folder ID: </label>
                <input type="text" name="folderId" id="folderId"
                value= {this.state.id.value}
                onChange={e=>this.updateId(e.target.value)}/>
            </div>
            {this.state.id.touched && (
                <ValidationError message={idError} />)
            }
            <div className='form_control'>
                <button type='button' onClick={(e)=>{
                    e.preventDefault()
                    this.props.history.goBack()}}>Back</button>
                <button type='button' 
                    onClick={(e)=>this.generateRandomId(e)}>Generate random ID</button>
                <button type='submit' className='save'
                    disabled={(this.validateName())||(this.validateId())}
                    onClick={(e)=>{
                        e.preventDefault()
                        value.updateFolder(folder)
                        this.reset();}}>Save</button>
            </div>    
        </form>)} }
        </NoteContext.Consumer>)
    }
}
export default AddFolder
