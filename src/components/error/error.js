import React from 'react'
import 'styles/error.css'
export default function Error(props){
    return (
        <div className="error-Wrapper">
            {props.errorInfo}
            {/* {props.errorInfo ? `提示: ${props.errorInfo}` : ''}  */}
        </div>
    )
}