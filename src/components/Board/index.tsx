import { useDispatch } from 'react-redux';
import { RootState, useAppSelector } from '../../modules';
import * as S from './style';
import Card from '../Card';
function Board() {
	const { todo, done, doing } = useAppSelector((state) => state.todos);

	return (
		<S.Board>
			<Card status='todo' data={todo} />
			<Card status='doing' data={doing} />
			<Card status='done' data={done} />
		</S.Board>
	);
}

export default Board;
