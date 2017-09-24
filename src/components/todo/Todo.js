import React, { Component } from 'react'
import TodoInput from './TodoInput'
import TodoLists from './TodoLists'
import TodoItem from './TodoItem.js'
import { getCurrentUser, signOut, TodoModel } from 'serviceAPI/LeanCloud.js'
import 'styles/todo.css'


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
        console.log(todo)
        let oldStatus = todo.status
        todo.status = todo.status === 'completed' ? '' : 'completed'
        this.setState(this.state)
        // TodoModel.update(todo, () => {
        //     this.setState(this.state)
        // }, error => {
        //     todo.state = oldStatus
        //     this.setState(this.state)
        // })
    }
    delete(e, todo) {
        TodoModel.destroy(todo.id, () => {
            todo.deleted = true
            this.setState(this.state)
        })
    }
    changeItem(todo, e) {
        console.log('changeItem', todo,e.target.checked)
        let oldTitle = todo.title
        todo.title = e.target.value
        this.setState(this.state)
        // TodoModel.update(todo, () => {
        //     console.log('changeItem', 'update')
        //     let stateCopy = JSON.parse(JSON.stringify(this.state))
        //     stateCopy.todoLists[index] = todo
        //     this.setState(stateCopy)
        // }, error => {
        //     todo.title = oldTitle
        //     this.setState(this.state)
        // })
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
                    onChangeItem={this.changeItem.bind(this)} />

            </div>
        )
    }
} 