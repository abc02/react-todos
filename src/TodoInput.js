import React, { Component } from 'react'

class TodoInput extends Component {
    constructor() {
        // 调用父组件，this指向自己
        super()
        this.changeTitle = this.changeTitle.bind(this)
        this.submit = this.submit.bind(this)
    }
    changeTitle(e){
        // react 自动传入event参数，调用props属性上注册号的onChange方法，传入event参数
        this.props.onChange(e)
    }
    submit(e) {
        if (e.key === 'Enter') {
            console.log(e.key)
            this.props.onSubmit(e)
        }
    }
    render() {
        return (
            <input type="text" value={this.props.content}
            // 触发change事件，调用changeTitle方法
                onChange={this.changeTitle}
                onKeyPress={this.submit}
            />
        )
    }
}

export default TodoInput