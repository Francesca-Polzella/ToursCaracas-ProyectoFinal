let nav = document.querySelector('#nav');

const crearNavHome = () => {
    nav.innerHTML = `
    <nav class="bg-white shadow-md fixed top-0 left-0 right-0 to-blue-400 h-16 z-50"> 
        <div class="container mx-auto px-4">
            <div class="flex justify-between items-center py-4">
                <p class="text-lg font-semibold">Tours Caracas</p>
                <button id="menuBtn" class="md:hidden focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-black" stroke-width="2"> 
                        <path d="M4 6l16 0"></path> 
                        <path d="M4 12l16 0"></path> 
                        <path d="M4 18l16 0"></path> 
                    </svg>
                </button>
                <!-- Desktop menu remains the same -->
                <div class="hidden md:flex flex-row gap-4">
                    <a class="text-gray-700 hover:text-red-900 transition ease-in-out" href="/">Inicio</a>
                    <a class="text-gray-700 hover:text-red-900 transition ease-in-out" href="/rutaHistorica/">Sitios históricos</a>
                    <a class="text-gray-700 hover:text-red-900 transition ease-in-out" href="/rutaCultural/">Sitios culturales</a>
                    <a class="text-gray-700 hover:text-red-900 transition ease-in-out" href="/rutaGastronomica/">Sitios Gastronómicos</a>
                    <a class="text-gray-700 hover:text-red-900 transition ease-in-out" href="/noticias">Noticias</a>
                    <a class="text-black font-bold py-2 px-4 hover:bg-blue-700 rounded-lg transition ease-in-out" href="/login/">Login</a>
                    <a class="text-black font-bold py-2 px-4 hover:bg-blue-700 rounded-lg transition ease-in-out" href="/registro/">Registro</a>
                </div>
            </div>
        </div>
    </nav>
    <!-- Mobile Menu -->
    <div id="mobileMenu" class="fixed top-16 left-0 right-0 bg-blue-900/95 h-screen hidden z-40">
        <div class="flex flex-col items-center pt-10 space-y-6">
            <a href="/" class="text-white text-xl hover:text-blue-300">Inicio</a>
            <a href="/rutaHistorica/" class="text-white text-xl hover:text-blue-300">Sitios históricos</a>
            <a href="/rutaCultural/" class="text-white text-xl hover:text-blue-300">Sitios culturales</a>
            <a href="/rutaGastronomica/" class="text-white text-xl hover:text-blue-300">Sitios Gastronómicos</a>
            <a href="/noticias" class="text-white text-xl hover:text-blue-300">Noticias</a>
            <a href="/login/" class="text-white text-xl hover:text-blue-300">Login</a>
            <a href="/registro/" class="text-white text-xl hover:text-blue-300">Registro</a>
        </div>
    </div>`;

    // Mobile menu functionality
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            if (mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('flex');
            } else {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
            }
        });

        // Close menu when clicking a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
            });
        });
    }
}

// Función para crear la navegación de la página de registro
const crearNavRegistro = () => {
    nav.innerHTML = `
    <nav id="nav" class="bg-white shadow-md fixed top-0 left-0 right-0 to-blue-400 h-16"> 
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="itmes-end w-10 h-10 md:hidden text-black cursor-pointer p-2" stroke-width="2"> 
            <path d="M4 6l16 0"></path> 
            <path d="M4 12l16 0"></path> 
            <path d="M4 18l16 0"></path> 
        </svg> 
        <div class="container mx-auto px-4">
            <div class="flex justify-between items-center py-4">
                <div class="text-lg font-semibold">Tours Caracas</div>
                <!-- version de pc -->
                <div class="hidden md:flex flex-row gap-4">
                    <a class="text-black font-bold py-2 px-4 hover:bg-blue-700 rounded-lg transition ease-in-out" href="/login/">Login</a>
                </div>
            </div>
        </div>
        <!-- solo vista del movil -->
        <div class="bg-blue-900/60 fixed top-60 right-0 left-0 bottom-0 justify-center text-center flex-col gap-4 hidden">
            <a href="/login/" class="text-white font-bold py-2 px-4 hover:bg-blue-700 rounded-lg transition ease-in-out">Login</a>
        </div>
    </nav>`;

    // Hacer funcional el menú desplegable
    const navBoton = document.querySelector('nav svg'); // Selecciona el botón del menú
    navBoton.addEventListener('click', e => {
        console.log('boton menu');
        const menumobile = document.querySelector('nav + div'); // Selecciona el menú móvil
        if (menumobile.classList.contains('hidden')) {
            // El menú está cerrado y mostrar el desplegable
            menumobile.classList.remove('hidden');
            menumobile.classList.add('flex');
        } else {
            // El menú está abierto y ocultar el desplegable
            menumobile.classList.add('hidden');
            menumobile.classList.remove('flex');
        }
    });
}

