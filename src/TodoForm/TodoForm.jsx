import React, { Component } from 'react'


class TodoForm extends Component{
	constructor(props){
		super(props);
		this.state = {
			newTodoContent: " ",
		};
		this.handleUserInput = this.handleUserInput.bind(this);
		this.writeTodo = this.writeTodo.bind(this);
	}

    //Creating todo form
	handleUserInput(e) {
		this.setState({
			 newTodoContent: e.target.value ,
		})	
	}

	writeTodo(){

		this.props.writeTodo(this.state.newTodoContent);


		this.setState({
			newTodoContent: ' ',
		}) 
	}

	render(){
		return(
			<div className="formContainer">
				<input className = "noteInput" placeholder = "Write a new Todo" value={this.state.newTodoContent} onChange = {this.handleUserInput} />
				<button className = "todoButton" onClick ={this.writeTodo}>TASK</button>
			</div>
		)
	}
}

export default TodoForm;