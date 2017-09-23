import React, { Component } from 'react'
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
    render() {
        return (
            <div className="new-userdialog-wrapper">
                <nav>
                    <div>
                        <input type="radio" id="sign-up" name="sign-up"
                            required
                            value="signup"
                            checked={this.state.selected === 'signup'}
                            onChange={this.switch.bind(this)} />
                        <label htmlFor="sign-up">注&nbsp;&nbsp;册</label>
                    </div>
                    <div>
                        <input type="radio" id="sign-in" name="sign-in"
                            required
                            value="signin"
                            checked={this.state.selected === 'signin'}
                            onChange={this.switch.bind(this)} />
                        <label htmlFor="sign-in">登&nbsp;&nbsp;录</label>
                    </div>
                </nav>
                <div className="new-userdialog">

                    {
                        this.state.selected === 'signup' ? < SignUpForm /> : this.state.selected === 'signin' ?  <SignInForm /> :<ForgotPasswordForm />
                    }

                    
                </div>
            </div>
        )
    }
}