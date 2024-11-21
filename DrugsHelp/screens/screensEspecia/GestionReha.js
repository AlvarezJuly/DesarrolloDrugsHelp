import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function GestionReha() {
  return (
    <View style={styles.container}>
      <Text>Gestion de usuarios en rehabilitación</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});