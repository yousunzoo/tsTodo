import React from 'react';
import { Todo, removeTodo } from '../../modules/todos';
import * as S from './style';
import { useDispatch } from 'react-redux';

interface IProps {
	title: string;
	data: Todo[];
}
function Card({ title, data }: IProps) {
	const dispatch = useDispatch();
	const background = title === 'todo' ? '#00B8D9' : title === 'doing' ? '#C5CAD2' : '#57D9A3';

	const handleDelete = (id: string, status: string) => {
		dispatch(removeTodo(id, status));
	};
	return (
		<S.Card style={{ backgroundColor: background }}>
			<S.Title>{title}</S.Title>
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
