import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Todo extends Component{

	constructor(props) {
		super(props);
		this.todoContent = props.todoContent;
		this.todoId = props.todoId;
		this.handleRemoveTodo = this.handleRemoveTodo.bind(this);
	}

	handleRemoveTodo(id){
		this.props.removeTodo(id);
	}

	render(props){
		return(
			<div className= "todo fade-in"> 
				<p className = "todoContent"> { this.todoContent } </p>
				<span className = 'closebtn' 
					onClick={() => this.handleRemoveTodo(this.todoId)}>
					X
				</span>
			</div>
		)
	}
}

Todo.propTypes = {
	todoContent: PropTypes.string
}

export default Todo;