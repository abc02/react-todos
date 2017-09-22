
export default function showError(error) {
    switch (error.code) {
        case 202:
            alert('用户名已被占用')
            break
        case 203:
            alert('该邮箱已被占用')
            break
        case 210:
            alert('用户名或密码错误')
            break
        default:
            alert(error)
            break
    }
}

