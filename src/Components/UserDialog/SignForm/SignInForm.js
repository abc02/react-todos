import React  from 'react'


export default function (props) {
    return (
        // 登录
        <form className="signIn" onSubmit={props.onSubmit}>
            <div className="row">
                {/* <label>用户名</label> */}
                <input type="text"
                    required 
                    placeholder="请输入邮箱"
                    value={props.formData.username}
                    onChange={props.onChange.bind(null, 'username')} />
            </div>
            <div className="row">
                {/* <label>密码</label> */}
                <input type="password" 
                    required 
                    placeholder="请输入密码"
                    value={props.formData.password}
                    onChange={props.onChange.bind(null, 'password')} />
            </div>
            <div className="row actions">
                <button type="submit">登&nbsp;&nbsp;录</button>
                {/* <a href="#" onClick={props.onForgotPassword}>忘记密码？</a> */}
            </div>
        </form>
    )
}