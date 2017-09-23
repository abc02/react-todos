import React, { Component } from 'react'
import SignNav from './SignNav.js'
import SignUpForm from './SignUpForm.js'
import SignInForm from './SignInForm.js'
import ForgotPasswordForm from './ForgotPasswordForm.js'
import { signUp, signIn, sendEmailRestPassword } from 'serviceAPI/LeanCloud.js'

import 'styles/newUserDialog.css'
export default class NewUserDialog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 'signup', // signup signin forgotpassword
            formData: {
                username: '',
                email: '',
                password: ''
            }
        }
    }
    switch(e) {
        // 切换面板 注册-> 登录 -> 忘记密码
        this.setState({
            selected: e.target.value
        })
    }
    backSign() {
        // 忘记密码 -> 返回登录
        this.setState({
            selected: 'signin'
        })
    }

    changFormInput(key, e) {
        // input value 输入 -> formData[key] 绑定
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.formData[key] = e.target.value
        this.setState(stateCopy)
    }
    sendEmailRestPassword(e) {
        e.preventDefault()
        sendEmailRestPassword(this.state.formData.email)
    }
    signUp(e) {
        // 账号注册 操作
        e.preventDefault()
        let { username, email, password } = this.state.formData
        signUp(email, username, password, this.success.bind(this), this.error)
    }
    signIn(e) {
        // 账号登录 操作
        e.preventDefault()
        let { username, password } = this.state.formData
        signIn(username, password, this.success.bind(this), this.error)
    }
    success(user) {
        // 账户注册 / 登录成功，回调函数
        this.props.onSign.call(null, user)
    }
    error(error) {
        // 账户注册 / 登录失败 错误代码 回调函数
        alert(error)
    }
    render() {
        return (
            <div className="new-userdialog-wrapper">
                {this.state.selected === 'forgotpassword' ?
                    <nav>重置密码</nav> :
                    <SignNav selected={this.state.selected}
                        onSwitch={this.switch.bind(this)} />}
                <div className="new-userdialog">

                    {
                        this.state.selected === 'signup' ?
                            <SignUpForm
                                formData={this.state.formData}
                                onChangeFormInput={this.changFormInput.bind(this)}
                                onSignUp={this.signUp.bind(this)} /> :
                            this.state.selected === 'signin' ?
                                <SignInForm onSwitch={this.switch.bind(this)}
                                    formData={this.state.formData}
                                    onChangeFormInput={this.changFormInput.bind(this)}
                                    onSignIn={this.signIn.bind(this)} /> :
                                <ForgotPasswordForm
                                    onBackSign={this.backSign.bind(this)}
                                    formData={this.state.formData}
                                    onChangeFormInput={this.changFormInput.bind(this)}
                                    onSendEmail={this.sendEmailRestPassword.bind(this)} />
                    }


                </div>
            </div>
        )
    }
}