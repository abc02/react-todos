import React from 'react'

export default function SignNav(props) {
    return (
        <nav>
            <div>
                <input type="radio" id="sign-up" name="sign-up"
                    required
                    value="signup"
                    checked={props.selected === 'signup'}
                    onChange={props.onSwitch} />
                <label htmlFor="sign-up">注&nbsp;&nbsp;册</label>
            </div>
            <div>
                <input type="radio" id="sign-in" name="sign-in"
                    required
                    value="signin"
                    checked={props.selected === 'signin'}
                    onChange={props.onSwitch} />
                <label htmlFor="sign-in">登&nbsp;&nbsp;录</label>
            </div>
        </nav>
    )
}