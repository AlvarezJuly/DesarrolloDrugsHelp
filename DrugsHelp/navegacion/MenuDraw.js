import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import {logoutUsuario} from '../services/AuthFunciones'


const DropdownMenu = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  // Funciones de navegación para cada opción del menú
  const handleNavigation = (screen) => {
    setModalVisible(false);
    navigation.navigate(screen);
  };

  // Función para cerrar sesión y redirigir a la pantalla de Welcome
  const handleLogout = async () => {
    setModalVisible(false);
    await logoutUsuario(navigation); // Pasar `navigation` para redirigir al stack de autenticación
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.menuButton}>
        <Entypo name="menu" size={24} color="black" />
      </TouchableOpacity>
      
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('Configuraciones')}>
              <Icon name="cog" size={24} color="#0A3E5D" style={styles.icon} />
              <Text style={styles.menuText}>Configuraciones</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('Donaciones')}>
            <FontAwesome5 name="donate" size={24} color="#0A3E5D" style={styles.icon}/>
              <Text style={styles.menuText}>Donaciones</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('Ayuda')}>
              <Icon name="information-outline" size={24} color="#0A3E5D" style={styles.icon} />
              <Text style={styles.menuText}>Ayuda</Text>
            </TouchableOpacity>

            {/* Cerrar Sesión */}
            <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
              <Icon name="logout" size={24} color="#0A3E5D" style={styles.icon} />
              <Text style={styles.menuText}>Cerrar Sesión</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    padding: 10,
    marginRight: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  menuContainer: {
    width: 200,
    backgroundColor: '#D3D3C1', // Color de fondo similar a tu ejemplo
    borderRadius: 10,
    padding: 10,
    marginTop: 40,
    marginRight: 20,
    alignItems: 'flex-start',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
  },
  icon: {
    marginRight: 10,
  },
  menuText: {
    fontSize: 18,
    color: '#0A3E5D', // Color de texto similar al ejemplo
  },
});

export default DropdownMenu;
