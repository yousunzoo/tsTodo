import { nanoid } from 'nanoid';

// 액션 타입
const ADD_TODO = 'todos/ADD_TODO' as const;
const EDIT_TODO = 'todos/EDIT_TODO' as const;
const REMOVE_TODO = 'todos/REMOVE_TODO' as const;
const CHANGE_TODO_STATUS = 'todos/CHANGE_TODO_STATUS' as const;

// 액션 객체 생성 함수
export const addTodo = (todo: string, status: string) => ({ type: ADD_TODO, payload: { todo, status } });
export const editTodo = (id: string, todo: string, status: string) => ({ type: EDIT_TODO, payload: { id, todo, status } });
export const removeTodo = (id: string, status: string) => ({ type: REMOVE_TODO, payload: { id, status } });
export const changeTodoStatus = (id: string, status: string) => ({ type: CHANGE_TODO_STATUS, payload: { id, status } });

// 액션 객체 타입
type TodoAction = ReturnType<typeof addTodo | typeof editTodo | typeof removeTodo | typeof changeTodoStatus>;

export type Todo = {
	id: string;
	title: string;
	status: string;
};
type TodosState = {
	[key: string]: Todo[];
};

// 초기 상태
const initialState: TodosState = {
	todo: [],
	doing: [],
	done: [],
};

// 리듀서 작성
export default function todos(state: TodosState = initialState, action: TodoAction) {
	switch (action.type) {
		case ADD_TODO:
			return {
				...state,
				[action.payload.status]: [...state[action.payload.status], { id: nanoid(), title: action.payload.todo }],
			};
		case EDIT_TODO:
			return {
				...state,
				[action.payload.status]: state[action.payload.status].map((item: Todo) => {
					if (item.id === action.payload.id) {
						return { ...item, title: action.payload.todo };
					}
					return item;
				}),
			};
		case REMOVE_TODO:
			return {
				...state,
				[action.payload.status]: state[action.payload.status].filter((item: Todo) => item.id !== action.payload.id),
			};
		default:
			return state;
	}
}
