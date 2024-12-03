import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { fetchAllCollections } from '../../services/MoAdmin/GestionFunciones';
import CardGetion from '../../components/CardGestion'; // Importa el componente

export default function GestionApp() {
  const [collectionsData, setCollectionsData] = useState({
    contactos: [],
    diag_test: [],
    test: [],
    user: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllCollections();
      setCollectionsData(data);
    };

    fetchData();
  }, []);

  const handleEdit = (item) => {
    console.log('Editar:', item);
  };

  const handleDelete = (item) => {
    console.log('Eliminar:', item);
  };

  const handleUpdate = (item) => {
    console.log('Actualizar:', item);
  };

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>Gestión de Datos</Text>


      {/* Usuarios */}
      <Text style={styles.sectionTitle}>Usuarios</Text>
      {collectionsData.user.map((item) => (
        <CardGetion
          key={item.id}
          item={item}
          attributes={['id', 'nombre', 'email']} // Atributos específicos para usuarios
          onEdit={handleEdit}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}

      {/* Especialistas */}
      <Text style={styles.sectionTitle}>Especialistas</Text>
      {collectionsData.contactos.map((item) => (
        <CardGetion
          key={item.id}
          item={item}
          attributes={['id', 'nombreCom', 'correo', 'ciudad', 'numero', 'role']} // Atributos específicos para especialistas
          onEdit={handleEdit}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}

      {/* Diagnósticos */}
      <Text style={styles.sectionTitle}>Diagnósticos</Text>
      {collectionsData.diag_test.map((item) => (
        <CardGetion
          key={item.id}
          item={item}
          attributes={['id', 'resultado', 'fecha', 'usuario']} // Atributos específicos para diagnósticos
          onEdit={handleEdit}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
});
