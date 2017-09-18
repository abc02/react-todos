import React, { Component } from 'react'
import './UserDialog.css'
import { signUp } from './leancloud.js'

export default class UserDialog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 'signUp',
            formData: {
                username: '',
                password: ''
            }
        }
        this.switch = this.switch.bind(this)
        this.signUp = this.signUp.bind(this)
        this.signIn = this.signIn.bind(this)
    }

    switch(e) {
        this.setState({
            selected: e.target.value
        })
    }
    signUp(e) {
        e.preventDefault()
        let { username, password } = this.state.formData
        let success = (user) => {
            console.log(this.props)
            this.props.onSignUp.call(null, user)
            console.log(user)
        }
        let error = (error) => {
            console.log(error)
        }
        signUp(username, password, success, error)
    }
    signIn(e) { }
    changeFormData(key, e) {
        console.log('changeFormData', key, e)
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.formData[key] = e.target.value
        this.setState(stateCopy)
    }
    render() {
        let signUpForm = (
            // 注册
            <form className="signUp" onSubmit={this.signUp}>
                <div className="row">
                    <label>用户名</label>
                    <input type="text" value={this.state.formData.username}
                        onChange={(e) => this.changeFormData('username', e)} />
                </div>
                <div className="row">
                    <label>密码</label>
                    <input type="password" value={this.state.formData.password}
                        onChange={(e) => this.changeFormData('password', e)} />
                </div>
                <div className="row actions">
                    <button type="submit">注册</button>
                </div>
            </form>
        )
        let signInForm = (
            // 登录
            <form className="signIn" onSubmit={this.signIn}>
                <div className="row">
                    <label>用户名</label>
                    <input type="text" value={this.state.formData.username}
                        onChange={(e) => this.changeFormData('username', e)} />
                </div>
                <div className="row">
                    <label>密码</label>
                    <input type="password" value={this.state.formData.password}
                        onChange={(e) => this.changeFormData('password', e)} />
                </div>
                <div className="row actions">
                    <button type="submit">登录</button>
                </div>
            </form>
        )
        return (
            <div className="UserDialog-Wrapper">
                <div className="UserDialog">
                    <nav>
                        <label>
                            <input type="radio" 
                                value="signUp" 
                                checked={this.state.selected === 'signUp'}
                                onChange={this.switch}
                            /> 注册
                        </label>
                        <label>
                            <input type="radio" 
                            value="signIn" 
                            checked={this.state.selected === 'signIn'}
                            onChange={this.switch}
                            /> 登录 
                        </label>
                    </nav>
                    <div className="panes">
                        {this.state.selected === 'signUp' ? signUpForm : null}
                        {this.state.selected === 'signIn' ? signInForm : null}
                    </div>
                </div>

            </div>
        )
    }
}