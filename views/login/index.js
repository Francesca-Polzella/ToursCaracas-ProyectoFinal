const { response } = require("../../app");
const User = require("../../modelo/user");

const formulario = document.querySelector('#formulario');
const emailInput = document.querySelector('#Correo-login');
const passwordInput = document.querySelector('#Contraseña-login');
const boton = document.querySelector('#boton');

// Validar el email
const validaremail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
// Validar la contraseña
const validarpasswoed = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

let valcorreo = false;
let valpass = false;

const datoslogin = {
    email: '',
    password: ''
};

// Validar el email
emailInput.addEventListener('input', (e) => {
    datoslogin.email = e.target.value;
    valcorreo = validaremail.test(datoslogin.email);
    validar(emailInput, valcorreo);
});

// Validar la contraseña
passwordInput.addEventListener('input', (e) => {
    datoslogin.password = e.target.value;
    valpass = validarpasswoed.test(datoslogin.password);
    validar(passwordInput, valpass);
});

function validar(input, val) {
    boton.disabled = valcorreo && valpass ? false : true;

    if (val) {
        // Caso de que pase
        input.classList.remove('focus:outline-black');
        input.classList.remove('focus:outline-red-700', 'outline-4');
        input.classList.add('focus:outline-green-700', 'outline-4');
    } else if (input.value === '') {
        // Caso de que esté vacío
        input.classList.remove('focus:outline-green-700', 'outline-4');
        input.classList.remove('focus:outline-red-700', 'outline-4');
        input.classList.add('focus:outline-black');
    } else {
        // Caso de que no pase
        input.classList.remove('focus:outline-black');
        input.classList.remove('focus:outline-green-700', 'outline-4');
        input.classList.add('focus:outline-red-700', 'outline-4');
    }
}

// Arreglar el botón de registro y las líneas de la casilla de correo
formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (datoslogin.email && datoslogin.password) {
        try {
            const response = await axios.post('/api/users/login', {
                email: datoslogin.email,
                password: datoslogin.password
            });

            if (response.data.success) {
                // Guardar el token en localStorage
                localStorage.setItem('token', response.data.token);
                
                // Verificar el rol del usuario y redirigir
                if (response.data.user.rol === 'admin') {
                    window.location.href = '/admin/index.html';
                } else {
                    window.location.href = '/dashboard/';
                }
            } else {
                document.getElementById('text-error').textContent = 'Credenciales inválidas';
            }
        } catch (error) {
            console.error('Error de inicio de sesión:', error);
            document.getElementById('text-error').textContent = 'Error al iniciar sesión. Por favor, intente nuevamente.';
        }
    } else {
        document.getElementById('text-error').textContent = 'Por favor, ingrese correo y contraseña';
    }
});

// Eliminar o comentar el otro event listener duplicado