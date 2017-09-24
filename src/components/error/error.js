import React from 'react'
import 'styles/error.css'
export default function Error(props){
    return (
        <div className="error-wrapper">
            {props.errorInfo}
        </div>
    )
}