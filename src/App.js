import React, { Component } from 'react';
import TodoInput from './TodoInput.js'
import TodoItem from './TodoItem.js'
import UserDialog from './UserDialog.js'
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
      user:{},
      newTodo: '',
      todoLists:  [] 
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
  onSignUp(user){
    console.log('onSignUp', user)
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user =user
    this.setState(stateCopy)
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
        <h1>{this.state.user.username || '我' }的待办事项</h1>
        <div className="inputWrapper">
          <TodoInput content={this.state.newTodo}
            //注册onChange属性，赋值changeTitle方法，
            onChange={this.changeTitle}
            onSubmit={this.addTodo} />
        </div>
        <ol className="todoList">
          {todos}
        </ol>
        {this.state.user.id  ? null :  <UserDialog onSignUp={(user) => this.onSignUp(user)}/>}
       
      </div>
    );
  }
}

export default App;
