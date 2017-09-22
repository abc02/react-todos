
export default function showError(error) {
    console.log(error)
    switch (error.code) {
        case 202:
            return '用户名已被占用';
        case 203:
            return '该邮箱已被占用';
        case 210:
            return '用户名或密码错误';
        case 211:
            return '找不到该用户';
        default:
            return error.error;
    }
}

