import React from 'react'
import 'styles/errorInfo.css'
export default function Error(props){
    return (
        <div className="error-wrapper">
            {props.errorInfo}
        </div>
    )
}