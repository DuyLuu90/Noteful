import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import store from './store';
import Folder from './Components/Folder'
import Main from './Main'
import Notes from './Notes'
import Note from './Note'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state= {
      notes: store.notes,
      folders: store.folders
    }
  }
  render () {
    return (
      <div className="App">
        <Link to='/'>
          <header><h1>Noteful</h1></header> 
        </Link>
        <main>
          <Folder folders={this.state.folders} />
          <div className='noteList'>
            <Route exact path='/' component={(props)=><Main {...props} notes={this.state.notes}/>} />
            <Route path='/folder/:folderId' component={(props)=><Notes {...props} notes={this.state.notes} />} />
            <Route path='/note/:noteId' render={(props)=><Note {...props} notes={this.state.notes}  />} /> 
          </div>  
        </main>
      </div>
    );
  }    
}

export default App;
