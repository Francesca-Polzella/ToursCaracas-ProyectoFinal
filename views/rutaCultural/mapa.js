document.addEventListener('DOMContentLoaded', function() {
// Configuración del mapa
var map = L.map('map').setView([10.488, -66.8792], 12);

// Capa del mapa
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 10,
    maxZoom: 20,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Coordenadas de los sitios históricos y marcadores
var sitios = [
    { coords: [10.50207, -66.91747 ], 
    nombre: 'Teatro Municipal', 
    descripcion: 'Descubre la magia del Teatro Municipal de Caracas, un icónico edificio del siglo XIX que combina elegancia y rica historia. Con una acústica excepcional y una programación variada, este teatro es el destino ideal para los amantes del arte y la cultura. ¡Vive una experiencia inolvidable en el corazón de Caracas!',
    info:'',
    numero:'' },

    { coords: [10.50122, -66.91493] , 
    nombre: 'Cine Cipreses', 
    descripcion: 'El Cine Cipreses, ubicado en la parroquia Santa Teresa de Caracas, fue inaugurado el 16 de septiembre de 2014 tras una completa rehabilitación. Este moderno espacio cultural cuenta con equipos de audio y video de última tecnología y 306 butacas, ofreciendo una variada programación fílmica para todas las edades',
    info:'',
    numero:''},

    { coords: [10.50102, -66.90255], 
    nombre: 'Galeria de Arte Nacional ', 
    descripcion: 'La Galería de Arte Nacional (GAN), ubicada en Caracas, es un museo dedicado a la exhibición y preservación de obras de arte venezolano. Inaugurada el 6 de abril de 1976, la GAN alberga una colección de aproximadamente 9,000 obras que incluyen pintura, escultura, fotografía y más. El edificio actual, diseñado por el arquitecto Carlos Gómez de Llarena, se inauguró en 2009 y forma parte del circuito cultural de la ciudad',
    info:'',
    numero:'' },

    { coords: [10.50050, -66.90785], 
    nombre: 'Museo de Estampa y Diseño de Carlos Cruz Diez', 
    descripcion: 'El Museo de la Estampa y del Diseño Carlos Cruz-Diez, ubicado en el Paseo Vargas de la avenida Bolívar en Caracas, fue inaugurado en 1997 en honor al renombrado artista venezolano Carlos Cruz-Diez2. Este museo alberga una colección de aproximadamente 2,500 piezas dedicadas al arte de la estampa y el diseño. Además de exhibir obras de Cruz-Diez y otros artistas modernistas, el museo ofrece exposiciones temporales y actividades educativas',
    info:'',
    numero:'' },

    { coords: [10.49914, -66.90267], 
    nombre: 'Museo de los Niños', 
    descripcion: 'El Museo de los Niños de Caracas, inaugurado el 5 de agosto de 1982, es un centro educativo-recreativo que busca despertar la imaginación de los niños a través de exhibiciones interactivas y actividades prácticas. Ubicado en el Parque Central, el museo ofrece áreas dedicadas a la ciencia, tecnología, arte y valores fundamentales, fomentando el aprendizaje en un ambiente divertido y estimulante',
    info:'',
    numero:''},
    { coords: [10.49853, -66.89964] , 
    nombre: 'Museo de Arte Contemporaneo', 
    descripcion: 'El Museo de Arte Contemporáneo de Caracas, inaugurado en 1974, es uno de los principales museos de arte moderno en Venezuela. Ubicado en el Complejo Urbanístico Parque Central, alberga una colección de más de 5,000 obras de artistas como Picasso, Monet, Kandinski y Warhol2. Fundado por Sofía Ímber, el museo es un referente cultural en América Latina',
    info:'',
    numero:'' },

    { coords: [10.49861, -66.89806], 
    nombre: 'Fundacion Red de Arte', 
    descripcion: 'La Fundación Red de Arte, ubicada en Caracas, es una institución dedicada a la promoción y difusión de la artesanía venezolana. Fundada con el objetivo de visibilizar y apoyar a los artesanos del país, la fundación organiza ferias, exposiciones y programas de formación para fomentar la producción artesanal con identidad cultural.',
    info:'',
    numero:'' },

    { coords: [10.49977, -66.89790], 
    nombre: 'Sala Rajatabla', 
    descripcion: 'La Sala Rajatabla, ubicada en la Avenida México, Plaza Morelos, al lado del Teatro Teresa Carreño en Caracas, es un emblemático espacio de arte dramático. Desde su inauguración en 1972 con la obra "Caería de Ratas", ha sido un importante centro de representación escénica en la ciudad2. Con un aforo de aproximadamente 120 butacas, la sala ofrece una programación variada que incluye teatro, talleres y audiciones',
    info:'',
    numero:'' },

    { coords: [10.49994, -66.89742], 
    nombre: 'Museo de Ciencias Naturales', 
    descripcion: 'El Museo de Ciencias Naturales de Caracas, ubicado en la Plaza de los Museos en el Parque Los Caobos, es el museo nacional de historia natural de Venezuela. Inaugurado el 24 de octubre de 1875, alberga una vasta colección de más de 150,000 piezas, incluyendo animales taxidermizados, fósiles, piezas etnográficas y minerales1. El museo ofrece exposiciones temáticas, visitas guiadas y actividades educativas para todas las edades',
    info:'',
    numero:'' },

    { coords: [10.50039,  -66.89619],
     nombre: 'Museo de Bellas Artes', 
    descripcion: 'El Museo de Bellas Artes de Caracas, fundado en 1917, es uno de los pilares culturales más importantes de Venezuela. Ubicado en la Plaza de los Museos, entre el Parque Los Caobos y el sector Bellas Artes, el museo alberga una vasta colección de arte que abarca desde la época prehispánica hasta el arte contemporáneo. Diseñado por el renombrado arquitecto Carlos Raúl Villanueva, el edificio destaca por su elegancia y su armoniosa integración con el entorno urbano',
    info:'',
    numero:'' },
    
    { coords: [10.50099, -66.89660], 
        nombre: 'Cineteca Nacional', 
    descripcion: 'La Cineteca Nacional de Caracas es un espacio cultural dedicado a la preservación y difusión del cine venezolano e internacional. Ubicada en el Museo de Bellas Artes, ofrece una variada programación de películas, desde clásicos hasta producciones contemporáneas. Además, organiza festivales, ciclos de cine y actividades educativas para promover el arte cinematográfico en Venezuela.',
    info:'',
    numero:'' },

    { coords: [10.49900, -66.89779], 
        nombre: 'Teatro Teresa Carreño', 
    descripcion: 'El Teatro Teresa Carreño, ubicado en Caracas, es uno de los recintos culturales más importantes de América Latina y el segundo más grande de América del Sur. Inaugurado en 1983, el teatro lleva el nombre de la insigne pianista venezolana Teresa Carreño1. Con dos salas principales, la Ríos Reyna y la José Félix Ribas, el teatro ofrece una amplia gama de espectáculos, incluyendo óperas, ballet clásico, conciertos sinfónicos y populares, danza y teatro. Además, ha acogido a figuras internacionales como Luciano Pavarotti y Plácido Domingo',
    info:'',
    numero:'' },

    { coords: [10.50129, -66.89417], 
        nombre: 'Centro Nacional de Acción Social por la Música', 
    descripcion: 'El Centro Nacional de Acción Social por la Música, ubicado en el Bulevar Amador Bendayán en Caracas, es la sede principal de El Sistema. Inaugurado el 12 de febrero de 2011, este centro es un espacio dedicado a la educación musical y la integración social a través de la música. Cuenta con salas de ensayo, conciertos y áreas de instrucción musical, destacándose la Sala Simón Bolívar y la Sala Fedora Alemán',
    info:'',
    numero:'' },
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

// ...existing code...

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

// ...existing code...
})




