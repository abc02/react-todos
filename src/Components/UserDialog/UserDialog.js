import React, { Component } from 'react'
import './UserDialog.css'
import { signUp, signUpEmail, signIn, resetPasswordEmail } from 'serviceAPI/LeanCloud.js'
import showError from 'serviceAPI/errorCode.js'
import FrgotPassword from './ForgotPasswordForm.js'
import SignInOrSignUp from './signForm/SignInOrSignUp.js'

export default class UserDialog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedTab: 'signInOrSignUp',
            formData: {
                email: '',
                username: '',
                password: ''
            }
        }
    }
    signUp(e) {
        console.log('signUp')
        e.preventDefault()
        let { email, username, password } = this.state.formData
        let success = (user) => {
            this.props.onSignUp.call(null, user)
            console.log(user)
        }
        let error = (error) => {
            showError(error)
        }
        signUp(email, username, password, success, error)
    }
    signUpEmail(e){
        e.preventDefault()
        let {email, password} = this.state.formData
        let success = (user) => {
            this.props.onSignUp.call(null, user)
            console.log(user)
        }
        let error = (error) => {
            showError(error)
        }
        signUpEmail(email, password, success, error)
    }
    signIn(e) {
        e.preventDefault()
        let { username, password } = this.state.formData
        let success = (user) => {
            this.props.onSignIn.call(null, user)
            console.log(user)
        }
        let error = (error) => {
            showError(error)
        }
        signIn(username, password, success, error)
    }
    changeFormData(key, e) {
        console.log('changeFormData', key, e.target.value)
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.formData[key] = e.target.value
        this.setState(stateCopy)
    }
    forgotPassword() {
        console.log('forgotPassword')
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.selectedTab = 'forgotPassword'
        this.setState(stateCopy)
    }
    resetPasswordEmail(e) {
        e.preventDefault()
        resetPasswordEmail(this.state.formData.email)
    }
    returnToSignIn() {
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.selectedTab = 'signInOrSignUp'
        this.setState(stateCopy)
    }
    render() {
        return (
            <div className="UserDialog-Wrapper">
                <div className="UserDialog">
                    <div className="userBar">
                    </div>
                    <div className="signForm-Wrapper">
                        <div className="signInfo">
                            <h3>Todo Lists</h3>
                        </div>
                        {this.state.selectedTab === 'signInOrSignUp' ?
                            <SignInOrSignUp
                                formData={this.state.formData}
                                onSignUp={this.signUpEmail.bind(this)}
                                onSignIn={this.signIn.bind(this)}
                                onChange={this.changeFormData.bind(this)}
                                onForgotPassword={this.forgotPassword.bind(this)} /> :
                            <FrgotPassword
                                onResetPasswordEmail={this.resetPasswordEmail.bind(this)}
                                formData={this.state.formData}
                                onChange={this.changeFormData.bind(this)}
                                onReturnToSignIn={this.returnToSignIn.bind(this)}
                            />
                        }
                    </div>
                </div>

            </div>
        )
    }
}