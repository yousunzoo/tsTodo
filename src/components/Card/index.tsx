import React, { useEffect, useState } from 'react';
import { Todo, addTodo, editTodo, removeTodo } from '../../modules/todos';
import * as S from './style';
import { useDispatch } from 'react-redux';
import { Draggable, Droppable } from 'react-beautiful-dnd';

interface IProps {
	status: string;
	data: Todo[];
}
function Card({ status, data }: IProps) {
	const dispatch = useDispatch();
	const [isOpened, setIsOpened] = useState(false);
	const [isEditMode, setIsEditMode] = useState(false);
	const [todo, setTodo] = useState('');
	const [editingTodo, setEditingTodo] = useState<Todo | null>();
	const background = status === 'todo' ? '#00B8D9' : status === 'doing' ? '#C5CAD2' : '#57D9A3';

	const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(addTodo(todo, status));
		setIsOpened(false);
		setTodo('');
	};
	const handleEditTodo = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsEditMode(false);
		if (!editingTodo) return;
		const { id, title } = editingTodo;
		dispatch(editTodo(id, title, status));
	};
	const handleDelete = (id: string, status: string) => {
		dispatch(removeTodo(id, status));
	};
	return (
		<S.Card style={{ backgroundColor: background }}>
			<S.Title>{status}</S.Title>
			{isEditMode && editingTodo ? (
				<S.EditForm onSubmit={handleEditTodo}>
					<S.Input
						type='text'
						placeholder='할 일을 수정해주세요.'
						value={editingTodo?.title}
						onChange={(e) => {
							setEditingTodo({ ...editingTodo, title: e.target.value });
						}}
					/>
				</S.EditForm>
			) : (
				<S.Form onSubmit={handleAddTodo}>
					{isOpened ? (
						<S.Input
							type='text'
							placeholder='할 일을 입력해주세요.'
							value={todo}
							onChange={(e) => {
								setTodo(e.target.value);
							}}
						/>
					) : (
						<S.OpenButton onClick={() => setIsOpened(true)}>할 일 추가</S.OpenButton>
					)}
				</S.Form>
			)}
			<Droppable droppableId={status}>
				{(provided) => (
					<S.List ref={provided.innerRef} {...provided.droppableProps}>
						{data.map((item, idx) => {
							return (
								<Draggable key={item.id} draggableId={item.id} index={idx}>
									{(provided) => (
										<S.Item ref={provided.innerRef} {...provided.draggableProps}>
											<span {...provided.dragHandleProps}>↕️</span>
											<S.ItemTitle>{item.title}</S.ItemTitle>
											<S.EditButton
												onClick={() => {
													setIsEditMode(!isEditMode);
													setEditingTodo(item);
												}}>
												✏️
											</S.EditButton>
											<S.DeleteButton
												onClick={(e) => {
													handleDelete(item.id, status);
												}}>
												🗑️
											</S.DeleteButton>
										</S.Item>
									)}
								</Draggable>
							);
						})}
						{provided.placeholder}
					</S.List>
				)}
			</Droppable>
		</S.Card>
	);
}

export default Card;
