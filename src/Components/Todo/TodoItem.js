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
                <input type="text" id={`item-input-${props.index}`} name={`item-input-${props.index}`}
                    //placeholder=" "
                    value={props.todo.title}
                    className={`todo-item-input ${props.todo.status}`}
                    onChange={props.onChangeItem.bind(null, props.todo)} />
                <label htmlFor={`item-input-${props.index}`}>{props.todo.title}</label>
                <div className="requirements">
                    <input type="checkbox" id={`item-checked-${props.index}`} className="todo-item-checked" name={`item-checked-${props.index}`}
                        required
                        checked={props.todo.status === 'completed'}
                        onChange={props.onToggle.bind(null, props.todo)} />
                    <label htmlFor={`item-checked-${props.index}`}>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-checked"></use>
                        </svg>
                    </label>
                    <div className="requirements">
                        完成
                    </div>
                    <input type="checkbox" id={`item-deleted-${props.index}`} className="todo-item-deleted" name={`item-deleted-${props.index}`}
                        onChange={props.onDelete.bind(null, props.todo)} />
                    <label htmlFor={`item-deleted-${props.index}`}>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-deleted"></use>
                        </svg>
                    </label>
                    <div className="requirements">
                        删除
                    </div>
                    <input type="checkbox" id={`item-saved-${props.index}`} className="todo-item-saved" name={`item-saved-${props.index}`}
                        required
                        onChange={props.onUpdateItem.bind(null, props.todo)} />
                    <label htmlFor={`item-saved-${props.index}`}>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-saved"></use>
                        </svg>
                    </label>
                    <div className="requirements">
                        保存
                    </div>
                </div>
            </div>
        </li>

    )
}