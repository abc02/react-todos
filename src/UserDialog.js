import React, { Component } from 'react'
import './UserDialog.css'
import { signUp, signIn } from './leancloud.js'

export default class UserDialog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 'signUp',
            formData: {
                email:'',
                username: '',
                password: ''
            }
        }
        this.switch = this.switch.bind(this)
        this.signUp = this.signUp.bind(this)
        this.signIn = this.signIn.bind(this)
    }
    showError(error) {
        switch (error.code) {
            case 202:
                alert('用户名已被占用')
                break
            case 210:
                alert('用户名或密码错误')
                break
            default:
                alert(error)
                break
        }
    }
    switch(e) {
        this.setState({
            selected: e.target.value
        })
    }
    signUp(e) {
        e.preventDefault()
        let { email,username, password } = this.state.formData
        let success = (user) => {
            console.log(this.props)
            this.props.onSignUp.call(null, user)
            console.log(user)
        }
        let error = (error) => {
            this.showError(error)
        }
        signUp(email,username, password, success, error)
    }
    signIn(e) {
        e.preventDefault()
        let { username, password } = this.state.formData
        let success = (user) => {
            this.props.onSignIn.call(null, user)
            console.log(user)
        }
        let error = (error) => {
            this.showError(error)
        }
        signIn(username, password, success, error)
    }
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
                <div className="row">
                    <label>邮箱</label>
                    <input type="email" value={this.state.formData.email}
                        onChange={(e) => this.changeFormData('email', e)} />
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
                    <a href="javascript:;">忘记密码？</a>
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