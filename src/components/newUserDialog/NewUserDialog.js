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
        console.log(e.target.value)
        this.setState({
            selected: e.target.value
        })
    }
    render() {
        return (
            <div className="new-userdialog-wrapper">
                {this.state.selected === 'forgotpassword' ? null :
                    <SignNav selected={this.state.selected}
                        onSwitch={this.switch.bind(this)} />}
                <div className="new-userdialog">

                    {
                        this.state.selected === 'signup' ? 
                        <SignUpForm  /> :
                            this.state.selected === 'signin' ? <SignInForm  onSwitch={this.switch.bind(this)}/> :
                                <ForgotPasswordForm
                                    onSwitch={this.switch.bind(this)} />
                    }


                </div>
            </div>
        )
    }
}