//LOGICA PARA CREAR CUENTA
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js"
import {auth} from "./firebase.js";
import { mostrarMensaje } from "./mostrarMensaje.js";

console.log(auth);

const formCrearCuenta = $("#formCrearCuenta");

//console.log(formCrearCuenta);

formCrearCuenta.submit(async function(e){
    e.preventDefault();

    var correo = formCrearCuenta.find("#correoCrearCuenta").val();
    var contra = formCrearCuenta.find("#contraCrearCuenta").val();

    //console.log(correo);
    //console.log(contra);

    try{
        const credencialesUsuario = await createUserWithEmailAndPassword(auth,correo,contra);
        
        const modalCrearCuenta = $("#modalCrearCuenta");
        const modal = bootstrap.Modal.getInstance(modalCrearCuenta);
        modal.hide(); //ocultar el modal

        formCrearCuenta.trigger("reset"); //reiniciar el forms
    
        mostrarMensaje("BIENVENIDX "+credencialesUsuario.user.email);
    }

    catch(error){
        console.log("ERRORR");
        if(error.code == "auth/email-already-in-use"){
            alert("TU EMAIL YA ESTA EN USO");
        }
        else if(error.code === "auth/invalid-email"){
            alert("EMAIL INVALIDO");
        }

        else if(error.code === "auth/weak-password"){
            alert("LA CONTRASEÑA NO ES SEGURA");
        }
        else{
            alert("ES CUALQUIER OTRO TIPO DE ERROR");
        }


    }
});