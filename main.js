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
            const formTareasMatematicas = $("#form-tareas-matematicas");
            formTareasMatematicas.submit(function (e) {
                e.preventDefault();
                var titulo = formTareasMatematicas.find("#titulo-tarea").val();
                var descripcion = formTareasMatematicas.find("#descripcion-tarea").val();
                //console.log(title, description);
                guardarTarea(titulo, descripcion, user.email, "Matematica");
                
                formTareasMatematicas.trigger('reset');
            });


        } catch (error) {
            console.log(error)
        }


        const querySnapshot = await obtenerTareas();
        const contenedorTareas = $("#contenedor-tareas-math");

        actualizarObtenerTareas(function (querySnapshot) {
            let html = '';
            querySnapshot.forEach(function (doc) {
                const task = doc.data();
                if (task.materia == "Matematica") {
                    html += `
          <li class="list-group-item list-group-item-action mt-2">
            <h5>${task.titulo}</h5>
            <p>${task.descripcion}</p>
            <div>
              <button class="btn btn-danger btn-eliminar bi bi-trash3" data-id="${doc.id}">
                Eliminar
              </button>
              <button class="btn btn-secondary btn-editar bi bi-pencil" data-id="">
                Editar
              </button>
            </div>
          </li>
        `;
                    console.log(task);
                }
            });
            contenedorTareas.html(html);

           

            //ACCION ELIMINAR

/*const $btnsEliminar = $(".btn-eliminar");

$btnsEliminar.each(function(){
$(this).on('click', function(event) {
  eliminarTarea($(this).data('id'));
});
});*/
        });



    } else {
        console.log("sin sesion")

       
        const contenedorTareas = $("#contenedor-tareas");
        contenedorTareas.html('<h3 class="text-dark">Inicia sesión para ver tus publicaciones</h3>');
          


        //mostrarContenidoVacio();
        verificarSesion(user);
    }
});



