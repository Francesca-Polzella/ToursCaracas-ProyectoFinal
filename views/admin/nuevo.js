document.addEventListener('DOMContentLoaded', function() {
    const map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    document.getElementById('addForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const descripcion = document.getElementById('descripcion').value;
        const info = document.getElementById('info').value;
        const numero = document.getElementById('numero').value;
        const coords = document.getElementById('coords').value;

        const sitio = {
            nombre,
            descripcion,
            info,
            numero,
            coords
        };

        fetch('/api/sitios/nuevo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sitio)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                showAddSuccess('El sitio se ha agregado correctamente.');
                // Actualizar la vista del usuario
                addUserView(sitio);
                // Agregar el sitio al mapa
                addMarkerToMap(sitio);
            } else {
                showError('Hubo un error al agregar el sitio.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showError('Hubo un error al procesar la solicitud.');
        });
    });

    function addUserView(sitio) {
        // Aquí puedes actualizar la vista del usuario con los nuevos datos del sitio
        // Por ejemplo, si tienes una lista de sitios, puedes agregar el nuevo sitio a la lista
        const sitioList = document.getElementById('sitioList');
        const sitioElement = document.createElement('div');
        sitioElement.className = 'bg-white p-6 rounded-lg shadow-lg';
        sitioElement.innerHTML = `
            <h3 class="text-xl font-bold">${sitio.nombre}</h3>
            <p class="text-gray-700 mt-2">${sitio.descripcion}</p>
            <p class="text-gray-700 mt-2">${sitio.info}</p>
            <p class="text-gray-700 mt-2">${sitio.numero}</p>
            <p class="text-gray-700 mt-2">${sitio.coords}</p>
        `;
        sitioList.appendChild(sitioElement);
    }

    function addMarkerToMap(sitio) {
        // Suponiendo que estás usando Leaflet
        const coords = sitio.coords.split(',').map(Number);
        L.marker(coords).addTo(map)
            .bindPopup(`<b>${sitio.nombre}</b><br>${sitio.descripcion}`);
    }
});