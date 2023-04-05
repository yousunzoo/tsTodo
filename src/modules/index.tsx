import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers, legacy_createStore as createStore } from 'redux';
import todos from './todos';
import { TypedUseSelectorHook } from 'react-redux';
import { useSelector } from 'react-redux';

export const rootReducer = combineReducers({
	todos,
});

const persistConfig = {
	key: 'root', // 임의의 key 값
	storage: storage, // 정확히 어떤 storage 에 저장할지
	whitelist: ['todos'], // 값을 저장할 리듀서명
};

export type RootState = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
