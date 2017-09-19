import React, { Component } from 'react'
import './UserDialog.css'
import { signUp, signIn, resetPasswordEmail } from '../../ServiceAPI/LeanCloud.js'
import SignUpForm from './SignUpForm.js'

export default class UserDialog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 'signUp',
            selectedTab:'signInOrSignUp',
            formData: {
                email: '',
                username: '',
                password: ''
            }
        }
        this.switch = this.switch.bind(this)
        this.signUp = this.signUp.bind(this)
        this.signIn = this.signIn.bind(this)
        this.forgotPassword = this.forgotPassword.bind(this)
        this.resetPasswordEmail = this.resetPasswordEmail.bind(this)
        this.returnToSignIn = this.returnToSignIn.bind(this)
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
        let { email, username, password } = this.state.formData
        let success = (user) => {
            console.log(this.props)
            this.props.onSignUp.call(null, user)
            console.log(user)
        }
        let error = (error) => {
            this.showError(error)
        }
        signUp(email, username, password, success, error)
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
    forgotPassword(){
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.selectedTab = 'forgotPassword'
        this.setState(stateCopy)
    }
    resetPasswordEmail(e){
        e.preventDefault()
        resetPasswordEmail(this.state.formData.email)
    }
    returnToSignIn(){
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.selectedTab = 'signInOrSignUp'
        this.setState(stateCopy)
    }
    render() {
       
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
                    <a href="#" onClick={this.forgotPassword}>忘记密码？</a>
                </div>
            </form>
        )
        let signInOrSignUp = (
            <div className="signInOrSignUp">
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
                    {this.state.selected === 'signUp' ? <SignUpForm 
                    formData={this.state.formData}
                    onSubmit={this.signUp.bind(this)}
                    onChange={this.changeFormData.bind(this)}
                    /> : null}
                    {this.state.selected === 'signIn' ? signInForm : null}
                </div>
            </div>
        )
        let forgotPassword = (
            <div className="forgetPassword">
                <h3>重置密码</h3>
                <form className="forgorPassword" onSubmit={this.restPassword} onSubmit={this.resetPasswordEmail}>
                    <label>邮箱</label>
                    <input type="email" value={this.state.formData.email} 
                        onChange={(e) => this.changeFormData('email', e)}/>
                    <div className="row actions">
                        <button type="submit">发送重置邮件</button>
                        <a href="#" onClick={this.returnToSignIn}>返回登录</a>
                    </div>
                </form>
            </div>
        )
        return (
            <div className="UserDialog-Wrapper">
                <div className="UserDialog">
                    {this.state.selectedTab === 'signInOrSignUp' ? signInOrSignUp : forgotPassword }
                </div>

            </div>
        )
    }
}