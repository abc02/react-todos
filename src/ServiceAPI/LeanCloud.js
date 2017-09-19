import AV from 'leancloud-storage'
var APP_ID = 'pjhhElSbCFQAIqyBdF2bDPtk-gzGzoHsz';
var APP_KEY = 'wyexNsS60gmtsdxkW39lLi7U';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})

export default AV
// todo 相关操作
export const TodoModel = {
  create({ status, title, deleted }, successFn, errorFn) {
    // 声明类型
    let Todo = AV.Object.extend('Todo')
    // 新建对象
    let todo = new Todo()
    // 设置名称
    todo.set('title', title)
    todo.set('status', status)
    todo.set('deleted', deleted)

    // 设置todo 权限
    // 新建一个 ACL 实例
    let acl = new AV.ACL()
    acl.setPublicReadAccess(false)
    acl.setWriteAccess(AV.User.current(), true)
    acl.setReadAccess(AV.User.current(), true)

    // 将 ACL 实例赋予 Post 对象
    todo.setACL(acl)
    todo.save().then(function (response) {
      successFn.call(null, response.id)
    }, function (error) {
      errorFn && errorFn.call(null, error)
    });
  },
  update({ id, title, status, deleted }, successFn, errorFn) {
    console.log(id, title, status, deleted)
    let todo = AV.Object.createWithoutData('Todo', id)
    // expr1 && expr2
    // 如果expr1 能转换成false则返回expr1,否则返回expr2. 
    title !== undefined && todo.set('title', title)
    status !== undefined && todo.set('status', status)
    deleted !== undefined && todo.set('deleted', deleted)

    todo.save().then(response => {
      successFn && successFn.call(null)
    }, error => {
      errorFn && errorFn.call(null, error)
    })
  },
  destroy(todoId, successFn, errorFn) {
    let todo = AV.Object.createWithoutData('Todo', todoId)
    this.update({ id: todoId, deleted: true }, successFn, errorFn)
  },
  getByUser(user, successFn, errorFn) {
    let query = new AV.Query('Todo')
    //初始化 应该可见 'deleted: false'
    query.equalTo('deleted', false)
    query.find().then(response => {
      let array = response.map(item => {
        return { id: item.id, ...item.attributes }
      })
      successFn.call(null, array)
    }, (error) => {
      errorFn && errorFn.call(null, error)
    })
  }
}


export function signUp(email, usernmae, password, successFn, errorFn) {
  // 新建 AVUser 对象实例
  var user = new AV.User()
  //设置用户名
  user.setUsername(usernmae)
  // 设置密码
  user.setPassword(password)
  // 设置邮箱
  user.setEmail(email)

  user.signUp().then(function (loginedUser) {
    let user = getUserFromAVUser(loginedUser)
    successFn.call(null, user)
  }, function (error) {
    errorFn.call(null, error)
  })
  return undefined
}
export function signIn(username, password, successFn, errorFn) {

  AV.User.logIn(username, password).then(function (loginedUser) {
    let user = getUserFromAVUser(loginedUser)
    successFn.call(null, user)
  }, function (error) {
    errorFn.call(null, error)
  })
  return undefined
}
export function getCurrentUser() {
  let user = AV.User.current()
  if (user) {
    return getUserFromAVUser(user)
  } else {
    return {}
  }
}
export function signOut() {
  console.log('signOut')
  AV.User.logOut()
  return undefined
}
export function resetPasswordEmail(email, successFn, errorFn) {
  AV.User.requestPasswordReset(email).then(function (success) {
    console.log(success)
  }, function (error) {
  });
}
function getUserFromAVUser(AVUser) {
  console.log(AVUser)
  return {
    id: AVUser.id,
    ...AVUser.attributes
  }
}