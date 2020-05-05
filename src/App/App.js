import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import './App.css';
import NoteContext from '../NoteContext';

//Main Components
import Lists from '../Lists/Lists'
import NoteContent from '../NoteContent/NoteContent'
//Form Components
import AddFolder from '../Forms/AddFolderForm/AddFolder'
import AddNote from '../Forms/AddNoteForm/AddNote'


class App extends Component {
  constructor(props) {
    super(props)
    this.state= {
      notes: [],
      folders: [],
      //folders: [{name:'',id:''}] ,
      error: ''
    }
  }
  componentDidMount() {
    const url= 'http://localhost:9090'
    fetch(`${url}/folders`)
    .then(resp=>{
      console.log(resp)
      if (!resp.ok) throw new Error()
      else return resp.json()})
    .then(json=>{
      console.log(json)
      this.setState({folders:json})})
    .catch(error=>{
      console.log(error);
      this.setState({error: 'Something went wrong with the server. Please check again later!'})})

    fetch(`${url}/notes`)
    .then(resp=>{
      if (!resp.ok) throw new Error()
      else return resp.json()})
    .then(json=>this.setState({notes:json}))
    .catch(error=>{
      console.log(error);
      this.setState({error: 'Something went wrong with the server. Please check again later!'})})
  }
  /*
addFolder = (obj) => {
  const url= 'http://localhost:9090'
  fetch(`${url}/folders`, {
    method: 'POST', 
    body: JSON.stringify(obj)
  })}*/

  deleteFolder = folderId => {
    console.log('Folder',folderId, 'has been deleted')
    this.setState({
      folders: this.state.folders.filter(folder=>folder.id !== folderId),
      notes: this.state.notes.filter(note=>note.folderId !== folderId)
    })
  }
  deleteNote = noteId => {
    console.log('Note',noteId, 'has been deleted')
    this.setState({
      notes: this.state.notes.filter(note=>note.id !== noteId)
    })
  }
  updateFolder= folder=> {
    const newFolders= [...this.state.folders, folder]
    this.setState({folders: newFolders})
  }
  modifyNote=(id,newNote) => {
    /*
    const index= this.state.notes.findIndex(note=>note.id===id)
    const newNotes = this.state.notes.slice(0,index)
    const newNote1= this.state.notes.slice(index+1)
    const newNotes1= [...newNotes, newNote,...newNote1]
    */
    const newNotes=this.state.notes.map(note=>{
      if (note.id===id) note=newNote
      return note})
    this.setState({notes: newNotes})  
  }
  updateNote=(note) =>{
    const newNotes= [...this.state.notes, note]
    this.setState({notes: newNotes})  
  }
  findNote=(id)=>{
    return this.state.notes.find(note=>note.id===id)
  }

  render () {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteFolder: this.deleteFolder,
      deleteNote: this.deleteNote,
      updateFolder: this.updateFolder,
      updateNote: this.updateNote,
      modifyNote: this.modifyNote,
    }
    
    return (
      <NoteContext.Provider value={value}>
        <div className="App">
          <nav>
            <Link to='/' className='home'>Noteful</Link>
            <div>
              <Link to={`/updateFolder`} className='route'>Add new folder</Link> 
              <Link to={`/updateNote`} className='route'>Add new note</Link> 
            </div>
          </nav> 

          <main>
            
            <Route exact path='/' component={Lists} />   
            <Route path='/folder/:folderId' component={Lists} /> 
            <Route path='/note/:noteId' component={NoteContent} /> 

            <Route path='/updateFolder' component={AddFolder} />  
            <Route exact path='/updateNote' component={AddNote} />  
            <Route path='/updateNote/:noteId' component={(props)=>{
                const note= this.findNote(props.match.params.noteId)
                return <AddNote history={props.history} note={note} />}} />
          </main> 

          {this.state.error.length!==0 && <div className='promiseError'>{this.state.error}</div>}
            
        </div>
      </NoteContext.Provider>
    );
  }    
}

export default App;
