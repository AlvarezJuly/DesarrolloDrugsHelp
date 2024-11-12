import { View, StyleSheet } from 'react-native';
import React from 'react';
import ChatBotInformate from '../../../components/ChatBotInformate'; 

export default function Informate() {
  return (
    <View style={styles.container}>
      <ChatBotInformate /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#84B6F4',
    flex: 1,
  },
});
