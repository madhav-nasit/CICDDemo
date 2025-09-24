// Prompt: Create a Redux slice for todos with add, delete, and toggleComplete actions.

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface TodosState {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: [
    {
      id: '1',
      title: 'Welcome to Todo App',
      description: 'This is a sample todo to test the toggle functionality',
      completed: false,
    },
    {
      id: '2',
      title: 'Learn React Navigation',
      description: 'Set up stack navigation for the app',
      completed: true,
    },
    {
      id: '3',
      title: 'Implement Redux Store',
      description: 'Create todo slice with CRUD operations',
      completed: false,
    },
  ],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    toggleComplete: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find(todoItem => todoItem.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const { addTodo, removeTodo, toggleComplete } = todoSlice.actions;
export default todoSlice.reducer;
