import { useDispatch } from 'react-redux';
import { RootState, useAppSelector } from '../../modules';
import * as S from './style';
import Card from '../Card';
import { addTodo } from '../../modules/todos';
function Board() {
	const { todo, done, doing } = useAppSelector((state: RootState) => state.todos);
	const dispatch = useDispatch();

	console.log(todo, done, doing);

	return (
		<S.Board>
			<Card title='todo' data={todo} />
			<Card title='doing' data={doing} />
			<Card title='done' data={done} />
		</S.Board>
	);
}

export default Board;
