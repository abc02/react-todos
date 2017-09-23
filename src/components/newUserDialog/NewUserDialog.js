import React, { Component } from 'react'
import { signUp, signUpEmail, signIn, resetPasswordEmail } from 'serviceAPI/LeanCloud.js'

import 'styles/newUserDialog.css'
export default class NewUserDialog extends Component {


    render() {
        return (
            <div className="new-userdialog-wrapper">
                <nav>
                    <div>
                        <input type="radio" id="sign-up" name="sign-up"
                        required ckecked />
                        <label htmlFor="sign-up">Sign Up</label>
                    </div>
                    <div>
                        <input type="radio" id="sign-in" name="sign-in"
                        required ckecked/>
                        <label htmlFor="sign-up">Sign In</label>
                    </div>
                </nav>
                <div className="new-userdialog">
                <form className="signForm">
                    <div>
                        <input type="text" id="username" name="username"
                            required placeholder=" " 
                            pattern="(?=.*\w).{6,}"/>
                        <label htmlFor="username">User Name</label>
                        <div className="requirements">
                            你的用户名字必须至少6个字符。
                        </div>
                    </div>
                    <div>
                        <input type="email" id="email" name="email"
                            required placeholder=" " />
                        <label htmlFor="email">Email Address</label>
                        <div className="requirements">
                            必须是一个有效的电子邮件地址。
                        </div>
                    </div>

                    <div>
                        <input type="password" id="password" name="password"
                            required placeholder=" "
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" />
                        <label htmlFor="password">Passwrod</label>
                        <div className="requirements">
                            你的密码必须至少6个字符,以及包含至少一个大写字母,一个小写字母,一个数字。
                        </div>
                    </div>

                    <input type="submit" value=" Sign Up" />
                </form>
                </div>
            </div>
        )
    }
}