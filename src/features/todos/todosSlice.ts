import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

export type Todo = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

export type TodosState = {
  items: Todo[];
};

const initialState: TodosState = {
  items: [
    {
      id: nanoid(),
      title: 'Try Redux Toolkit',
      description: 'Create your first todo with a description field',
      completed: false,
    },
  ],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: {
      reducer(state, action: PayloadAction<Todo>) {
        state.items.unshift(action.payload);
      },
      prepare(title: string, description: string) {
        return {
          payload: { id: nanoid(), title, description, completed: false },
        };
      },
    },
    toggleTodo(state, action: PayloadAction<string>) {
      const todo = state.items.find(t => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo(state, action: PayloadAction<string>) {
      state.items = state.items.filter(t => t.id !== action.payload);
    },
  },
});

export const { addTodo, toggleTodo, removeTodo } = todosSlice.actions;
export default todosSlice.reducer;
