import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { StackParamList } from '../types/StackParamList';

export default function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const entrar = () => {
    navigation.navigate('MostrarTreino');
  };

  const limpar = () => {
    // Implementar lógica de limpar campos, se desejar
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.input} placeholder="Usuário" />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry />

      {/* Botão Entrar com dois ícones */}
      <TouchableOpacity style={styles.buttonEntrar} onPress={entrar}>
        <FontAwesome5 name="dumbbell" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Entrar</Text>
        <FontAwesome5 name="dumbbell" size={20} color="#fff" style={styles.icon} />
      </TouchableOpacity>

      {/* Botão Limpar com fundo branco */}
      <TouchableOpacity style={styles.buttonLimpar} onPress={limpar}>
        <FontAwesome5 name="dumbbell" size={18} color="#333" style={styles.icon} />
        <Text style={styles.buttonTextLimpar}>Limpar</Text>
        <FontAwesome5 name="dumbbell" size={18} color="#333" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonEntrar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2e86de',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginHorizontal: 10,
  },
  icon: {
    marginHorizontal: 5,
  },
  buttonLimpar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#aaa',
  },
  buttonTextLimpar: {
    color: '#333',
    fontSize: 16,
    marginHorizontal: 10,
  },
});