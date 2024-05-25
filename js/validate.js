// document.addEventListener('click', () => {
//     alert('Se hizo clic en la página');
// });

const email = "test@gmail.com"
const password = "test123"

document.addEventListener('DOMContentLoaded', ()=>{

    // Obtengo Form Register
    const section = document.querySelector('.section__container');
    const form = document.querySelector('.section__form');
    const form_inputs = document.querySelectorAll('.section__input');
    const error_message = document.querySelector('.section__error')
    console.log(form_inputs);


    form.addEventListener('submit', (event)=>{
        event.preventDefault();
        const email_form = form.email.value.trim();
        const password_form = form.password.value.trim();

        console.log(email_form);
        console.log(password_form);

        if(email_form == '' || password_form == ''){
            error_message.textContent = 'No pueden haber campos vacíos';
    
        }else if (password_form.length < 5){
            error_message.textContent = 'Contraseña no puede tener menos de 5 carácteres';
        }

        if(email_form === email && password_form === password){
            alert("Sesion iniciada");
        }

    })

})