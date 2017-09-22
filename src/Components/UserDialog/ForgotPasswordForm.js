import React, { Component } from 'react'
import 'styles/signCommon.css'
export default class ForgotPassword extends Component {
    render() {
        return (
            <div className="forgetPasswordForm form">
                <nav>重置密码</nav>
                <form className="forgorPassword signForm" onSubmit={this.props.onResetPasswordEmail}>
                    <div className="row">
                        <input type="email"
                            required
                            placeholder="请输入邮箱"
                            value={this.props.formData.email}
                            onChange={this.props.onChange.bind(null, 'email')} />
                    </div>
                    <div className="row actions">
                        <button type="submit">发送邮件</button>
                        <button  onClick={this.props.onReturnToSignIn} >返回登录</button>
                    </div>
                </form>
            </div>
        )
    }
}