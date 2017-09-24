import React, { Component } from 'react';
import Todo from 'components/todo/Todo.js'
// import TodoInput from 'components/todo/TodoInput.js'
// import TodoItem from 'components/todo/TodoItem.js'
// import TodoLists from 'components/todo/TodoLists.js'
// import UserDialog from 'components/userDialog/UserDialog.js'
import NewUserDialog from 'components/newUserDialog/NewUserDialog.js'
import UserInfo from 'components/info/UserInfo.js'
import { getCurrentUser, signOut, TodoModel } from 'serviceAPI/LeanCloud.js'
import 'normalize.css'
import '../../node_modules/fonts.css/fonts.css'
import 'styles/reset.css'
// import 'styles/app.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: getCurrentUser() || {},
    }

  }
  userSign(user) {
    //  用户是否登录
    console.log('onSignUpOrSignIn', user)
    TodoModel.getByUser(user, (todos) => {
      let stateCopy = JSON.parse(JSON.stringify(this.state))
      stateCopy.user = user
      this.setState(stateCopy)
    })
  }
  signOut() {
    signOut()
    console.log('singOut')
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = {}
    this.setState(stateCopy)
  }

  render() {
    return (
      <div className="App">
        <Todo />
        {this.state.user.id ? 
        <UserInfo
          user={this.state.user} 
          onSignOut={this.signOut.bind(this)}/> :
          <NewUserDialog
            onSign={this.userSign.bind(this)}
          />
        }
      </div>
    );
  }
}

export default App;
