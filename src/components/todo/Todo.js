import React, { Component } from 'react'
import TodoInput from './TodoInput'
import TodoLists from './TodoLists'
import TodoItem from './TodoItem.js'
import { getCurrentUser, signOut, TodoModel } from 'serviceAPI/LeanCloud.js'
import 'styles/todo.css'
import 'styles/iconfont.js'


export default class Todo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newTodo: '',
            todoLists: []
        }
        this.getLeanCloud.bind(this)()
    }
    getLeanCloud() {
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
        console.log('addTodo', e.key)
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
    toggle(todo,e) {
        console.log('toggle',todo.status)
        let oldStatus = todo.status
        todo.status = todo.status === 'completed' ? '' : 'completed'
        TodoModel.update(todo, () => {
            this.setState(this.state)
        }, error => {
            todo.state = oldStatus
            this.setState(this.state)
        })
    }
    delete(todo,e) {
        console.log('delete',todo.deleted)
        TodoModel.destroy(todo.id, () => {
            todo.deleted = true
            this.setState(this.state)
        })
    }
    updateItem(todo,e){
        console.log('updateItem', )
        let oldTitle = todo.title
          TodoModel.update(todo, () => {
            this.setState(this.state)
        }, error => {
            todo.title = oldTitle
            this.setState(this.state)
        })
    }
    changeItem(todo, e) {
        console.log('changeItem', e.target.value,e.key)
        let oldTitle = todo.title
        todo.title = e.target.value
        this.setState(this.state)
      
    }
    render() {
        return (
            <div className="todo-wrapper">
                <TodoInput
                    content={this.state.newTodo}
                    //注册onChange属性，赋值changeTitle方法，
                    onChange={this.changeTitle.bind(this)}
                    onSubmit={this.addTodo.bind(this)} />
                <TodoLists
                    todoLists={this.state.todoLists}
                    onToggle={this.toggle.bind(this)}
                    onDelete={this.delete.bind(this)}
                    onUpdateItem={this.updateItem.bind(this)}
                    onChangeItem={this.changeItem.bind(this)} />

            </div>
        )
    }
} 