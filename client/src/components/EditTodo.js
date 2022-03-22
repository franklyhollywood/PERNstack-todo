import { Fragment, useState } from 'react';

export default function EditTodo({ todo }) {
	const [description, setDescription] = useState(todo.description);

	//edit description
	const updateDescription = async (e) => {
		e.preventDefault();
		try {
			const body = { description };
			const response = await fetch(
				`http://localhost:8000/todos/${todo.todo_id}`,
				{
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(body),
				}
			);
			window.location = '/';
		} catch (error) {
			console.error(error.message);
		}
	};
	return (
		<Fragment>
			<button
				type='button'
				className='btn btn-warning'
				data-bs-toggle='modal'
				data-bs-target={`#id${todo.todo_id}`}
			>
				Edit
			</button>

			<div
				className='modal'
				id={`id${todo.todo_id}`}
				onClick={() => setDescription(todo.description)}
			>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h4 className='modal-title'>Edit todo</h4>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								onClick={() => setDescription(todo.description)}
							></button>
						</div>

						<div className='modal-body'>
							<input
								type='text'
								className='form-control'
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							></input>
						</div>

						<div className='modal-footer'>
							<button
								type='button'
								className='btn btn-warning'
								data-bs-dismiss='modal'
								onClick={(e) => updateDescription(e)}
							>
								Edit
							</button>
							<button
								type='button'
								className='btn btn-danger'
								data-bs-dismiss='modal'
								onClick={() => setDescription(todo.description)}
							>
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}
