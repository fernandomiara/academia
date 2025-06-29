import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Menu, IconButton, Divider } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';

export default function MenuUsuario() {
  const [menuVisible, setMenuVisible] = useState(false);

  const navegarParaDados = () => {
    // Lógica para ir para a tela "Meus dados"
  };

  const navegarParaPontos = () => {
    // Lógica para ir para a tela "Meus pontos"
  };

  const logout = () => {
    // Lógica para realizar logout
  };
  return (
    <View style={styles.container}>
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
            <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <Image
                source={{ uri: 'https://i.pravatar.cc/100?img=12' }} // imagem de perfil aleatória e realista
                style={{ width: 40, height: 40, borderRadius: 20 }}
            />
            </TouchableOpacity>
        }
        >
        <Menu.Item onPress={() => navegarParaDados()} title="Meus dados" />
        <Menu.Item onPress={() => navegarParaPontos()} title="Meus pontos" />
        <Menu.Item onPress={() => logout()} title="Sair" />
        </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 16,
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
});
