import { View, Text,StyleSheet } from 'react-native'
import { useState, useEffect } from 'react';
import FormularioContacto from '../components/FormularioContacto';
import ListaContactos from '../components/ListaContactos';
import { collection,  query, doc, setDoc, getDocs, deleteDoc} from 'firebase/firestore';
import { db } from '../Credenciales';



export default function AñadirUnContacto() {
//guardar los datos en la bd
const [datos, setDatos] = useState([]);

//mandar datos a la bd
const guardarDatos = async (nuevoContacto) => {
  await setDoc (doc(db,'contactos', nuevoContacto.id), nuevoContacto);
  };

  //leer datos
  useEffect(()=>{
    recibirDatos();
  }, [datos]);

  const recibirDatos = async () => {
    const q = query(collection(db, 'contactos'));
    const querySnapshot =  await getDocs(q);
    const d = [];
    querySnapshot.forEach((doc)=>{
      const datosBD = doc.data()
      d.push(datosBD)
    });
    setDatos(d);
  }

    //Eliminar datos
 const eliminarContacto = async (id) => {
  await deleteDoc(doc(db, "contactos", id));
  }
  return (
    <>
    <View style={styles.containerPrincipal}>
      <View style={styles.contenedorForm}>
        <FormularioContacto
          guardarDatos={guardarDatos}
          datos={datos}
        ></FormularioContacto>
      </View>

      <View style={styles.contenedorLista}>
        <Text style={styles.tituloLista}>Lista Contactos</Text>   
              <ListaContactos
              datos={datos}
              eliminarGasto={eliminarContacto}
                >
              </ListaContactos>    
      </View>
    </View>
  </>
  )
}
const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 50,
  },
  contenedorForm: {
    width: '100%',

  },
  contenedorLista: {
    width: "100%",

  },
  tituloLista: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    marginLeft: 25,
    paddingTop: 10,

  }

});