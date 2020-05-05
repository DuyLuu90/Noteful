import React from 'react';
import ValidationError from '../ValidationError'
import NoteContext from '../../NoteContext'
import '../forms.css'
import {randomId, validateId, validateName} from '../../functions'


class AddFolder extends React.Component {
    constructor(props) {
        super(props)
        this.folders= [];
        this.state = {
            name: {value:'', touched: false},
            id: {value:'', touched: false},
            statusMessage: false
        }
    }

    updateName(name) {
        this.setState({name:{value:name, touched: true}})
    }
    
    updateId(id) {
        this.setState({id:{value:id, touched: true}})
    }
    reset=()=> {
        this.setState({
            name: {value:'',touched:false},
            id: {value:'',touched:false},
            statusMessage: true,})
    }

    hideStatusMessage=()=> {
        this.setState({statusMessage: false})
    }
    
    render() {
        return (
        <NoteContext.Consumer>
        {(value={})=>{
        this.folders= value.folders
        const nameError= validateName(this.folders,'', this.state.name.value)
        const idError= validateId(this.folders,'',this.state.id.value)
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
                onClick={this.hideStatusMessage}
                onChange={e=>this.updateName(e.target.value)} />
            </div>
            {this.state.name.touched && (
                <ValidationError message={nameError} />)
            }
            <div className='form_data'>
                <label htmlFor="folderId">Folder ID: </label>
                <input type="text" name="folderId" id="folderId" 
                value= {this.state.id.value}
                onClick={this.hideStatusMessage}
                onChange={e=>this.updateId(e.target.value)}/>
            </div>
            {this.state.id.touched && (
                <ValidationError message={idError} />)
            }
            {this.state.statusMessage && <div style={{color:'red'}}>Your entrie have been saved. You can add more items or go back!</div>}
            
            <div className='form_control'>
                <input type='button' value='Back'
                    onClick={()=>this.props.history.goBack()}/>
                <input type='button' value='Generate random ID'
                    onClick={()=>this.updateId(randomId())}/>
                <input type='button' className='save' value='Save'
                    disabled={(nameError)||(idError)}
                    onClick={()=>{
                        value.updateFolder(folder)
                        this.reset();}}/>
            </div>    
        </form>)} }
        </NoteContext.Consumer>)
    }
}
export default AddFolder
