import React, {Component} from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import './App.css';
import NoteContext from '../Context/NoteContext';
import {NotefulApiServices} from '../service/api-service'

//Main Components
import NoteList from '../Components/NoteList/NoteList'
//import NoteContent from '../NoteContent/NoteContent'
import AddFolder from '../Components/Forms/AddFolder'
import AddNote from '../Components/Forms/AddNote'
import NotFoundPage from '../Components/NotFoundPage/NotFoundPage'

class App extends Component {
  constructor(props) {
    super(props)
    this.state= {
      notes: [],
      folders: [],
      error: ''
    }
  }
  componentDidMount() {
    NotefulApiServices.getAllItems('folders')
      .then(json=>this.setState({folders:json}))
      .catch(err=>this.setState({error:err}))
    NotefulApiServices.getAllItems('notes')
      .then(json=>this.setState({notes:json}))
      .catch(err=>this.setState({error:err}))
  }
  
  findNote=(id)=>{
    return this.state.notes.find(note=>note.id===id)
  }
  onAddFolderSuccess=()=>{
    NotefulApiServices.getAllItems('folders')
      .then(json=>this.setState({folders:json}))
  }

  render () {
    const {notes,folders}= this.state
    const value = { notes: notes,folders: folders,}
    const notelist= ()=><NoteList notes={notes} folders={folders}/>
    return (
      <NoteContext.Provider value={value}>
        <div className="App">
          <nav>
            <h1><Link to='/' className='home'>Noteful</Link></h1>
            <div>
              <Link to={`/forms/folder`} className='route'>Add new folder</Link> 
              <Link to={`/forms/note`} className='route'>Add new note</Link> 
            </div>
          </nav> 
          {this.state.error.length!==0 && <div className='promiseError'>{this.state.error}</div>}
          <Switch>
            <Route exact path='/' component={notelist} />
            <Route path='/forms/folder' component={(props)=><AddFolder
                {...props} onSuccess={this.onAddFolderSuccess}
            />}/>   
            <Route path='/forms/note' component={AddNote}/>
            <Route component={NotFoundPage} />
          </Switch>  
        </div>
      </NoteContext.Provider>
    );
  }    
}

export default App;
/*
<main>
<Route exact path='/' component={Lists} />   
            <Route path='/folder/:folderId' component={Lists} /> 
            <Route path='/note/:noteId' component={NoteContent} />  
            <Route path='/updateNote/:noteId' component={(props)=>{
                const note= this.findNote(props.match.params.noteId)
                return <AddNote history={props.history} note={note} />}} />
</main>
 */