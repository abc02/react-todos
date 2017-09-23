import React from 'react'
import 'styles/todoInput.css'

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
        <div className="todo-input-wrapper">
            <div>
                <input type="text" id="todo-input" name="todo-input"
                    required placeholder=" "
                    pattern="(?=.*\w).*" 
                    value={props.content}
                    // 触发change事件，调用changeTitle方法
                    onChange={changeTitle.bind(null, props)}
                    onKeyPress={submit.bind(null, props)}/>
                <label htmlFor="todo-input">请输入待办事项</label>
                <div className="requirements">
                XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                </div>
            </div>
            {/* <div>
                <input type="text"
                    required placeholder=" "
                   />
                <label htmlFor="">请输入待办事项2</label>
                <div className="requirements">
                XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                </div>
            </div> */}
        </div>

    )
}