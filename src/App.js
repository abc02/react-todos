import React, { Component } from 'react';
import TodoInput from './TodoInput.js'
import TodoItem from './TodoItem.js'
import  * as localStore from './loclaStore.js'
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
      newTodo: '',
      todoLists: localStore.load('todoLists') || [] //window.localStorage.getItem('todoLists') 如果有获取数据，没有则空数组
    }
    this.changeTitle = this.changeTitle.bind(this)
    this.addTodo = this.addTodo.bind(this)
    this.toggle = this.toggle.bind(this)
    this.delete = this.delete.bind(this)
  }
  changeTitle(e) {
    // 接收TodoInput 传入的event参数，setState
    console.log('changTitle')
    this.setState({
      newTodo: e.target.value,
      todoLists: this.state.todoLists
    })
    // 输入数据后，保存至localStorage.setItem() 
    localStore.save('todoLists', this.state.todoLists)
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
     // 添加item，保存至localStorage.setItem() 
    localStore.save('todoLists', this.state.todoLists)
  }
  toggle(e, todo) {
    todo.status = todo.status === 'completed' ? '' : 'completed'
    this.setState(this.state)
    // 添加item，保存至localStorage.setItem() 
    localStore.save('todoLists', this.state.todoLists)
  }
  delete(e, todo) {
    todo.deleted = true
    this.setState(this.state)
    console.log(this.state)
    localStore.save('todoLists', this.state.todoLists)
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
        <h1>待办事项</h1>
        <div className="inputWrapper">
          <TodoInput content={this.state.newTodo}
            //注册onChange属性，赋值changeTitle方法，
            onChange={this.changeTitle}
            onSubmit={this.addTodo} />
        </div>
        <ol className="todoList">
          {todos}
        </ol>
      </div>
    );
  }
}

export default App;
