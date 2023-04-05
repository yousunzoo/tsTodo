import React, { useEffect, useState } from 'react';
import { Todo, addTodo, removeTodo } from '../../modules/todos';
import * as S from './style';
import { useDispatch } from 'react-redux';

interface IProps {
	title: string;
	data: Todo[];
}
function Card({ title, data }: IProps) {
	const dispatch = useDispatch();
	const [isOpened, setIsOpened] = useState(false);
	const [todo, setTodo] = useState('');
	const background = title === 'todo' ? '#00B8D9' : title === 'doing' ? '#C5CAD2' : '#57D9A3';

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(addTodo(todo, title));
		setIsOpened(false);
	};
	const handleDelete = (id: string, status: string) => {
		dispatch(removeTodo(id, status));
	};
	return (
		<S.Card style={{ backgroundColor: background }}>
			<S.Title>{title}</S.Title>
			<S.Form onSubmit={handleSubmit}>
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
			<S.List>
				{data.map((item) => {
					return (
						<S.Item key={item.id}>
							<S.ItemTitle>{item.title}</S.ItemTitle>
							<S.DeleteButton
								onClick={(e) => {
									handleDelete(item.id, title);
								}}>
								삭제
							</S.DeleteButton>
						</S.Item>
					);
				})}
			</S.List>
		</S.Card>
	);
}

export default Card;
