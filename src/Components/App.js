import React, { Component } from 'react';
import TodoInput from './Todo/TodoInput.js'
import TodoItem from './Todo/TodoItem.js'
import UserDialog from './UserDialog/UserDialog.js'
import { getCurrentUser, signOut, TodoModel } from '../ServiceAPI/LeanCloud.js'
import 'normalize.css'
import '../reset.css'
import './App.css';


let id = 0
function idMaker() {
  id += 1
  console.log(id)
  return id
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: getCurrentUser() || {},
      newTodo: '',
      todoLists: []
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
      status: null,
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
    }, (error) =>{
      console.dir(error)
    })
  }
  toggle(e, todo) {
    todo.status = todo.status === 'completed' ? '' : 'completed'
    this.setState(this.state)
  }
  delete(e, todo) {
    todo.deleted = true
    this.setState(this.state)
    console.log(this.state)
  }
  onSignUpOrSignIn(user) {
    console.log('onSignUp', user)
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = user
    this.setState(stateCopy)
  }
  signOut() {
    signOut()
    console.log('singOut', this)
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = {}
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
        {this.state.user.id ? null :
          <UserDialog
            onSignUp={this.onSignUpOrSignIn.bind(this)}
            onSignIn={this.onSignUpOrSignIn.bind(this)} />}
      </div>
    );
  }
}

export default App;