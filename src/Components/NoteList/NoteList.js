import React, {Component} from 'react'
import {NoteBox,FolderList} from '../Utils/utils'
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faBars } from '@fortawesome/free-solid-svg-icons'

import '../Components.css'
import {NotefulApiServices} from '../../service/api-service'

export default class NoteList extends Component {
    static defaultProps={
        match: {params:{}},
        notes: [],
        folders:[],
        onSuccess: ()=>{},
        location:{pathname:''}
    }
    state= {
        title: 'All Notes',
        notes: this.props.notes,
        folders:this.props.folders, 
        displayNav: false,
    }
    /*
    id= this.props.location.pathname.split('/')
    componentDidMount(){
        console.log(this.id)
    }*/
    /*
    componentDidMount(){
        NotefulApiServices.getAllItems('folders').then(json=>this.setState({folders:json}))
        NotefulApiServices.getAllItems('notes').then(json=>this.setState({notes:json}))
    }*/
    displayNav= ()=> {
        const boolean= (this.state.displayNav)? false: true
        this.setState({displayNav: boolean})
    }
    openFolder=(id)=>{
        const folder= this.state.folders.find(folder=>folder.id===id)
        NotefulApiServices.getAllItems('notes').then(json=>{
            const notes= json.filter(note=>note.folderid===id)
            this.setState({notes: notes, title: folder.name, displayNav: false})
        })
    }
    deleteFolder=(id)=>{
        NotefulApiServices.deleteItemById('folders',id)
            .then(()=>this.props.onSuccess()).catch(err=>console.log(err))
    }
    displayAll=()=>{
        NotefulApiServices.getAllItems('notes').then(json=>{
            this.setState({
                notes:json, title:'All Notes', displayNav:false,
            })
        })
    }
    renderNav(){
        return(
        <div className='mainNav'>
            <div id='nav_folder'>
                <div className='mainNav_control'>
                    <span><FontAwesomeIcon icon={faBars} onClick={this.displayNav}/></span>
                    <span className='count'>{this.state.folders.length}</span>
                    <span className='add'>
                        <Link to={`/forms/folders`} aria-label="add-folder" >
                            <FontAwesomeIcon icon={faPlus}/>
                        </Link>
                    </span>
                </div>
                <span className='mainNav_title'>{this.state.title}</span>
            </div>
            <div id='nav_note'>
                <span className='mainNav_title'>Total:</span>
                <div className='mainNav_control'>
                    <span className='count'>{this.state.notes.length}</span>
                    <span className='add'>
                        <Link to={`/forms/notes`} aria-label="add-note">
                            <FontAwesomeIcon icon={faPlus}/>
                        </Link>
                    </span>
                </div>
            </div>  
        </div>
        )
    }

    deleteItem=(name,id)=>{
        NotefulApiServices.deleteItemById(name,id)
            .then(()=>this.props.onSuccess()).catch(err=>console.log(err))
    }
    renderNotes(){
        const {notes}= this.state
        return(
            <div className='noteList'>
                {notes.map((note,index)=><NoteBox {...this.props} deleteNote={this.deleteItem}
                key={index} note={note}/>)}
            </div>
        )
    }
    render(){
        const notes= this.renderNotes()
        const nav= this.renderNav()
        return(
            <div>
                {nav}
                <div className='main'>
                    {this.state.displayNav && 
                        <FolderList displayAll={this.displayAll} deleteFolder={this.deleteItem}
                        folders={this.state.folders} openFolder={this.openFolder}/>}
                    {notes}
                </div>
            </div>
        )
    }
}
