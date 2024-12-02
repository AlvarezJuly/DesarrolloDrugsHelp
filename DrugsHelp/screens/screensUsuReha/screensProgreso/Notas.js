import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { addNote, getNotes, deleteNote } from '../../../services/MoReha/ProgresFunciones'; // Asegúrate de que esta ruta esté correcta

export default function Notas({ route }) {
  const { notes } = route.params;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [allNotes, setAllNotes] = useState(notes);

  const handleAddNote = async () => {
    if (title.trim() !== '' && description.trim() !== '') {
      await addNote(title, description);  // Agrega la nota a Firestore
      setTitle('');  // Limpia el campo de título
      setDescription('');  // Limpia el campo de descripción
      // Refresca la lista de notas
      const updatedNotes = await getNotes();
      setAllNotes(updatedNotes);
    }
  };

  const handleDeleteNote = async (noteId) => {// Aquí puedes implementar la lógica de eliminación de la nota
    await deleteNote(noteId); // Llama a la función mockeada o la real para eliminar en Firestore
    const updatedNotes = allNotes.filter((note) => note.id !== noteId);
    setAllNotes(updatedNotes); // Actualiza el estado local
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
      <Text>Lista de Notas</Text>
        {allNotes.map((note) => (
        <View key={note.id} style={styles.noteCard}>
            <Text style={styles.noteTitle}>{note.title}</Text>
            <Text style={styles.noteDescription}>{note.description}</Text>
            <Text style={styles.noteTimestamp}>{new Date(note.timestamp.seconds * 1000).toLocaleString()}</Text>  
            <TouchableOpacity onPress={() => handleDeleteNote(note.id)} testID={`delete-button-${note.id}`}>
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
    marginTop: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  noteDescription: {
    fontSize: 16,
    color: '#333',
  },
  noteTimestamp: {
    fontSize: 12,
    color: '#888',
  },
});
