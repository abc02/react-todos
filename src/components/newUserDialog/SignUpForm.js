import React from 'react'
export default function SignUpForm(props) {
    return (
        <form className="signForm">
            <div>
                <input type="text" id="username" name="username"
                    required placeholder=" "
                    pattern="(?=.*\w).{6,}" />
                <label htmlFor="username">用户名</label>
                <div className="requirements">
                    你的用户名字必须至少6个字符。
            </div>
            </div>
            <div>
                <input type="email" id="email" name="email"
                    required placeholder=" " />
                <label htmlFor="email">电子邮箱地址</label>
                <div className="requirements">
                    必须是一个有效的电子邮件地址。
            </div>
            </div>

            <div>
                <input type="password" id="password" name="password"
                    required placeholder=" "
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" />
                <label htmlFor="password">密码</label>
                <div className="requirements">
                    你的密码必须至少6个字符,以及包含至少一个大写字母,一个小写字母,一个数字。
            </div>
            </div>

            <input type="submit" value="注  册" />
        </form>
    )
}