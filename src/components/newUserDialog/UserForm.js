import React, { Component } from 'react'
import 'styles/userForm.css'
export default class UserForm extends Component {

    render() {
        return (
            <div className="user-form-wrapper">
                <h1>{this.props.user.username || '我'}的待办事项
            {this.props.user.id ? <button onClick={() => this.signOut()}>登出</button> : null}
                </h1>
            </div>
        )
    }
}
