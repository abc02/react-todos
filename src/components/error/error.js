import React from 'react'
import './error.css'
export default function Error(props){
    console.log(props)
    return (
        <div className="error-Wrapper">
            showError, {props.errorInfo}
        </div>
    )
}