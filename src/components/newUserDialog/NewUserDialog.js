import React, { Component } from 'react'
import SignNav from './SignNav.js'
import SignUpForm from './SignUpForm.js'
import SignInForm from './SignInForm.js'
import ForgotPasswordForm from './ForgotPasswordForm.js'
import { signUp, signUpEmail, signIn, resetPasswordEmail } from 'serviceAPI/LeanCloud.js'

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
        this.setState({
            selected: e.target.value
        })
    }
    backSign() {
        console.log('backSign')
        this.setState({
            selected: 'signin'
        })
    }

    changFormInput(key, e) {
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.formData[key] = e.target.value
        this.setState(stateCopy)
    }
    signUp(e) {
        e.preventDefault()
        let { username, email, password } = this.state.formData
        let success = (user) => {
            // this.props.onSignUp.call(null, user)
            console.log(user)
        }
        let error = (error) => {
            alert(error)
        }
        signUp(email, username, password, success, error)
    }
    signIn(e) {
        e.preventDefault()
        let { username, email, password } = this.state.formData
        let success = (user) => {
            // this.props.onSignUp.call(null, user)
            console.log(user)
        }
        let error = (error) => {
            alert(error)
        }
        signIn(username, password, success, error)
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
                                onChangFormInput={this.changFormInput.bind(this)}
                                onSignUp={this.signUp.bind(this)} /> :
                            this.state.selected === 'signin' ?
                                <SignInForm onSwitch={this.switch.bind(this)}
                                    formData={this.state.formData}
                                    onChangFormInput={this.changFormInput.bind(this)}
                                    onSignIn={this.signIn.bind(this)} /> :
                                <ForgotPasswordForm
                                    onSwitch={this.switch.bind(this)}
                                    onBackSign={this.backSign.bind(this)} />
                    }


                </div>
            </div>
        )
    }
}