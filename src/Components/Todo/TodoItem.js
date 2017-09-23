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
export default function TodoItem(props){
    return (
        <div>
            <input type="checkbox" id="todo-item" name="todo-item"
                //required 
                //placeholder=" "
                checked={props.todo.status === 'completed'}
                onChange={props.onToggle.bind(null, props.todo)} />
            <label htmlFor="todo-item">{props.todo.title}</label>
            <button onClick={props.onDelete.bind(null, props.todo)}>删除</button>
            <div className="requirements">
                XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                </div>
        </div>
        // <div className="TodoItem" >
        //     <input type="checkbox"
        //         checked={this.props.todo.status === 'completed'}
        //         onChange={this.toggle.bind(this)}
        //     />
        //     <span className={`title ${this.props.todo.status}`}> </span>
        //     <button onClick={this.delete.bind(this)}>删除</button>
        // </div>
    )
}