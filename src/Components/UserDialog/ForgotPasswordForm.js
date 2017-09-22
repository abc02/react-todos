import React, { Component } from 'react'
import 'styles/forgotPasswordForm.css'
export default class ForgotPassword extends Component {
    render() {
        return (
            <div className="forgetPassword">
                <h3>重置密码</h3>
                <form className="forgorPassword" onSubmit={this.props.onResetPasswordEmail}>
                    <label>邮箱</label>
                    <input type="email" value={this.props.formData.email}
                        onChange={this.props.onChange.bind(null,'email')} />
                    <div className="row actions">
                        <button type="submit">发送重置邮件</button>
                        <a href="#" onClick={this.props.onReturnToSignIn}>返回登录</a>
                    </div>
                </form>
            </div>
        )
    }
}