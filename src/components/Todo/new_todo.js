import { Component } from 'react';
import './index.scss';

class NewTodo extends Component {
  constructor (props){
    super(props)
    this.state = {
      todoVal: ''
    }
    this.handleChange = this.handleChange.bind(this); // 第一種 this callback 方式
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      todoVal: e.target.value
    })
  }
  // 第二種，還在測試中語法，不用寫 bind
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.todoVal) {
      // 使用父層 Fn 把值丟回去
      this.props.addNewTodo(this.state.todoVal);
      this.setState({ todoVal: ''})
    }
  }

  render() {
    return(
      <>
        <form onSubmit={this.handleSubmit}>
          <input type='text' value={this.state.todoVal} onChange={this.handleChange}></input>
        </form>
      </>
    )
  }
}

export default NewTodo;