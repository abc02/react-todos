import React, { Component } from 'react'

class TodoInput extends Component {
    constructor() {
        // 调用父组件，this指向自己
        super()
        this.submit = this.submit.bind(this)
    }
    submit(e) {
        if (e.key === 'Enter') {
            console.log(e.key)
            this.props.onSubmit.call()
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