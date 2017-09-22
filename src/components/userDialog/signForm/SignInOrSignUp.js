import React, { Component } from 'react'
import SignUpForm from './SignUpForm.js'
import SignInForm from './SignInForm.js'
import 'styles/signCommon.css'
export default class SignInOrSignUp extends Component {
    constructor(props){
        super(props)
        this.state = {
            selected : 'signUp'
        }
    }
    switch(e) {
        this.setState({
            selected: e.target.value
        })
        this.props.onSwitch(e.target.value)
    }
    render() {
        let selected = this.state.selected
        return (
            <div className="signInOrSignUp form">
                <nav>
                    <label className={selected === "signUp" ? 'active': ''}>
                        <input type="radio"
                            value="signUp"
                            checked={selected === 'signUp'}
                            onChange={this.switch.bind(this)}
                        /> 注&nbsp;&nbsp;册
                    </label>
                    <label className={selected === "signIn" ? 'active': ''}>
                        <input type="radio"
                            value="signIn"
                            checked={selected === 'signIn'}
                            onChange={this.switch.bind(this)}
                        /> 登&nbsp;&nbsp;录
                    </label>
                </nav>
                <div className="panes">
                    {selected === 'signUp' ? <SignUpForm 
                    formData={this.props.formData}
                    onSubmit={this.props.onSignUp}
                    onChange={this.props.onChange}
                    /> : null}
                    {selected === 'signIn' ? <SignInForm 
                    formData={this.props.formData}
                    onSubmit={this.props.onSignIn}
                    onChange={this.props.onChange}
                    onForgotPassword={this.props.onForgotPassword}
                    /> : null}
                </div>
            </div>
        )
    }
} 
