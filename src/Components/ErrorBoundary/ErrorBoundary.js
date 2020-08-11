import React from 'react'

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false
        }
    }
    static getDerivedStateFormError(error) {
        //this.setState({hasError: true})
        return {hasError: true}
    }
    
    render() {
        if (this.state.hasError) {
            return (
            <div className='errorMessage'>
                Some thing went wrong. The requested page does not exist, or it has been deleted</div>)
        }
        return this.props.children
    }
    
}
export default ErrorBoundary