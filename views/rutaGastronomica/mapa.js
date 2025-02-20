document.addEventListener('DOMContentLoaded', function() {
    // Configuración del mapa
    var map = L.map('map').setView([10.488, -66.8792], 12);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom:10,
        maxZoom: 20,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    //imagen del mapa 
    
   // Coordenadas de los sitios históricos y marcadores
var sitios = [
    { coords: [10.49369,-66.85174], 
    nombre: 'Restaurante El Tizón', 
    descripcion: 'Descubre El Tizón, un restaurante en el corazón de Caracas que fusiona lo mejor de la cocina mexicana y peruana. Ubicado en el Centro Comercial Bello Campo, El Tizón ofrece una experiencia culinaria única con platos exquisitos y un ambiente acogedor. ¡Ven y disfruta de una explosión de sabores en cada bocado',
    info:' Lunes a jueves de 12-9pm , Viernes a Sabado 12-10pm y Domingo 12-8pm',
    numero:'0212-2676715' },

    { coords: [10.50440, -66.91320], 
    nombre: 'Paramo Cafe', 
    descripcion: 'Descubre Páramo Café, un acogedor rincón en el corazón de Caracas, ubicado en la Avenida Universidad. Este encantador café ofrece una experiencia única con su ambiente cálido y su deliciosa selección de cafés y postres. Perfecto para disfrutar de un momento especial en compañía de amigos o familiares. ¡Ven y vive la magia de Páramo Café en el casco histórico de la ciudad',
    info:'Todos los dias de 7am-10pm',
    numero:'0412-0134656'},

    { coords: [10.50191, -66.92059], 
    nombre: 'Restaurante La Gorda y la Flaca', 
    descripcion: 'Descubre el Restaurante La Gorda y La Flaca, ubicado en la Avenida San Martín, Caracas. Este encantador lugar ofrece deliciosa comida venezolana a precios accesibles. Con un ambiente acogedor y platos tradicionales como la sopa seca, es el destino perfecto para disfrutar de una experiencia gastronómica única en el corazón de la ciudad',
    info:'ha consultar' ,
    numero:'0412-0134656' },

    { coords: [10.49867, -66.85832], 
    nombre: 'Pastelería Danubio', 
    descripcion: 'Descubre la Pastelería Danubio, un ícono de la repostería en Caracas desde 1970. Fundada por la familia Kerese, esta pastelería ofrece una deliciosa variedad de dulces y postres que combinan tradiciones europeas y venezolanas. Con varias sucursales en la ciudad, Danubio es el lugar perfecto para disfrutar de cachitos de jamón, tartaletas crujientes y un humeante café con leche. ¡Ven y deleita tu paladar con la calidad y tradición de Danubio!',
    info:' Todos los dias desde las 7am a 8:30pm',
    numero:'0212-2665302' },

    { coords: [10.48681, -66.93819], 
    nombre: 'Algo Andino', 
    descripcion: 'Descubre Algo Andino, un encantador restaurante en El Paraíso, Caracas, que te transporta a la región andina con su auténtica comida y ambiente acogedor. Disfruta de platos tradicionales como pastelitos andinos, pisca andina y chicha andina, todo en un entorno pintoresco y colorido. ¡Ven y vive una experiencia culinaria única en Algo Andino!',
    info:'ha consultar',
    numero:'ha consultar'},

    { coords: [10.50212, -66.89831], 
    nombre: 'Restaurant Alaska', 
    descripcion: 'Descubre el Restaurante Alaska, ubicado en La Candelaria, Caracas. Este icónico lugar ha evolucionado de ser una arepera a un restaurante que ofrece una variedad de platos internacionales, incluyendo pizzas y mariscos. Con un ambiente acogedor y un servicio excepcional, Alaska es el lugar perfecto para disfrutar de una comida deliciosa a cualquier hora del día, ya que está abierto las 24 horas',
    info:' abierto 24 horas ',
    numero:'ha consultar' },
    ]

    // Función para agregar un marcador con una ventana emergente
    function addMarkerWithPopup(coords, sitio) {
        var marker = L.marker(coords).addTo(map);
        marker.bindPopup(sitio.nombre);

        marker.on('click', function() {
            marker.openPopup();
            openSidebar(sitio);
        });
    }

    // Agregar marcadores con ventanas emergentes
    sitios.forEach(sitio => {
        addMarkerWithPopup(sitio.coords, sitio);
    });

    // Recolectar las coordenadas de los sitios
    var coords = sitios.map(sitio => sitio.coords);

    // Crear una polilínea con las coordenadas recolectadas
    var ruta = L.polyline(coords, {
        color: 'red'
    }).addTo(map);

    // Función para abrir el menú lateral
    function openSidebar(sitio) {
        var sidebar = document.getElementById('sidebar');
        var sidebarList = document.getElementById('sidebar-list');
        sidebarList.innerHTML = ''; // Limpiar el contenido anterior

        var li = document.createElement('li');
        li.innerHTML = `
            <h2 class="sidebar-title">${sitio.nombre}</h2>
            <p class="description">${sitio.descripcion}</p>
            <p class="info"><strong>Horario:</strong> ${sitio.info}</p>
            <p class="numero"><strong>Contacto:</strong> ${sitio.numero}</p>
        `;
        sidebarList.appendChild(li);

        sidebar.classList.add('active');
    }

    // Función para cerrar el menú lateral
    function closeSidebar() {
        var sidebar = document.getElementById('sidebar');
        sidebar.classList.remove('active');
    }

    // Cerrar el menú lateral al hacer clic fuera de él
    document.addEventListener('click', function(event) {
        var sidebar = document.getElementById('sidebar');
        if (!sidebar.contains(event.target) && !event.target.closest('.leaflet-marker-icon')) {
            closeSidebar();
        }
    });

    // Función para buscar un lugar y hacer zoom a su coordenada
    function searchPlace() {
        var searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
        var found = false;

        sitios.forEach(sitio => {
            if (sitio.nombre.toLowerCase().includes(searchInput)) {
                map.setView(sitio.coords, 16); // Ajusta el nivel de zoom según sea necesario
                openSidebar(sitio);
                found = true;
            }
        });

        if (!found) {
            alert('Lugar no encontrado');
        }
    }
});





