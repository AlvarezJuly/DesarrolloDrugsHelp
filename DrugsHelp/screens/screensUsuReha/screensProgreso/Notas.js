import React, { useState, useEffect } from 'react'; 
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'; 
import { Ionicons } from '@expo/vector-icons'; 
import { addNote, getNotes, deleteNote } from '../../../services/MoReha/ProgresFunciones'; // Asegúrate de que esta ruta esté correcta

export default function Notas({ route }) {
  const { notes } = route.params;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [allNotes, setAllNotes] = useState([]);

  // Este useEffect carga las notas desde Firestore o la fuente de datos al iniciar
  useEffect(() => {
    const fetchNotes = async () => {
      const fetchedNotes = await getNotes(); // Obtener notas desde la base de datos
      setAllNotes(fetchedNotes);
    };

    fetchNotes();
  }, []); // Se ejecuta solo una vez al montar el componente

  const handleAddNote = async () => {
    if (title.trim() !== '' && description.trim() !== '') {
      await addNote(title, description);  // Agrega la nota a Firestore
      setTitle('');  // Limpia el campo de título
      setDescription('');  // Limpia el campo de descripción

      // Refresca la lista de notas después de agregar una nueva
      const updatedNotes = await getNotes();
      setAllNotes(updatedNotes);
    }
  };

  const handleDeleteNote = async (id) => {
    await deleteNote(id);  // Llamada para eliminar la nota
    const updatedNotes = await getNotes();  // Actualiza la lista después de eliminar
    setAllNotes(updatedNotes);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notas</Text>

      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Título de la nota"
      />
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Contenido de la nota"
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddNote}>
        <Text style={styles.addButtonText}>Agregar Nota</Text>
      </TouchableOpacity>

      <ScrollView>
        <Text style={styles.encabeNot}>Lista de Notas</Text>
        {allNotes.map((note) => (
          <View key={note.id} style={styles.noteCard}>
            <Text style={styles.noteTitle}>{note.title}</Text>
            <Text style={styles.noteDescription}>{note.description}</Text>
            <Text style={styles.noteTimestamp}>{new Date(note.timestamp.seconds * 1000).toLocaleString()}</Text>
            <TouchableOpacity onPress={() => handleDeleteNote(note.id)}>
              <Ionicons name="trash-outline" size={24} color="red" />
              <Text>Eliminar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#84B6F4',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#002E46',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#002E46',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  noteCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  noteDescription: {
    fontSize: 14,
    marginVertical: 5,
  },
  noteTimestamp: {
    fontSize: 12,
    color: 'gray',
  },
  encabeNot: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
