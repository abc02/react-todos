import React, { Component } from 'react'
import SignUpForm from './SignUpForm.js'
import SignInForm from './SignInForm.js'

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
    }
    render() {
        return (
            <div className="signInOrSignUp">
                <nav>
                    <label>
                        <input type="radio"
                            value="signUp"
                            checked={this.state.selected === 'signUp'}
                            onChange={this.switch.bind(this)}
                        /> 注册
            </label>
                    <label>
                        <input type="radio"
                            value="signIn"
                            checked={this.state.selected === 'signIn'}
                            onChange={this.switch.bind(this)}
                        /> 登录
            </label>
                </nav>
                <div className="panes">
                    {this.state.selected === 'signUp' ? <SignUpForm 
                    formData={this.props.formData}
                    onSubmit={this.props.signUp}
                    onChange={this.props.onChange}
                    /> : null}
                    {this.state.selected === 'signIn' ? <SignInForm 
                    formData={this.props.formData}
                    onSubmit={this.props.signIn}
                    onChange={this.props.onChange}
                    onForgotPassword={this.props.onForgotPassword}
                    /> : null}
                </div>
            </div>
        )
    }
} 
