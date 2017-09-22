import React from 'react'

export default function (props) {
    return (
        // 注册
        <form className="signUp signForm" onSubmit={props.onSubmit}>
            <div className="row">
                <input type="email"
                    required
                    placeholder="请输入邮箱"
                    value={props.formData.email}
                    onChange={props.onChange.bind(null, 'email')} />
            </div>
            <div className="row">
                <input type="password"
                    required
                    placeholder="请输入密码"
                    value={props.formData.password}
                    onChange={props.onChange.bind(null, 'password')} />
            </div>

            <div className="row actions">
                <button 
                type="submit">注&nbsp;&nbsp;册</button>
            </div>
        </form>
    )
}