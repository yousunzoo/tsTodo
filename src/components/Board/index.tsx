import { useDispatch } from 'react-redux';
import { RootState, useAppSelector } from '../../modules';
import * as S from './style';
import Card from '../Card';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import React from 'react';
import { changeTodoStatus } from '../../modules/todos';
function Board() {
	const { todo, done, doing } = useAppSelector((state) => state.todos);
	const dispatch = useDispatch();

	const onDragEnd = ({ destination, source }: DropResult) => {
		dispatch(changeTodoStatus(source, destination));
	};
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<S.Board>
				<Card status='todo' data={todo} />
				<Card status='doing' data={doing} />
				<Card status='done' data={done} />
			</S.Board>
		</DragDropContext>
	);
}

export default Board;
