import React from 'react';
import NoteContext from '../../Context/NoteContext';
import PropTypes from 'prop-types'
//import {validateNote} from '../../service/functions'
import './forms.css'
import {NotefulApiServices} from '../../service/api-service'

class AddNote extends React.Component {
    constructor (props) {
        super(props)
        this.notes=[]
        this.id= Number(this.props.location.pathname.split('/')[3])
        this.state= {
            folderid:{value:'', touch:false},
            name: {value:'', touch:false},
            content: {value:'', touch:false},
            statusMessage: false
        }
    }
    static defaultProps= {
        history: {},
        match: {params:{}},
        location: {pathname:''},
    }
    componentDidMount(){
        if(this.id) {
            NotefulApiServices.getItemById('notes',this.id)
            .then(json=>this.setState({
                folderid: {...this.state.folderid, value:json.folderid},
                name: {...this.state.name, value: json.name},
                content: {...this.state.content, value: json.content}
            }))
        }
    }
    onChange= e=>{
        const key= e.target.name;
        const newValue= e.target.value;
        this.setState({[key]:{value: newValue,touched:true}, statusMessage:false})
    }
    handleSubmit= e=>{
        e.preventDefault()
        const {folderid,name,content}= e.target
        const data= {
            folderid: folderid.value,
            name: name.value,
            content: content.value
        }
        const {id}= this
        if (id) {
            NotefulApiServices.patchItemById('notes',Number(id),data)
                .then(()=>{
                    console.log(name.value)
                    this.props.onSuccess()
                    this.props.history.push('/')
                }).catch(err=>console.log(err))
        }
        else {
            NotefulApiServices.postItem('notes',data)
            .then(folder=>{
                name.value=''
                //this.reset()
                this.setState({statusMessage:true})
                this.props.onSuccess()
            })
        }  
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
        const {folderid,name,content}= this.state
        return (
        <NoteContext.Consumer>
            {value=>{
            //const nameError= validateNote(value.notes,name.value,folderid.value)
            return(
            <form onSubmit={this.handleSubmit}>
                <h3>Add/Update note</h3>
                <div className='form_data'>
                    <label htmlFor='folderid'>Select a folder: </label>
                    <select name='folderid' id='folderid' value={folderid.value} onChange={this.onChange}>
                        <option value=''></option>
                        {value.folders.map(folder=>(
                        <option value={folder.id} key={folder.id}>
                            {folder.name}
                        </option>))} 
                    </select>   
                </div>
                <div className='form_data'>
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" id="name" value={name.value}
                    onChange={this.onChange}/>
                </div>
                
                <div className='form_data'>
                    <label htmlFor="content">Content: </label>
                    <textarea type="text" name="content" id="content" value={content.value}
                    onChange={this.onChange}/>
                </div>
        
                {this.state.statusMessage && <div style={{color:'red'}}>Your entries've been saved. You can add more items or go back!</div>}
                <div className='form_control'>
                    <input type='button' value='Back'
                        onClick={()=>this.props.history.goBack()}/>
                    <input type='submit' className='save' value='Save'
                        disabled={
                            (!this.state.content)||(!this.state.folderid)}/>
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

/*
{this.state.name.touch && <div className="error">{nameError}</div>}
 */