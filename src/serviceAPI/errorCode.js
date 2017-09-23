
export default function showError(error) {
    switch (error.code) {
        case 199:
            return '用户名已经被占用';
        case 202:
            return '用户名已经被占用';
        case 203:
            return '电子邮箱地址已经被占用';
        case 210:
            return '用户名和密码不匹配';
        case 211:
            return '找不到用户';
        default:
            return error.error;
    }
}

