import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars } from '@fortawesome/free-solid-svg-icons'
import './Header.css'

export default class Header extends Component {
    state= {
        displayDropdown: false
    }
    onClickBar= ()=>{
        const boolean= (this.state.displayDropdown)? false: true
        this.setState({displayDropdown: boolean})
    }
    render(){
        return(
        <nav>
            <h1><Link to='/' className='home'>Noteful</Link></h1>
            <div className='app_menu'>
              <Link to={`/forms/folders`} className='route'aria-label="form">
                Add folder
              </Link> 
              <Link to={`/forms/notes`} className='route'aria-label="form">
                Add note
              </Link> 
            </div>
            <div className='dropdown'>
                <FontAwesomeIcon icon={faBars} onClick={this.onClickBar}/>
                {this.state.displayDropdown && 
                <div>
                    <Link to={`/forms/folders`} aria-label="form">
                         Add folder
                    </Link> 
                    <Link to={`/forms/notes`} aria-label="form">
                        Add note
                    </Link> 
                </div>
                }
                
            </div>
        </nav> 
        )
    }
}