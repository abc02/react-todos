import React from 'react'
export default function SignUpForm(props) {
    return (
        <form className="signForm">
           
            <div>
                <input type="email" id="email" name="email"
                    required placeholder=" " />
                <label htmlFor="email">电子邮箱地址</label>
                <div className="requirements">
                    必须是一个有效的电子邮件地址。
            </div>
            </div>

            <input type="submit" value="发  送" />
            <input type="button" 
                onClick={props.onBackSign}
                value="返  回" />

        </form>
    )
}