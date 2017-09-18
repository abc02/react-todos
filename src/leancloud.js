import AV from 'leancloud-storage'
var APP_ID = 'pjhhElSbCFQAIqyBdF2bDPtk-gzGzoHsz';
var APP_KEY = 'wyexNsS60gmtsdxkW39lLi7U';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})

export default AV


export function signUp(usernmae, password, successFn, errorFn) {
  // 新建 AVUser 对象实例
  var user = new AV.User()
  user.setUsername(usernmae)
  user.setPassword(password)

  user.signUp().then(function (loginedUser) {
    let user = getUserFromAVUser(loginedUser)
    successFn.call(null, user)
  }, function (error) {
    errorFn.call(null, error)
  })
  return undefined
}
export function getCurrentUser(){
  let user = AV.User.current()
  if(user){
    return getUserFromAVUser(user)
  }else{
    return {}
  }
}
function getUserFromAVUser(AVUser){
  console.log(AVUser)
  return {
    id: AVUser.id,
    ...AVUser.attributes
  }
}