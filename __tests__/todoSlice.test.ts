import todosReducer, {
  addTodo,
  removeTodo,
  toggleComplete,
} from '../src/store/slices/todoSlice';

describe('todoSlice reducer', () => {
  it('returns initial state for @@INIT', () => {
    const state = todosReducer(undefined as any, { type: '@@INIT' } as any);
    expect(Array.isArray(state.todos)).toBe(true);
    expect(state.todos.length).toBeGreaterThan(0);
  });

  it('adds a todo', () => {
    const previous = todosReducer(undefined as any, { type: '@@INIT' } as any);
    const newTodo = {
      id: 't-1',
      title: 'Write tests',
      description: 'Cover reducers',
      completed: false,
    };
    const next = todosReducer(previous, addTodo(newTodo));
    expect(next.todos.find(t => t.id === newTodo.id)).toEqual(newTodo);
    expect(next.todos.length).toBe(previous.todos.length + 1);
  });

  it('removes a todo', () => {
    const base = todosReducer(undefined as any, { type: '@@INIT' } as any);
    const toRemove = base.todos[0];
    const next = todosReducer(base, removeTodo(toRemove.id));
    expect(next.todos.find(t => t.id === toRemove.id)).toBeUndefined();
    expect(next.todos.length).toBe(base.todos.length - 1);
  });

  it('toggles a todo completion', () => {
    const base = todosReducer(undefined as any, { type: '@@INIT' } as any);
    const target = base.todos[0];
    const toggled = todosReducer(base, toggleComplete(target.id));
    expect(toggled.todos.find(t => t.id === target.id)!.completed).toBe(
      !target.completed,
    );
    const toggledBack = todosReducer(toggled, toggleComplete(target.id));
    expect(toggledBack.todos.find(t => t.id === target.id)!.completed).toBe(
      target.completed,
    );
  });

  it('ignores toggle for missing id', () => {
    const base = todosReducer(undefined as any, { type: '@@INIT' } as any);
    const next = todosReducer(base, toggleComplete('missing-id'));
    expect(next).toEqual(base);
  });
});
