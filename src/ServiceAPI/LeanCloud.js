import AV from 'leancloud-storage'
var APP_ID = 'pjhhElSbCFQAIqyBdF2bDPtk-gzGzoHsz';
var APP_KEY = 'wyexNsS60gmtsdxkW39lLi7U';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})

export default AV



export function saveData(data) {
  // 声明类型
  var TodoFolder = AV.Object.extend('TodoFolder');
  // 新建对象
  var todoFolder = new TodoFolder();
  // 设置名称
  todoFolder.set({ data });
  // 设置优先级
  todoFolder.set('priority', 1);
  todoFolder.save().then(function (todo) {
    console.log('objectId is ' + todo.id);
  }, function (error) {
    console.error(error);
  });
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
export function resetPasswordEmail(email,successFn, errorFn) {
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