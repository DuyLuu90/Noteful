import React from 'react'
import {withRouter} from 'react-router-dom';

class NoteCom extends React.Component {
    clickNote=(id)=>{
        this.props.history.push(`/note/${id}`)
    }
    render() {
        const d= new Date(this.props.note.modified).toDateString()
        return (
            <div className='note'>
                <h3 onClick={()=>this.clickNote(this.props.note.id)}>
                        {this.props.note.name}
                </h3>
                <div className='noteFooter'>
                    <span>Modified on {d}</span>
                    <button type='button'>Delete note</button>
                </div>     
            </div>
        )
    }    
}
export default withRouter(NoteCom);