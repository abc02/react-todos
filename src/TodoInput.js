import React, { Component } from 'react'

class TodoInput extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <input type="text" value={this.props.newTodo} />
        )
    }
}

export default TodoInput