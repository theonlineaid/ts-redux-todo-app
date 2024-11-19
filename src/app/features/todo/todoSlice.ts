import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the Todo type
interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

// Define the initial state as an array of Todo objects
const initialState: Todo[] = [];

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        // Add a new todo
        todoAdded(state, action: PayloadAction<{ id: string; text: string }>) {
            state.push({
                id: action.payload.id,
                text: action.payload.text,
                completed: false,
            });
        },

        // Toggle the completed status of a todo
        todoToggled(state, action: PayloadAction<string>) {
            const todo = state.find((todo) => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },

        // Delete a single todo
        singleTodoDel(state, action: PayloadAction<string>) {
            return state.filter((todo) => todo.id !== action.payload);
        },
    },
});

export const { todoAdded, todoToggled, singleTodoDel } = todosSlice.actions;
export default todosSlice.reducer;