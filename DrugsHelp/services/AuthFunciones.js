import { auth, db } from './CredencialesFirebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

/**
 * Función para registrar un usuario.
 * @param {string} nombreComp - Nombre completo del usuario.
 * @param {string} email - Correo electrónico del usuario.
 * @param {string} password - Contraseña del usuario.
 * @param {Object} navigation - Objeto de navegación para redirigir.
 */
export const registroUsuario = async (nombreComp, email, password, navigation) => {
  try {
    // Crear usuario en Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Guardar datos adicionales en Firestore
    await setDoc(doc(db, "user", user.uid), {
      nombre: nombreComp,
      email: user.email,
      role: "rehabilitacion", // Rol por defecto
      createdAt: new Date(),
    });

    if (!nombreComp || !email || !password) {
      throw new Error("Todos los campos son obligatorios."); //probando el if
    }
    console.log("Usuario registrado exitosamente:", user);
    navigation.replace("Login"); // Redirigir al inicio de sesión tras el registro
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    alert(error.message);
  }
};


/**
 * Función para iniciar sesión.
 * @param {string} email - Correo electrónico del usuario.
 * @param {string} password - Contraseña del usuario.
 * @param {Object} navigation - Objeto de navegación para redirigir según el rol.
 */
export const loginUsuario = async (email, password, navigation) => {
  try {
    // Iniciar sesión en Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Actualizar el token para obtener los custom claims más recientes
    //const idTokenResult = await user.getIdTokenResult(true);
    const idTokenResult = await user.getIdTokenResult();//probando esto....

    const role = idTokenResult.claims.role;

    if (!role) {
      // Si no hay un rol en los custom claims, intenta obtenerlo desde Firestore
      const userDoc = await getDoc(doc(db, "user", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("Rol sincronizado desde Firestore:", userData.role);
        navigateByRole(userData.role, navigation);
      } else {
        alert("No se encontró información del usuario.");
      }
    } else {
      console.log("Rol del usuario autenticado:", role);
      navigateByRole(role, navigation);
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    alert(error.message);
  }
};

/**
 * Función para cerrar sesión.
 * @returns {Promise<void>}
 */
export const logoutUsuario = async () => {
  try {
    await signOut(auth);
    console.log("Sesión cerrada exitosamente");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    alert("No se pudo cerrar la sesión. Intente nuevamente.");
  }
};auth.onAuthStateChanged(() => {});


/**
 * Función para verificar si un usuario está autenticado y obtener su rol.
 * @param {Function} setUser - Función para actualizar el estado del usuario.
 */
export const verificarSesion = (setUser) => {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      try {
        console.log("Usuario autenticado:", user.email);
        // Actualizar el token para obtener los custom claims más recientes
        const idTokenResult = await user.getIdTokenResult(true);
        const role = idTokenResult.claims.role;

        if (role) {
          console.log("Rol desde custom claims:", role);
          setUser({ ...user, role });
        } else {
          // Si no hay un rol en los custom claims, intenta obtenerlo desde Firestore
          const userDoc = await getDoc(doc(db, "user", user.uid));
          if (userDoc.exists()) {
            setUser({ ...user, role: userDoc.data().role });
            console.log("Rol sincronizado desde Firestore:", userDoc.data().role);
          } else {
            console.error("No se encontró información del usuario en Firestore.");
            setUser(null);
          }
        }
      } catch (error) {
        console.error("Error al obtener la sesión del usuario:", error);
        setUser(null);
      }
    } else {
      console.log("No hay un usuario autenticado.");
      setUser(null);
    }
  });
};

/**
 * Función para redirigir al usuario según su rol.
 * @param {string} role - Rol del usuario.
 * @param {Object} navigation - Objeto de navegación para redirigir.
 */
const navigateByRole = (role, navigation) => {
  console.log("Navegando según el rol:", role);
  switch (role) {
    case "rehabilitacion":
      navigation.replace("RehabiNav");
      break;
    case "admon":
      navigation.replace("AdminNav");
      break;
    case "especialista":
      navigation.replace("EspeciaNav");
      break;
    default:
      alert("Rol desconocido. Contacte al administrador.");
  }
};

