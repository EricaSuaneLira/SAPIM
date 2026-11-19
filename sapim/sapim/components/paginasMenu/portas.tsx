import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default function Painel() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Tela Ativa - SAPIM</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  texto: { 
    color: '#ffffff', 
    fontSize: 18, 
    fontWeight: 'bold' 
  }
});
