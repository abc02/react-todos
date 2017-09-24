import React from 'react'
import TodoItem from './TodoItem.js'

export default function TodoLists(props) {
    let todos = props.todoLists
        .filter(item => !item.deleted)
        .map((item, index) => {
            return (
                <TodoItem
                    key={index}
                    todo={item}
                    index={index}
                    onToggle={props.onToggle}
                    onDelete={props.onDelete}
                    onChangeItem={props.onChangeItem}
                />
            )
        })

    return (
        <ol className="todo-lists-wrapper">
            {todos}
        </ol>
    )
}