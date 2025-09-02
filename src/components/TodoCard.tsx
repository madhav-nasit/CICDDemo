// Prompt: Create a card component with title, description, and delete button using TouchableOpacity.

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface TodoCardProps {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  onDelete: () => void;
  onToggle: () => void;
}

const TodoCard: React.FC<TodoCardProps> = ({
  id,
  title,
  description,
  completed,
  onDelete,
  onToggle,
}) => (
  <View style={[styles.card, completed && styles.completedCard]}>
    <TouchableOpacity style={styles.toggleButton} onPress={onToggle}>
      <View style={[styles.checkbox, completed && styles.checkedBox]}>
        {completed && <Text style={styles.checkmark}>✓</Text>}
      </View>
    </TouchableOpacity>

    <View style={styles.textContainer}>
      <Text style={[styles.title, completed && styles.completedText]}>
        {title}
      </Text>
      <Text style={[styles.description, completed && styles.completedText]}>
        {description}
      </Text>
    </View>

    <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
      <Text style={styles.deleteText}>Delete</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  completedCard: {
    backgroundColor: '#f8f8f8',
    opacity: 0.8,
  },
  toggleButton: {
    marginRight: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  checkedBox: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  deleteButton: {
    backgroundColor: '#ff5252',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TodoCard;
