import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppSelector, useAppDispatch } from '../hooks';
import { removeTodo, toggleComplete } from '../store/slices/todoSlice';
import TodoCard from '../components/TodoCard';

type RootStackParamList = {
  Home: undefined;
  AddTodo: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const todos = useAppSelector(state => state.todos.todos);
  const dispatch = useAppDispatch();

  // ISSUE: Eslint & Typescript
  // const handleDeleteTodo = id => {
  const handleDeleteTodo = (id: string) => {
    dispatch(removeTodo(id));
  };

  const handleToggleTodo = (id: string) => {
    dispatch(toggleComplete(id));
  };

  const renderTodo = ({ item }: { item: any }) => (
    <TodoCard
      id={item.id}
      title={item.title}
      description={item.description}
      completed={item.completed}
      onDelete={() => handleDeleteTodo(item.id)}
      onToggle={() => handleToggleTodo(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Todo List</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddTodo')}
        >
          <Text style={styles.addButtonText}>+ Add Todo</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        renderItem={renderTodo}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  listContainer: {
    paddingVertical: 8,
  },
});

export default HomeScreen;
