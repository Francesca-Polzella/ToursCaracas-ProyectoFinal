document.addEventListener('DOMContentLoaded', function() {
    // Configuración del mapa
    var map = L.map('map').setView([10.488, -66.8792], 12);

    // Capa del mapa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 10,
        maxZoom: 20,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Coordenadas de los sitios históricos y marcadores
    var sitios = [
        { coords: [10.5129, -66.9126], nombre: 'El Panteon Nacional', descripcion: 'El Panteón Nacional de Venezuela, ubicado en Caracas, se inauguró el 28 de octubre de 1875, bajo el decreto del presidente Antonio Guzmán Blanco. Originalmente una iglesia del siglo XVIII, fue transformada para honrar a los héroes nacionales, incluido Simón Bolívar, cuyos restos fueron trasladados allí en 1876. Este monumento es un símbolo de la historia y el patriotismo venezolano.', info:'Miercoles-Jueves-Vernes-Domingo de 9am - 2pm', numero:'0212-5061145' },
        { coords: [10.51312, -66.91220], nombre: 'Fundacion John Boulton', descripcion: 'La Fundación John Boulton es una institución sin fines de lucro creada en 1950 por las empresas H.L. Boulton y Co y el historiador Alfredo Boulton. Su propósito es preservar importantes documentos originales y objetos de valor histórico. La fundación se encuentra en Caracas y se dedica a la conservación y difusión del patrimonio histórico y cultural de Venezuela. El museo de la Fundación John Boulton alberga diversas colecciones, incluyendo la Sala Bolivariana, que contiene objetos y documentos asociados a la vida de Simón Bolívar, y la Sala Numismática, con piezas de gran importancia. Además, cuenta con una colección antropológica y un archivo fotográfico que documenta escenas familiares y sociales de la época.', info:' Jueves-Viernes-Sabado de 9am - 2pm', numero:'0212-8614685'},
        { coords: [10.50816, -66.91394], nombre: 'Casa de las primeras letras', descripcion: 'La Casa de las Primeras Letras Simón Rodríguez en Caracas es un edificio histórico del siglo XVIII, conocido por ser la escuela donde Simón Rodríguez enseñó a Simón Bolívar en 1793. A lo largo de los años, ha tenido diversos usos y fue restaurada en 2011. En 2013, se reabrió con nuevas instalaciones, incluyendo una sala de exposición, anfiteatro, jardín de lectura y más.', info:' Martes-Miercoles-jueves-Viernes-Sabado de  9am - 4:30pm', numero:'0212-3775052' },
        { coords: [10.50636, -66.91540], nombre: 'Casa Amarilla', descripcion: 'La Casa Amarilla "Antonio José de Sucre" es un edificio histórico en Caracas, Venezuela, ubicado frente a la Plaza Bolívar. Construida en el siglo XVII, ha servido como hospital, residencia de obispos y cárcel real. En 1874, fue remodelada y pintada de amarillo por orden de Antonio Guzmán Blanco. Actualmente, es la sede del Ministerio de Relaciones Exteriores', info:'Lunes-Martes-Miercoles-Jueves-Viernes-Sabado disponible a las 24 horas', numero:'0212-8064311' },
        { coords: [10.50576, -66.91391], nombre: 'Museo Sacro', descripcion: 'El Museo Sacro de Caracas, ubicado en el centro de la ciudad, frente a la Plaza Bolívar, es un espacio cultural dedicado a la preservación y exhibición de arte religioso. Inaugurado en 1993, el museo se encuentra en un edificio histórico que data de 1673 y que fue declarado Monumento Histórico Nacional en 1981. El museo alberga una colección de objetos religiosos, incluyendo esculturas, vestimentas y mobiliario, y también cuenta con un osario y criptas históricas', info:'Martes-Miercoles-Jueves-Viernes-Sabado-Domingo de 10am - 4pm', numero:'0212-8616562'},
        { coords: [10.50511, -66.91611], nombre: 'Palacio Legislativo', descripcion: 'El Palacio Federal Legislativo, también conocido como el Palacio Legislativo, es la sede de la Asamblea Nacional de Venezuela. Ubicado en el centro histórico de Caracas, su construcción comenzó en 1872 durante la presidencia de Antonio Guzmán Blanco y se completó en 1877. El edificio, de estilo neoclásico, es famoso por su cúpula dorada y su Salón Elíptico, que alberga una colección de pinturas y documentos históricos importantes. El Palacio Legislativo ha sido un símbolo del poder legislativo en Venezuela y escenario de numerosos eventos históricos', info:'Lunes-Martes-Miercoles-Jueves-Viernes-Sabado de 8am - 5pm', numero:'0414-6411667' },
        { coords: [10.50521, -66.91486], nombre: 'Consejo Municipal', descripcion: 'El Consejo Municipal de Caracas, conocido formalmente como el Concejo Municipal del Municipio Libertador, tiene su sede en el Palacio Municipal de Caracas, situado en la Plaza Bolívar. La edificación del Palacio Municipal comenzó en 1873 y se concluyó en 1877 durante la presidencia de Antonio Guzmán Blanco. Este lugar ha desempeñado un papel crucial en la vida política y administrativa de la ciudad, siendo testigo de importantes decisiones y debates que han moldeado la historia de Caracas.', info:'Martes-Miercoles-Jueves-Viernes-Sabado-Domingo de 9am - 4pm', numero:'0212 5755068' },
        { coords: [10.50468, -66.91353], nombre: 'Casa Natal de Simon Bolivar', descripcion: 'La Casa Natal de Simón Bolívar, ubicada en Caracas, es el lugar donde nació el Libertador el 24 de julio de 1783. Este edificio histórico, que data del siglo XVII, fue declarado Monumento Nacional en 2002. Actualmente, funciona como museo y conserva objetos personales y prendas de Bolívar, así como piezas originales de la casa', info:'Martes-Miercoles-Jueves-Viernes-Sabado-Domingo de 8am-12pm, 1:30 - 5:30pm', numero:'Sin conctacto' },
        { coords: [10.50474, -66.91318], nombre: 'Museo Bolivariano', descripcion: 'El Museo Bolivariano, ubicado en la Plaza El Venezolano en Caracas, fue inaugurado en 1911. Este museo exhibe piezas representativas de la historia de Venezuela, incluyendo pertenencias de Simón Bolívar, réplicas de armas utilizadas durante la independencia y objetos de la época colonial. Además, cuenta con una biblioteca que alberga recursos sobre la vida de Bolívar y la historia de Venezuela', info:'Martes-Miercoles-Jueves-Viernes-Sabado-Domingo de 9am - 5pm', numero:'0212-5729789' },
        { coords: [10.504722, -66.922222], nombre: 'El Calvario', descripcion: 'El Calvario, también conocido como Parque Ezequiel Zamora, es un parque histórico ubicado en el centro de Caracas. Fue inaugurado en 1883 durante la presidencia de Antonio Guzmán Blanco. El parque cuenta con jardines, monumentos y plazas, y ha sido un lugar de recreación y esparcimiento para los caraqueños desde su creación. Entre sus características destacadas se encuentran el Arco de la Federación, la Capilla de Nuestra Señora de Lourdes y diversas estatuas y bustos de figuras históricas', info:'disponible 24 horas', numero:'0414-3111105' },
        { coords: [10.50401, -66.91612], nombre: 'Palacio de las Academias', descripcion: 'El Palacio de las Academias, ubicado en la Avenida Universidad en Caracas, es un edificio histórico de estilo neogótico. Originalmente, en el siglo XVII, fue un convento franciscano. En 1876, bajo la presidencia de Antonio Guzmán Blanco, se transformó en la sede de la Universidad de Caracas. Después de que la universidad se trasladara a un nuevo campus en 1952, el edificio pasó a albergar las Academias Nacionales. En 1965, fue declarado Monumento Nacional', info:'ha consultar', numero:'sin contacto' }
    ];

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

    // Vincular la función de búsqueda al botón de búsqueda
    document.getElementById('searchButton').addEventListener('click', searchPlace);
});





