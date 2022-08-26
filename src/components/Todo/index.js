import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import NewTodo from './new_todo';
import TodoList from './todo_list';

class About extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todoList: []
    }
    this.addNewTodo = this.addNewTodo.bind(this)
    this.completeTodo = this.completeTodo.bind(this)
    this.removeTodo = this.removeTodo.bind(this)
  }

  addNewTodo(text) {
    const newItem = {
      text,
      completed: false,
      key: uuidv4(),
    }
    console.log('add', newItem)
    this.setState({
      todoList: [...this.state.todoList, newItem]
    })
  }

  completeTodo(index, item) {
    console.log(index, item);
    const newTodoList = [...this.state.todoList];
    newTodoList[index] = {...item};
    this.setState({ todoList: newTodoList });
  }

  removeTodo(index) {
    const newTodoList = [...this.state.todoList];
    newTodoList.splice(index, 1);
    this.setState({
      todoList: newTodoList
    })
  }

  render() {
    const todoList = this.state.todoList;
    const hasTodoList = todoList.length > 0;
    return (
      <>
        <h1>todos</h1>
        <NewTodo addNewTodo={this.addNewTodo}/>
        {/* {JSON.stringify(todoList)} */}
        {hasTodoList && (
          <ul className='list'>
            <TodoList todo={todoList} completeTodo={this.completeTodo} removeTodo={this.removeTodo} />
          </ul>
        )}
      </>
    )
  }
}

// function About() {
//   return (
//     <>
//       <main>
//         <h2>about</h2>
//       </main>
//       <Todo addNewTodo={this.addNewTodo}/>
//     </>
//   )
// }
export default About;