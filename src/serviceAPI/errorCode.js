import React from 'react'
import Error from 'components/error/error.js'
console.log(Error)
export default function showError(error) {
    console.log(error)
    switch (error.code) {
        case 202:
            return '用户名已被占用';
            break
        case 203:
            return '该邮箱已被占用';
            break
        case 210:
            return '用户名或密码错误';
            break
        case 211:
            return '找不到该用户';
            break;
        default:
            alert(error)
            break
    }
}

