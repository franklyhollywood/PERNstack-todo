import { Fragment, useEffect, useState } from 'react';
import EditTodo from './EditTodo.js';

export default function ListTodos() {
	const [todos, setTodos] = useState([]);

	//delete function
	const deleteTodo = async (id) => {
		try {
			const deteleTodo = await fetch(
				`https://pern-todo.herokuapp.com/todos/${id}`,
				{
					method: 'DELETE',
				}
			);
			setTodos(todos.filter((todo) => todo.todo_id !== id));
		} catch (error) {
			console.error(error.message);
		}
	};

	useEffect(() => {
		const getTodos = async () => {
			try {
				const response = await fetch('https://pern-todo.herokuapp.com/todos');
				const jsonData = await response.json();

				setTodos(jsonData);
			} catch (error) {
				console.error(error.message);
			}
		};
		getTodos();
	}, []);

	return (
		<Fragment>
			<table className='table table-bordered table-sm mt-5 text-center'>
				<thead>
					<tr>
						<th>Description</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{/* <tr>
						<td>John</td>
						<td>Doe</td>
						<td>john@example.com</td>
					</tr>
					<tr>
						<td>Mary</td>
						<td>Moe</td>
						<td>mary@example.com</td>
					</tr>
					<tr>
						<td>July</td>
						<td>Dooley</td>
						<td>july@example.com</td>
					</tr> */}
					{todos.map((todo) => (
						<tr key={todo.todo_id}>
							<td>{todo.description}</td>
							<td>
								{/* <button className='btn btn-'> */}
								<EditTodo todo={todo} />
								{/* </button> */}
							</td>
							<td>
								<button
									className='btn btn-danger'
									onClick={() => deleteTodo(todo.todo_id)}
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</Fragment>
	);
}
