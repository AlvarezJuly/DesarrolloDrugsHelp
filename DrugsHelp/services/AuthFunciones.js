import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './CredencialesFirebase';
import { Alert } from 'react-native';


// Iniciar sesión
export const loginUsuario = async (email, password, navigation) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);

    const user = auth.currentUser;
    const userDocRef = doc(db, 'user', user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      const userRole = userData.role;

      console.log('Rol del usuario atrapado:', userRole);

      Alert.alert('Iniciando sesión', 'Accediendo...', [
        {
          text: 'OK',
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{name:'MainNavigator', params:{ userRole } }],
            });
          },
        },
      ]);
    } else {
      Alert.alert('Error', 'No se pudo encontrar el rol del usuario');
    }
  } catch (error) {
    console.error('Error durante el inicio de sesión:', error);
    Alert.alert('Error', 'El usuario o la contraseña son incorrectos');
  }
};

// Registrarse
export const registroUsuario = async (nombreComp, email, password, navigation) => {
  if (!nombreComp || !email || !password) {
    Alert.alert('Error', 'Todos los campos son obligatorios');
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, 'user', user.uid), {
      name: nombreComp,
      email: user.email,
      createdAt: new Date(),
      role: 'rehabilitacion',
    });

    Alert.alert('Éxito', 'Usuario registrado exitosamente', [
      {
        text: 'OK',
        onPress: () => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'MainNavigator', params: { userRole: 'rehabilitacion' } }],
          });
        },
      },
    ]);
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      Alert.alert('Error', 'El correo electrónico ya está registrado');
    } else {
      console.error(error);
      Alert.alert('Error', 'Algo salió mal: ' + error.message);
    }
  }
};

// Cerrar sesión
export const cerrarSesion = async (navigation) => {
  try {
    await signOut(auth);
    Alert.alert('Éxito', 'Sesión cerrada correctamente', [
      {
        text: 'OK',
        onPress: () => {
          // Redirigir al stack de autenticación
          navigation.reset({
            index: 0,
            routes: [{ name: 'AuthNavigator' }],
          });
        },
      },
    ]);
  } catch (error) {
    console.log(error);
    Alert.alert('Error', 'Algo salió mal al cerrar sesión');
  }
};
