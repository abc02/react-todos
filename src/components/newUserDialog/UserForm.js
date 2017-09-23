import React, { Component } from 'react'
import 'styles/userForm.css'
export default function (props) {
    return (
        <div className="user-form-wrapper">
            <h3>{this.props.user.username || '我'}的待办事项</h3>
            {this.props.user.id ? <button onClick={props.onSignOut}>登  出</button> : null}
        </div>
    )
}
