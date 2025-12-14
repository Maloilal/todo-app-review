import { configureStore } from '@reduxjs/toolkit'
// 1. В данном случае используется устаревший способ написания редьюсера, можно использовать createSlice из redux-toolkit и создать отдельный слайс для todo
// 2. Нужно типизировать todo items.
export default configureStore({
    reducer: {
        list: (state = {todos: []}, action) => {
            switch (action.type) {
                case 'ADD_TODO': {
                    const newState = state;
                    newState.todos.push(action.payload);
                    return newState;
                }
                case 'REMOVE_TODO': {
                    return {
                        ...state,
                        todos: state.todos.filter((t: any, index: number) => index !== action.payload),
                    };
                }
                case 'CHANGE_TODOS': {
                    return {
                        todos: action.payload,
                    };
                }
                default:
                    return state;
            }
        }
    }
})
