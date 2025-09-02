import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { toggleTodo, removeTodo } from '../features/todos/todosSlice';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'TodoList'>;

export default function TodoListScreen({ navigation }: Props) {
  const todos = useSelector((state: RootState) => state.todos.items);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        contentContainerStyle={
          todos.length === 0 ? styles.emptyContainer : { padding: 16 }
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              onPress={() => dispatch(toggleTodo(item.id))}
              style={styles.cardBody}
            >
              <Text
                style={[
                  styles.cardTitle,
                  item.completed && styles.itemCompleted,
                ]}
                numberOfLines={1}
              >
                {item.title}
              </Text>
              {item.description?.length ? (
                <Text
                  style={[
                    styles.cardSubtitle,
                    item.completed && styles.itemCompleted,
                  ]}
                  numberOfLines={2}
                >
                  {item.description}
                </Text>
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch(removeTodo(item.id))}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No todos yet. Tap + to add one.</Text>
        }
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddTodo')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f7fb' },
  emptyContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: { color: 'gray' },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  cardBody: { flex: 1, paddingRight: 16 },
  cardTitle: { fontSize: 16, color: '#111', fontWeight: '600' },
  cardSubtitle: { marginTop: 4, color: '#666' },
  itemCompleted: { textDecorationLine: 'line-through', color: 'gray' },
  deleteText: { color: '#c00', fontWeight: '600' },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1e90ff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  fabText: { color: 'white', fontSize: 28, marginTop: -2 },
});
