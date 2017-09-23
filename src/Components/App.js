import React, { Component } from 'react';
import TodoInput from 'components/todo/TodoInput.js'
import TodoItem from 'components/todo/TodoItem.js'
import UserDialog from 'components/userDialog/UserDialog.js'
import NewUserDialog from 'components/newUserDialog/NewUserDialog.js'
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
      newTodo: '',
      todoLists: []
    }
    let user = getCurrentUser()
    if (user) {
      TodoModel.getByUser(user, (todos) => {
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.todoLists = todos
        this.setState(stateCopy)
      })
    }
  }
  changeTitle(e) {
    console.log('changTitle')
    this.setState({
      newTodo: e.target.value,
      todoLists: this.state.todoLists
    })
  }
  addTodo(e) {
    //新建todo信息对象
    let newTodo = {
      title: e.target.value,
      status: '',
      deleted: false
    }
    //调用 createapi ，newTodo ,successFn , errorFn => setState
    TodoModel.create(newTodo, (id) => {
      newTodo.id = id
      this.state.todoLists.push(newTodo)
      this.setState({
        newTodo: '',
        todoLists: this.state.todoLists
      })
    }, (error) => {
      console.dir(error)
    })
  }
  toggle(e, todo) {
    let oldStatus = todo.status
    todo.status = todo.status === 'completed' ? '' : 'completed'
    TodoModel.update(todo, () => {
      this.setState(this.state)
    }, error => {
      todo.state = oldStatus
      this.setState(this.state)
    })
  }
  delete(e, todo) {
    TodoModel.destroy(todo.id, () => {
      todo.deleted = true
      this.setState(this.state)
    })
  }
  onSignUpOrSignIn(user) {
    console.log('onSignUpOrSignIn', user)
    TodoModel.getByUser(user, (todos) => {
      let stateCopy = JSON.parse(JSON.stringify(this.state))
      stateCopy.user = user
      stateCopy.todoLists = todos
      this.setState(stateCopy)
    })
  }
  signOut() {
    signOut()
    console.log('singOut')
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = {}
    stateCopy.todoLists = []
    this.setState(stateCopy)
  }
  componentDidUpdate() {
    console.log('componentDidUpdate', this.state)
  }
  render() {
    let todos = this.state.todoLists
      .filter(item => !item.deleted)
      .map((item, index) => {
        return (
          <li key={index}>
            <TodoItem todo={item}
              onToggle={this.toggle.bind(this)}
              onDelete={this.delete.bind(this)}
            />
          </li>
        )
      })

    return (
      <div className="App">
        <h1>{this.state.user.username || '我'}的待办事项
          {this.state.user.id ? <button onClick={() => this.signOut()}>登出</button> : null}
        </h1>
        <div className="inputWrapper">
          <TodoInput content={this.state.newTodo}
            //注册onChange属性，赋值changeTitle方法，
            onChange={this.changeTitle.bind(this)}
            onSubmit={this.addTodo.bind(this)} />
        </div>
        <ol className="todoList">
          {todos}
        </ol>
        {/* {this.state.user.id ? null :
           <UserDialog
            onSignUp={this.onSignUpOrSignIn.bind(this)}
            onSignIn={this.onSignUpOrSignIn.bind(this)} /> } */}
            {this.state.user.id ? null :
              <NewUserDialog />
            }
      </div>
    );
  }
}

export default App;
