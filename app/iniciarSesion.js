//LOGICA PARA INICIAR SESION
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js"
import {auth} from "./firebase.js";
import { mostrarMensaje } from "./mostrarMensaje.js";

console.log(auth);

const formIniciarSesion = $("#formIniciarSesion");

//console.log(formIniciarSesion);

formIniciarSesion.submit(async function(e){
    e.preventDefault();

    var correo = formIniciarSesion.find("#correoIniciarSesion").val();
    var contra = formIniciarSesion.find("#contraIniciarSesion").val();

    //console.log(correo);
    //console.log(contra);

    try{
        const credencialesUsuario = await signInWithEmailAndPassword(auth,correo,contra);
        
        const modalIniciarSesion = $("#modalIniciarSesion");
        const modal = bootstrap.Modal.getInstance(modalIniciarSesion);
        modal.hide(); //ocultar el modal

        formIniciarSesion.trigger("reset"); //reiniciar el forms
    
        mostrarMensaje("BIENVENIDX DE NUEVO "+credencialesUsuario.user.email);
    }

    catch(error){
        console.log("ERRORR");
        
        if(error.code === "auth/invalid-email"){
            alert("EMAIL INVALIDO");
        }
        
        else{
            alert("ES CUALQUIER OTRO TIPO DE ERROR");
        }


    }
});