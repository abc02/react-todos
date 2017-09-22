import React from 'react'
import './error.css'
export default function Error(props){
    return (
        <div className="error-Wrapper">
            {props.errorInfo ? `提示: ${props.errorInfo}` : ''} 
        </div>
    )
}