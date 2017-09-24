import React from 'react'

// class TodoItem extends Component {
//     render() {


//     }
//     toggle(e) {
//         this.props.onToggle(e, this.props.todo)
//     }
//     delete(e) {
//         this.props.onDelete(e, this.props.todo)
//     }
// }
export default function TodoItem(props) {
    return (
        <li className="todo-item-wrapper">
            <div>
                <input type="checkbox" id={`item-checked-${props.index}`} className="todo-item-checked" name={`item-checked-${props.index}`}/>
                <label htmlFor={`item-checked-${props.index}`}>C</label>
                <input type="text" id={`item-input-${props.index}`} className="todo-item-input" name={`item-input-${props.index}`}
                    //placeholder=" "
                    value={props.todo.title}
                    checked={props.todo.status === 'completed'}
                    onClick={props.onToggle.bind(null, props.todo)}
                    onChange={props.onChangeItem.bind(null, props.todo)} />
                <label htmlFor={`item-input-${props.index}`}>{props.todo.title}</label>

            </div>
        </li>

    )
}