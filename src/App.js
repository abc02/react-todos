import React, { Component } from 'react';
import TodoInput from './TodoInput.js'
import TodoItem from './TodoItem.js'
import 'normalize.css'
import './reset.css'
import './App.css';

let id = 0
function idMaker() {
  id += 1
  return id
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newTodo: '',
      todoLists: []
    }
    this.addTodo = this.addTodo.bind(this)
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
  render() {
    let todos = this.state.todoLists.map((item, index) => {
      return (
        <li key={index}>
          <TodoItem todo={item} />
        </li>
      )
    })

    return (
      <div className="App">
        <h1>待办事项</h1>
        <div className="inputWrapper">
          <TodoInput content={this.state.newTodo} onSubmit={this.addTodo} />
        </div>
        <ol>
          {todos}
        </ol>
      </div>
    );
  }
}

export default App;
