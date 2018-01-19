import React, { Component } from 'react';
import Todo from './Todo/Todo';
import TodoForm from './TodoForm/TodoForm'; 
import { DB_CONFIG } from './Config/config';
import firebase from 'firebase/app';
import 'firebase/database';
import './App.css';

class App extends Component {

	constructor(props) {
		super(props);
		this.writeTodo = this.writeTodo.bind(this);
		this.removeTodo = this.removeTodo.bind(this);

		this.app = firebase.initializeApp(DB_CONFIG);
		this.database = this.app.database().ref().child('todos');

		this.state = {
			todos: [],
		}
	}

	componentWillMount(){
		const earlierTodos = this.state.todos;

		//Data snapshot
		this.database.on('child_added', snap => {
			earlierTodos.push({
				id: snap.key,
				todoContent: snap.val().todoContent,
			})

			this.setState({
				todos: earlierTodos
			})
		})
		//loop through array and splice the child from our array
		this.database.on('child_removed', snap => {
			for(var i=0; i < earlierTodos.length; i++){
				if(earlierTodos[i].id === snap.key) {
					earlierTodos.splice(i, 1);
				}
			}

			this.setState({
				todos: earlierTodos
			})
		})
	}


	writeTodo(todo){
		this.database.push().set({ todoContent: todo});
	}

	removeTodo(todoId){
		this.database.child(todoId).remove();
	}


  render() {
    return (
    	
		<div class= "container background">
	      <h1 id='title'>TIME FOR TASKS</h1>
	      <TodoForm writeTodo = {this.writeTodo} />
	    {
	    	this.state.todos.map((todo) => {
	    		return(
	    			<Todo todoContent={todo.todoContent} 
	    			todoId={todo.id} 
	    			key={todo.id} 
	    			removeTodo = {this.removeTodo} />
	    		)
	    	})
	      
		}	  	
	  	</div>
    );
  }
}

export default App;
