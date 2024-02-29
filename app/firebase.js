// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import {getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, doc} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAgqhADU_3NkJ3-O9Ao1U4QPUCwWDDlEW8",
    authDomain: "fir-estudiare.firebaseapp.com",
    projectId: "fir-estudiare",
    storageBucket: "fir-estudiare.appspot.com",
    messagingSenderId: "309212790652",
    appId: "1:309212790652:web:a15f55d981b0bd959d6ef9",
    measurementId: "G-X79HBG55V2"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
//export const analytics = getAnalytics(app);

//CRUD

export const db = getFirestore();

export function guardarTarea(titulo, descripcion, email, materia) {
  addDoc(collection(db, "tareas"), { titulo, descripcion, email, materia });
}

export function obtenerTareas() {
  return onSnapshot(collection(db, 'tareas'));
}

export function actualizarObtenerTareas(callback) {
  return onSnapshot(collection(db, "tareas"), callback);
}

export function eliminarTarea(id){
  return deleteDoc(doc(db, 'tareas', id));
}