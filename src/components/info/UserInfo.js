import React, { Component } from 'react'
import 'styles/userInfo.css'
export default function UserInfo(props) {
    return (
        <div className="user-info-wrapper">
            <div>
                <h3>{props.user.username || '我'}的待办事项</h3>
                {props.user.id ? <button onClick={props.onSignOut}>登  出</button> : null}
            </div>
        </div>
    )
}
