import React, { Component } from 'react';
import TodoInput from './TodoInput.js'
import TodoItem from './TodoItem.js'
import 'normalize.css'
import './App.css';




class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newTodo: 'test',
      todoLists: [
        { id: 1, title: '第一个todos' }
      ]
    }
  }

  render() {
    let todos = this.state.todoLists.map((item, index) => {
      return (
        <li>
          <TodoItem todo={item} />
        </li>
      )
    })

    return (
      <div className="app">
        <h1>待办事项</h1>
        <div className="inputWrapper">
          <TodoInput />
        </div>
        <ol>
          {todos}
        </ol>
      </div>
    );
  }
}

export default App;