// Función para crear la navegación de la página de login
const crearNavLogin = () => {
    nav.innerHTML = `
    <nav id="nav" class="bg-white shadow-md fixed top-0 left-0 right-0 to-blue-400 h-16"> 
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="itmes-end w-10 h-10 md:hidden text-black cursor-pointer p-2" stroke-width="2"> 
            <path d="M4 6l16 0"></path> 
            <path d="M4 12l16 0"></path> 
            <path d="M4 18l16 0"></path> 
        </svg> 
        <div class="container mx-auto px-4">
            <div class="flex justify-between items-center py-4">
                <div class="text-lg font-semibold">Tours Caracas</div>
                <!-- version de pc -->
                <div class="hidden md:flex flex-row gap-4">
                    <a class="text-black font-bold py-2 px-4 hover:bg-blue-700 rounded-lg transition ease-in-out" href="/registro/">Registro</a>
                </div>
            </div>
        </div>
        <!-- solo vista del movil -->
        <div class="bg-blue-900/60 fixed top-60 right-0 left-0 bottom-0 justify-center text-center flex-col gap-4 hidden">
            <a href="/registro/" class="text-white font-bold py-2 px-4 hover:bg-blue-700 rounded-lg transition ease-in-out">Registrar</a>
        </div>
    </nav>`;

    // Hacer funcional el menú desplegable
    const navBoton = document.querySelector('nav svg'); // Selecciona el botón del menú
    navBoton.addEventListener('click', e => {
        console.log('boton menu');
        const menumobile = document.querySelector('nav + div'); // Selecciona el menú móvil
        if (menumobile.classList.contains('hidden')) {
            // El menú está cerrado y mostrar el desplegable
            menumobile.classList.remove('hidden');
            menumobile.classList.add('flex');
        } else {
            // El menú está abierto y ocultar el desplegable
            menumobile.classList.add('hidden');
            menumobile.classList.remove('flex');
        }
    });
}

// Hacer validación
if (window.location.pathname === '/') {
    crearNavHome();
} else if (window.location.pathname === '/registro/') {
    crearNavRegistro();
} else if (window.location.pathname === '/login/') {
    crearNavLogin();
}

// Menu móvil modificado 
<div class="bg-blue-900/60 fixed top-16 right-0 left-0 bottom-0 justify-center text-center flex-col gap-4 hidden">
    <a href="/" class="text-white font-bold py-2 px-4 hover:bg-blue-700 transition ease-in-out">Inicio</a>
    <a href="/rutaHistorica/" class="text-white font-bold py-2 px-4 hover:bg-blue-700 transition ease-in-out">Sitios históricos</a>
    <a href="/rutaCultural/" class="text-white font-bold py-2 px-4 hover:bg-blue-700 transition ease-in-out">Sitios culturales</a>
    <a href="/rutaGastronomica/" class="text-white font-bold py-2 px-4 hover:bg-blue-700 transition ease-in-out">Sitios Gastronómicos</a>
    <a href="/noticias" class="text-white font-bold py-2 px-4 hover:bg-blue-700 transition ease-in-out">Noticias</a>
    <a href="/login/" class="text-white font-bold py-2 px-4 hover:bg-blue-700 transition ease-in-out">Login</a>
    <a href="/registro/" class="text-white font-bold py-2 px-4 hover:bg-blue-700 transition ease-in-out">Registro</a>
</div>

// Mejorar la funcionalidad del menú desplegable
const navBoton = document.querySelector('nav svg');
const menumobile = document.querySelector('nav + div');
navBoton.addEventListener('click', () => {
    menumobile.classList.toggle('hidden');
    menumobile.classList.toggle('flex');
});

// Cerrar el menú al hacer clic en cualquier enlace
const menuLinks = menumobile.querySelectorAll('a');
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        menumobile.classList.add('hidden');
        menumobile.classList.remove('flex');
    });
});


