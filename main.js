import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js"
import { auth, actualizarObtenerTareas, eliminarTarea} from "./app/firebase.js";

import './app/crearCuenta.js'
import './app/iniciarSesion.js'
import './app/cerrarSesion.js'
import { verificarSesion } from './app/verificarSesion.js'


import {getFirestore, collection} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { guardarTarea, obtenerTareas} from "./app/firebase.js";

auth.onAuthStateChanged(async function (user) {
    if (user) {
        verificarSesion(user);
        const correo = user.email;
        console.log("sesion iniciada")
        try {
          
            //mostrarContenido(); 
            const formTareas = $("#form-tareas");
            formTareas.submit(function (e) {
                e.preventDefault();
                var titulo = formTareas.find("#titulo-tarea").val();
                var descripcion = formTareas.find("#descripcion-tarea").val();
                //console.log(title, description);
                guardarTarea(titulo, descripcion, user.email);
                
                formTareas.trigger('reset');
            });


        } catch (error) {
            console.log(error)
        }


        const querySnapshot = await obtenerTareas();
        const contenedorTareas = $("#contenedor-tareas");

        actualizarObtenerTareas(function (querySnapshot) {
            let html = '';
            querySnapshot.forEach(function (doc) {
                const task = doc.data();
                if (task.email == correo) {
                    html += `
          <li class="list-group-item list-group-item-action mt-2">
            <h5>${task.titulo}</h5>
            <p>${task.descripcion}</p>
            <div>
              <button class="btn btn-primary btn-eliminar" data-id="${doc.id}">
                Delete
              </button>
              <button class="btn btn-secondary btn-edit" data-id="">
                Edit
              </button>
            </div>
          </li>
        `;
                    console.log(task);
                }
            });
            contenedorTareas.html(html);

            //ACCION ELIMINAR

const $btnsEliminar = $(".btn-eliminar");

$btnsEliminar.each(function(){
$(this).on('click', function(event) {
  eliminarTarea($(this).data('id'));
});
});
        });



    } else {
        console.log("sin sesion")

       
        const contenedorTareas = $("#contenedor-tareas");
        contenedorTareas.html('<h3 class="text-white">Inicia sesión para ver tus publicaciones</h3>');
          


        //mostrarContenidoVacio();
        verificarSesion(user);
    }
});


