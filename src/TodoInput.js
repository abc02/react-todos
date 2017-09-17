import React, { Component } from 'react'

class TodoInput extends Component {
    submit(e){
        if(e.key === 'Enter'){
            console.log(e.key)
        }
    }
    render() {
        return (
            <input type="text" defaultValue={this.props.content} 
                onKeyPress={this.submit}
            />
        )
    }
}

export default TodoInput