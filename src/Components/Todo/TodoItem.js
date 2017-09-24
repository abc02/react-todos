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
                <input type="text" id={`item-input-${props.index}`} className="todo-item-input" name={`item-input-${props.index}`}
                    //placeholder=" "
                    value={props.todo.title}
                    checked={props.todo.status === 'completed'}
                    onClick={props.onToggle.bind(null, props.todo)}
                    onChange={props.onChangeItem.bind(null, props.todo)} />
                <label htmlFor={`item-input-${props.index}`}>{props.todo.title}</label>
                <div className="requirements">
                    <input type="checkbox" id={`item-checked-${props.index}`} className="todo-item-checked" name={`item-checked-${props.index}`} 
                        required />
                    <label htmlFor={`item-checked-${props.index}`}>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-checked"></use>
                        </svg>
                    </label>
                    <div className="requirements">
                            完成
                    </div>
                    <input type="checkbox" id={`item-deleted-${props.index}`} className="todo-item-deleted" name={`item-deleted-${props.index}`} />
                    <label htmlFor={`item-deleted-${props.index}`}>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-deleted"></use>
                        </svg>
                    </label>
                    <div className="requirements">
                        删除
                    </div>
                </div>
            </div>
        </li>

    )
}