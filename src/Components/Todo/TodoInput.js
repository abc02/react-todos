import React from 'react'
import './TodoInput.css'

function changeTitle(props, e) {
    // react 自动传入event参数，调用props属性上注册号的onChange方法，传入event参数
    props.onChange(e)
}
function submit(props, e) {
    if (e.key === 'Enter') {
        if (e.target.value.trim() !== '') {
            props.onSubmit(e)
        }
    }
}
export default function (props) {
    return (
        <input type="text" value={props.content}
            className="TodoInput"
            // 触发change事件，调用changeTitle方法
            onChange={changeTitle.bind(null, props)}
            onKeyPress={submit.bind(null, props)}
        />
    )
}