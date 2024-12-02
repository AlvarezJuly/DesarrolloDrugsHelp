// Este archivo es para Inicialización de firebase      "CredencialesFirebase.js"
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";

//La configuración de mi proyecto de firebase
const firebaseConfig = {
  apiKey: "AIzaSyAMWEH8giMBJO4vDqhMpYjDUTJZKWHSbSo",
  authDomain: "drugshelp-a6819.firebaseapp.com",
  projectId: "drugshelp-a6819",
  storageBucket: "drugshelp-a6819.appspot.com",
  messagingSenderId: "761856109758",
  appId: "1:761856109758:web:ca1092e01c39d5690082ef"
};

//Principales servicios
const appFirebase = initializeApp(firebaseConfig);
const db = getFirestore(appFirebase);
const auth = initializeAuth(appFirebase, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth, db};
