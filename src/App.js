import React, { Component } from 'react';
import TodoInput from './TodoInput.js'
import TodoItem from './TodoItem.js'
import UserDialog from './UserDialog.js'
import { getCurrentUser , signOut, saveData} from './leancloud.js'
import 'normalize.css'
import './reset.css'
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
    this.changeTitle = this.changeTitle.bind(this)
    this.addTodo = this.addTodo.bind(this)
    this.toggle = this.toggle.bind(this)
    this.delete = this.delete.bind(this)
  }
  changeTitle(e) {
    console.log('changTitle')
    this.setState({
      newTodo: e.target.value,
      todoLists: this.state.todoLists
    })
  }
  addTodo(e) {
    this.state.todoLists.push({
      id: idMaker(),
      title: e.target.value,
      status: null,
      deleted: false
    })
    this.setState({
      newTodo: '',
      todoLists: this.state.todoLists
    })
    let stateString = JSON.stringify(this.state)
    saveData(stateString)
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
  signOut(){
    signOut()
    console.log('singOut',this)
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = {}
    this.setState(stateCopy)
  }
  componentDidUpdate(){
    console.log('componentDidUpdate',this.state)
  }
  render() {
    let todos = this.state.todoLists
      .filter(item => !item.deleted)
      .map((item, index) => {
        return (
          <li key={index}>
            <TodoItem todo={item}
              onToggle={this.toggle}
              onDelete={this.delete}
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
            onChange={this.changeTitle}
            onSubmit={this.addTodo} />
        </div>
        <ol className="todoList">
          {todos}
        </ol>
        {this.state.user.id ? null : <UserDialog 
        onSignUp={(user) => this.onSignUpOrSignIn(user)} 
        onSignIn={(user) => this.onSignUpOrSignIn(user)}
        />}

      </div>
    );
  }
}

export default App;
