import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AddTodoScreen from '../screens/AddTodoScreen';

export type RootStackParamList = {
  Home: undefined;
  AddTodo: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#f5f5f5' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddTodo" component={AddTodoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
