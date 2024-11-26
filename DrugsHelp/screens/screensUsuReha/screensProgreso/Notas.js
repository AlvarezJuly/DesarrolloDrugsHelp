import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { addNote, editNote, deleteNote } from '../../../services/MoReha/ProgresFunciones'; // Asegúrate de que esta ruta esté correcta

export default function Notas({ route }) {
  const { notes } = route.params;
  const [title, setTitle] = useState(''); // Para el título de la nota
  const [description, setDescription] = useState(''); // Para la descripción de la nota
  const [editingNote, setEditingNote] = useState(null);  // Para identificar la nota que estamos editando

  const handleAddNote = async () => {
    if (title.trim() !== '' && description.trim() !== '') {
      await addNote(title, description);  // Guarda la nueva nota en Firebase
      setTitle('');  // Limpia el campo de título
      setDescription('');  // Limpia el campo de descripción
    }
  };

  const handleEditNote = async (noteId, editedTitle, editedDescription) => {
    await editNote(noteId, editedTitle, editedDescription);  // Edita la nota en Firebase
    setEditingNote(null);  // Deja de editar la nota
  };

  const handleDeleteNote = async (noteId) => {
    await deleteNote(noteId);  // Elimina la nota de Firebase
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notas</Text>

      {/* Campos de texto para agregar nuevas notas */}
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
        multiline
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddNote}>
        <Text style={styles.addButtonText}>Agregar Nota</Text>
      </TouchableOpacity>

      <ScrollView>
        {notes.map((note) => (
          <View key={note.id} style={styles.noteCard}>
            {editingNote === note.id ? (
              // Si estamos editando la nota, mostramos campos para editar el título y contenido
              <View>
                <TextInput
                  style={styles.input}
                  defaultValue={note.title}
                  onChangeText={(text) => setTitle(text)}
                />
                <TextInput
                  style={styles.input}
                  defaultValue={note.description}
                  onChangeText={(text) => setDescription(text)}
                  multiline
                />
                <TouchableOpacity
                  onPress={() => handleEditNote(note.id, title, description)}
                  style={styles.saveButton}
                >
                  <Text style={styles.saveButtonText}>Guardar</Text>
                </TouchableOpacity>
              </View>
            ) : (
              // Si no estamos editando, mostramos el título y contenido de la nota
              <View>
                <Text style={styles.noteTitle}>{note.title}</Text>
                <Text style={styles.noteText}>{note.description}</Text>

                {/* Botones para editar y eliminar */}
                <View style={styles.icons}>
                  <TouchableOpacity onPress={() => setEditingNote(note.id)}>
                    <Ionicons name="pencil" size={24} color="blue" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDeleteNote(note.id)}>
                    <Ionicons name="trash" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  addButton: {
    backgroundColor: '#5AC8FA',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noteCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
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
    color: '#333',
  },
  noteText: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
