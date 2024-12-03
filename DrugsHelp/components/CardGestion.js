import React from 'react';
import { View, StyleSheet, } from 'react-native';
import { Card, Paragraph, Button } from 'react-native-paper';

export default function CardGetion({ item, attributes, onEdit, onDelete, onUpdate }) {
  const handleEdit = () => onEdit(item);
  const handleDelete = () => onDelete(item);
  const handleUpdate = () => onUpdate(item);

  return (
    <Card style={styles.card}>
      <Card.Content>
        {/* Renderizar dinámicamente los atributos */}
        {attributes.map((attr) => (
          <Paragraph key={attr}>
            {attr}: {item[attr] || 'No disponible'}
          </Paragraph>
        ))}

        {/* Botones de acción */}
        <View style={styles.actions}>
          <Button mode="outlined" onPress={handleEdit}>
            Editar
          </Button>
          <Button mode="outlined" onPress={handleDelete} color="red">
            Eliminar
          </Button>
          <Button mode="outlined" onPress={handleUpdate}>
            Actualizar
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
