import React from 'react';
import { Alert, Text, TextInput, TouchableOpacity } from 'react-native';
import { Provider } from 'react-redux';
import AddTodoScreen from '../src/screens/AddTodoScreen';
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../src/store/slices/todoSlice';
import ReactTestRenderer, { act } from 'react-test-renderer';

// Basic mock for navigation.goBack to avoid need for full navigator stack
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ goBack: jest.fn() }),
}));

describe('AddTodoScreen', () => {
  it('shows error when trying to save without a title', () => {
    const store = configureStore({ reducer: { todos: todosReducer } });
    const alertSpy = jest
      .spyOn(Alert, 'alert')
      .mockImplementation(() => undefined);

    let tree!: ReactTestRenderer.ReactTestRenderer;
    act(() => {
      tree = ReactTestRenderer.create(
        <Provider store={store}>
          <AddTodoScreen />
        </Provider>,
      );
    });

    const saveButton = (tree as any).root
      .findAllByType(TouchableOpacity)
      .find((btn: any) =>
        btn.findAllByType(Text).some((t: any) => t.props.children === 'Save'),
      ) as ReactTestRenderer.ReactTestInstance;
    act(() => {
      saveButton.props.onPress();
    });

    expect(alertSpy).toHaveBeenCalled();
    alertSpy.mockRestore();
  });

  it('dispatches addTodo when title is provided', () => {
    const store = configureStore({ reducer: { todos: todosReducer } });

    let tree!: ReactTestRenderer.ReactTestRenderer;
    act(() => {
      tree = ReactTestRenderer.create(
        <Provider store={store}>
          <AddTodoScreen />
        </Provider>,
      );
    });

    const titleInput = (tree as any).root
      .findAllByType(TextInput)
      .find((n: any) => n.props.placeholder === 'Enter todo title');
    const descInput = (tree as any).root
      .findAllByType(TextInput)
      .find(
        (n: any) => n.props.placeholder === 'Enter todo description (optional)',
      );

    act(() => {
      titleInput?.props.onChangeText('My Task');
      descInput?.props.onChangeText('Do something');
    });

    const saveButton = (tree as any).root
      .findAllByType(TouchableOpacity)
      .find((btn: any) =>
        btn.findAllByType(Text).some((t: any) => t.props.children === 'Save'),
      ) as ReactTestRenderer.ReactTestInstance;
    act(() => {
      saveButton.props.onPress();
    });

    const state = store.getState();
    const found = state.todos.todos.find(t => t.title === 'My Task');
    expect(found).toBeTruthy();
  });
});
