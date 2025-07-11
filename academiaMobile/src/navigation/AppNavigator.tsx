import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import MostrarTreino from '../screens/treino/MostrarTreino';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MostrarTreino" component={MostrarTreino} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}