import React from 'react';
//import ValidationError from './ValidationError'
import {ValidationError} from '../Utils/utils'
import NoteContext from '../../Context/NoteContext'
import './forms.css'
import {validateName} from '../../service/functions'
import {NotefulApiServices} from '../../service/api-service'

class AddFolder extends React.Component {
    constructor(props) {
        super(props)
        this.folders= [];
        this.state = {
            name: {value:'', touched: false},
            statusMessage: false
        }
    }
    static defaultProps={
        history: {}
    }
    onChange= e=>{
        const key= e.target.name;
        const newValue= e.target.value;
        this.setState({[key]:{value: newValue,touch:true}})
    }
    handleSubmit= e=>{
        e.preventDefault()
        const {name}= e.target
        const data= {name: name.value}
        NotefulApiServices.postItem('notes',data)
            .then(folder=>{
                name.value=''
                this.reset()
                this.props.onSuccess()
            })
    }
    reset=()=> {
        this.setState({
            name: {value:'',touched:false},
            statusMessage: true,})
    }

    hideStatusMessage=()=> this.setState({statusMessage: false})
    
    render() {
        return (
        <NoteContext.Consumer>
        {(value={})=>{
        this.folders= value.folders
        const nameError= validateName(this.folders,'', this.state.name.value)
        return(
        <form>
            <h3>Add new folder</h3>
            <div className='form_data'>
                <label htmlFor="name">Enter Name: </label>
                <input type="text" name="name" id="name"
                value={this.state.name.value}
                onClick={this.hideStatusMessage}
                onChange={this.onChange} />
            </div>
            {this.state.name.touched && <ValidationError message={nameError} />}
            
            {this.state.statusMessage && <div style={{color:'red'}}>Your entrie have been saved. You can add more items or go back!</div>}
            
            <div className='form_control'>
                <input type='button' value='Back'
                    onClick={()=>this.props.history.goBack()}/>
                <input type='submit' className='save' value='Save'
                    disabled={(nameError)}/>
            </div>    
        </form>)} }
        </NoteContext.Consumer>)
    }
}
export default AddFolder
