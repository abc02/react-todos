import React from 'react'
import TodoItem from './TodoItem.js'

export default function TodoLists(props) {
    let todos = props.todoLists
        .filter(item => !item.deleted)
        .map((item, index) => {
            return (
                <li key={index} className="todo-item-wrapper">
                    <TodoItem todo={item}
                        onToggle={props.onToggle}
                        onDelete={props.onDelete}
                    />
                </li>
            )
        })

    return (
        <ol className="todo-lists-wrapper">
            {todos}
        </ol>
    )
}