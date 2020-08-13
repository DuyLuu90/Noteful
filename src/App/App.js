import React, {Component} from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import './App.css';
import NoteContext from '../Context/NoteContext';
import {NotefulApiServices} from '../service/api-service'

//Main Components
import NoteList from '../Components/NoteList/NoteList'
import NoteDetails from '../Components/NoteDetails/NoteDetails'
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
      .catch(res=> this.setState({error:res.error}))
    NotefulApiServices.getAllItems('notes')
      .then(json=>this.setState({notes:json}))
      .catch(res=> this.setState({error:res.error}))
  }
  
  findNote=(id)=>{
    return this.state.notes.find(note=>note.id===id)
  }
  onUpdateSuccess=()=>{
    NotefulApiServices.getAllItems('folders')
      .then(json=>this.setState({folders:json}))
      .then(()=>{
        NotefulApiServices.getAllItems('notes')
        .then(json=>this.setState({notes:json}))
      }) 
  }

  render () {
    const {notes,folders,error}= this.state
    const value = { notes: notes,folders: folders,}
    const notelist= ()=><NoteList notes={notes} folders={folders} onSuccess={this.onUpdateSuccess}/>
    
    return (
      <NoteContext.Provider value={value}>
        <div className="App">
          <nav>
            <h1><Link to='/' className='home'>Noteful</Link></h1>
            <div>
              <Link to={`/forms/folders`} className='route'aria-label="form">
                Add new folder
              </Link> 
              <Link to={`/forms/notes`} className='route'aria-label="form">
                Add new note
              </Link> 
            </div>
          </nav> 
          <Switch>
            <Route exact path='/' component={notelist} />
            <Route path='/notes/:id' component={NoteDetails} />
            <Route path='/forms/folders' component={(props)=><AddFolder
                {...props} onSuccess={this.onUpdateSuccess}
            />}/>  
            <Route path='/forms/notes' component={(props)=><AddNote
                {...props} onSuccess={this.onUpdateSuccess}
            />}/>  
            
            <Route component={NotFoundPage} />
          </Switch>  
          {this.state.error && <div className='promiseError'>{error}</div>}
        </div>
      </NoteContext.Provider>
    );
  }    
}

export default App;
/*
<Route path='/forms/folders/:id' component={(props)=><AddFolder
                {...props} onSuccess={this.onUpdateFolderSuccess}
            />}/>
<main>
<Route exact path='/' component={Lists} />   
            <Route path='/folder/:folderId' component={Lists} /> 
            <Route path='/note/:noteId' component={NoteContent} />  
            <Route path='/updateNote/:noteId' component={(props)=>{
                const note= this.findNote(props.match.params.noteId)
                return <AddNote history={props.history} note={note} />}} />
</main>
 */