// Remove the initial check at the top of the file completely

document.addEventListener('DOMContentLoaded', () => {
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
                // First check if it's a regular user
                try {
                    const userResponse = await axios({
                        method: 'post',
                        url: '/api/users/login',
                        data: datoslogin,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    
                    if (userResponse.data.success) {
                        localStorage.setItem('userToken', userResponse.data.token);
                        localStorage.setItem('isAdmin', 'false');
                        window.location.href = '/dashboard/index.html';
                        return;
                    }
                } catch (userError) {
                    // If user login fails with 401, check if it's an admin
                    if (userError.response?.status === 401 && datoslogin.email === 'admin@gmail.com') {
                        const adminResponse = await axios({
                            method: 'post',
                            url: '/api/admin/login',
                            data: {
                                Email: datoslogin.email,
                                Password: datoslogin.password
                            },
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });

                        if (adminResponse.data && adminResponse.data.success) {
                            localStorage.clear();
                            localStorage.setItem('adminToken', adminResponse.data.token);
                            localStorage.setItem('isAdmin', 'true');
                            window.location.replace('/admin/index.html');
                            return;
                        }
                    }
                    
                    // If it's not an admin or admin login fails
                    document.getElementById('text-error').textContent = 
                        userError.response?.data?.message || 'Credenciales inválidas';
                    return;
                }

                // If both logins fail
                document.getElementById('text-error').textContent = 'Credenciales inválidas';
                
            } catch (error) {
                console.error('Error:', error);
                document.getElementById('text-error').textContent = 
                    error.response?.data?.message || 'Error de conexión';
            }
        } else {
            document.getElementById('text-error').textContent = 'Por favor, ingrese correo y contraseña';
        }
    });
});