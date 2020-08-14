import React from 'react';
//import ValidationError from './ValidationError'
import NoteContext from '../../Context/NoteContext'
import './forms.css'
import {validateName} from '../../service/functions'
import {NotefulApiServices} from '../../service/api-service'

class AddFolder extends React.Component {
    constructor(props) {
        super(props)
        this.folders= [];
        this.id= Number(this.props.location.pathname.split('/')[3])
        this.state = {
            name: {value:'', touched: false},
            statusMessage: false
        }
    }
    static defaultProps={
        history: {},
        match: {params:{}},
        location: {pathname:''}
    }
    componentDidMount(){
        const {id}= this
        if(id) {
            NotefulApiServices.getItemById('folders',id)
                .then(json=>this.setState({name:{...this.state.name, value: json.name}}))
        }
    }
    onChange= e=>{
        const key= e.target.name;
        const newValue= e.target.value;
        this.setState({[key]:{value: newValue,touched:true}, statusMessage:false})
    }
    handleSubmit= e=>{
        e.preventDefault()
        const {name}= e.target
        const data= {name: name.value}
        const {id}= this
        if (id) {
            NotefulApiServices.patchItemById('folders',Number(id),data)
                .then(()=>{
                    this.props.onSuccess()
                    this.props.history.push('/')
                }).catch(err=>console.log(err))
        }
        else {
            NotefulApiServices.postItem('folders',data)
            .then(folder=>{
                name.value=''
                this.setState({statusMessage:true})
            })
        }  
    }
    
    render() {
        return (
        <NoteContext.Consumer>
        {(value={})=>{
        const folders= value.folders
        const nameError= validateName(folders,this.state.name.value)
        return(
        <form onSubmit={this.handleSubmit}>
            <h3>Add new folder</h3>
            <div className='form_data'>
                <label htmlFor="name">Enter Name: </label>
                <input type="text" name="name" id="name"
                value={this.state.name.value}
                onChange={this.onChange} />
            </div>
            {this.state.name.touched && <div className="error">{nameError}</div>}
            
            {this.state.statusMessage && 
            <div style={{color:'red'}}>Your entrie have been saved. You can add more items or go back!</div>}
            
            <div className='form_control'>
                <input type='button' value='Back'
                    onClick={()=>{
                        this.props.onSuccess()
                        this.props.history.goBack()}}/>
                <input type='submit' className='save' value='Save'
                    disabled={(nameError)}/>
            </div>    
        </form>)} }
        </NoteContext.Consumer>)
    }
}
export default AddFolder
