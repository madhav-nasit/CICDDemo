import reducer, {
  addTodo,
  toggleTodo,
  removeTodo,
  TodosState,
} from '../src/features/todos/todosSlice';

describe('todosSlice', () => {
  const initial: TodosState = { items: [] };

  test('addTodo adds with title and optional description', () => {
    const state1 = reducer(initial, addTodo('Task A', 'Desc A'));
    expect(state1.items).toHaveLength(1);
    expect(state1.items[0].title).toBe('Task A');
    expect(state1.items[0].description).toBe('Desc A');

    const state2 = reducer(state1, addTodo('Task B', ''));
    expect(state2.items[0].title).toBe('Task B');
    expect(state2.items[0].description).toBe('');
  });

  test('toggleTodo flips completion for specific id', () => {
    const s1 = reducer(initial, addTodo('Task', '')); // one todo
    const id = s1.items[0].id;
    const s2 = reducer(s1, toggleTodo(id));
    expect(s2.items[0].completed).toBe(true);
    const s3 = reducer(s2, toggleTodo(id));
    expect(s3.items[0].completed).toBe(false);
  });

  test('removeTodo removes by id', () => {
    let s = reducer(initial, addTodo('A', '')); // first becomes index 0
    const idA = s.items[0].id;
    s = reducer(s, addTodo('B', ''));
    const idB = s.items[0].id;
    expect(s.items.map(t => t.id)).toEqual([idB, idA]);

    const afterRemove = reducer(s, removeTodo(idA));
    expect(afterRemove.items.map(t => t.id)).toEqual([idB]);
  });
});
