document.addEventListener("DOMContentLoaded", () => {
    // Seleccionar elementos del formulario
    const formRegister = document.querySelector(".section__form");
    const inputName = document.querySelector("#name");
    const inputEmail = document.querySelector("#email");
    const inputPassword = document.querySelector("#password");
    const submitButton = document.querySelector(".section__form__button");

    // Agregar clase a .section__container para modificarlo sin afectar el formulario de login
    const sectionContainer = document.querySelector(".section__container");
    sectionContainer.classList.add("section__container__form");

    // Expresiones regulares para validación
    const userNameRegex = /^[a-zA-Z0-9\_\-]{4,16}$/;
    const emailRegex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_.-])[A-Za-z\d@$!%*?&_.-]{4,12}$/;

    // Estado de validación de campos
    const estadoValidacionCampos = {
        name: false,
        email: false,
        password: false
    };

    // Validar campos en cada input
    inputName.addEventListener("input", () => 
        validarCampo(userNameRegex, inputName, "El nombre sólo puede contener [4-16] dígitos, letras y guión bajo."));
    inputEmail.addEventListener("input", () => 
        validarCampo(emailRegex, inputEmail, "El email no es válido."));
    inputPassword.addEventListener("input", () => 
        validarCampo(passwordRegex, inputPassword, "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial, y tener entre 4 y 12 caracteres."));

    // Función para validar campos
    function validarCampo(regularExpresion, campo, mensaje) {
        const esValido = regularExpresion.test(campo.value);
        if (esValido) {
            eliminarAlerta(campo);
            estadoValidacionCampos[campo.name] = true;
            campo.classList.remove("error");
        } else {
            estadoValidacionCampos[campo.name] = false;
            mostrarAlerta(campo, mensaje);
            campo.classList.add("error");
        }
    }

    // Función para mostrar alertas
    function mostrarAlerta(referencia, mensaje) {
        eliminarAlerta(referencia);
        const alertaDiv = document.createElement("div");
        alertaDiv.classList.add("alerta");
        alertaDiv.textContent = mensaje;
        //esta me la recomendo chatGPT para agregar elemento que le sigue
        referencia.parentNode.insertBefore(alertaDiv, referencia.nextSibling);
    }

    // Función para eliminar alertas
    function eliminarAlerta(referencia) {
        const alerta = referencia.nextSibling;
        if (alerta && 
            alerta.nodeType === 1 && 
            alerta.classList.contains('alerta')) {
            alerta.remove();
        }
    }

    // Validar envío de formulario
    formRegister.addEventListener("submit", e => {
        e.preventDefault();
        enviarFormulario();
    });

    // Función para enviar formulario
    function enviarFormulario() {
        if (estadoValidacionCampos.name && 
            estadoValidacionCampos.email && 
            estadoValidacionCampos.password) {
            cearCartelSubmitFormulario("alertaExito", "Te registraste correctamente");
            formRegister.reset();
        } else {
            cearCartelSubmitFormulario("alertaError", "Complete los campos correctamente");
        }
    }

    function cearCartelSubmitFormulario(clase, mensaje){
        const alertaSubmit = document.createElement("div");
        alertaSubmit.classList.add(clase);
        alertaSubmit.textContent = mensaje;
        submitButton.parentNode.insertBefore(alertaSubmit, submitButton.nextSibling);
        setTimeout(() => {
            alertaSubmit.remove();    
        }, 2000);
    }
});
