import { crearNotificacion } from "../componentes/notificacion.js";

document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.querySelector('#formulario');
    const nameInput = document.querySelector('#Nombre');
    const apellidoInput = document.querySelector('#Apellido');
    const emailInput = document.querySelector('#Correo');
    const passwordInput = document.querySelector('#Contraseña');
    const password2Input = document.querySelector('#match-input');
    const boton = document.querySelector('#boton');
    const notificacion = document.querySelector('#notificacion');

    // Validar el email
    const validaremail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    // Validar la contraseña
    const validarpasswoed = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    // Validar nombre y apellido
    const valnombres = /[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s'-]+$/g;
    const valapellidos = /[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s'-]+$/g;

    let valcorreo = false;
    let valpass = false;
    let valclave = false;
    let valnombre = false;
    let valapellido = false;

    nameInput.addEventListener('input', (e) => {
        valnombre = valnombres.test(e.target.value);
        validar(nameInput, valnombre);
    });

    apellidoInput.addEventListener('input', (e) => {
        valapellido = valapellidos.test(e.target.value);
        validar(apellidoInput, valapellido);
    });

    emailInput.addEventListener('input', (e) => {
        valcorreo = validaremail.test(e.target.value);
        validar(emailInput, valcorreo);
    });

    passwordInput.addEventListener('input', (e) => {
        valpass = validarpasswoed.test(e.target.value);
        validar(passwordInput, valpass);
        validar(password2Input, valclave);
    });

    password2Input.addEventListener('input', (e) => {
        valclave = e.target.value === passwordInput.value;
        validar(password2Input, valclave);
        validar(passwordInput, valpass);
    });

    function validar(input, val) {
        boton.disabled = valnombre && valapellido && valcorreo && valpass && valclave ? false : true;
        if (val) {
            input.classList.remove('focus:outline-black');
            input.classList.remove('focus:outline-red-700', 'outline-4');
            input.classList.add('focus:outline-green-700', 'outline-4');
        } else if (input.value === '') {
            input.classList.remove('focus:outline-green-700', 'outline-4');
            input.classList.remove('focus:outline-red-700', 'outline-4');
            input.classList.add('focus:outline-black');
        } else {
            input.classList.remove('focus:outline-black');
            input.classList.remove('focus:outline-green-700', 'outline-4');
            input.classList.add('focus:outline-red-700', 'outline-4');
        }
    }

    formulario.addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            const newUser = {
                Nombre: nameInput.value,
                Apellido: apellidoInput.value,
                Email: emailInput.value,
                Password: passwordInput.value,
                Password2: password2Input.value
            };
            if (valnombre && valapellido && valcorreo && valclave && valpass) {
                const response = await axios.post('/api/users', newUser);
                crearNotificacion(false, 'Se creó el usuario exitosamente');
                setTimeout(() => {
                    notificacion.innerHTML = ``;
                }, 3000);
            } else {
                crearNotificacion(true, 'Algunos de los campos no cumplen con los requisitos');
                setTimeout(() => {
                    notificacion.innerHTML = ``;
                }, 3000);
            }
        } catch (error) {
            crearNotificacion(true, error.response ? error.response.data : 'Error en el servidor');
            setTimeout(() => {
                notificacion.innerHTML = ``;
            }, 3000);
            console.error(error);
        }
    });
});




