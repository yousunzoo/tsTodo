import { useState } from 'react';
import * as S from './styles';
import Board from './components/Board';
import { Provider } from 'react-redux';
import { persistor, store } from './modules';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
	return (
		<S.App>
			<Provider store={store}>
				<PersistGate loading={<>로딩..</>} persistor={persistor}>
					<S.Title>📝 칸반 보드 📝</S.Title>
					<Board />
				</PersistGate>
			</Provider>
		</S.App>
	);
}

export default App;
