document.getElementById('editForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const id = document.getElementById('id').value; // Asegúrate de tener un campo oculto para el ID del sitio
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const info = document.getElementById('info').value;
    const numero = document.getElementById('numero').value;
    const coords = document.getElementById('coords').value;

    const sitio = {
        id,
        nombre,
        descripcion,
        info,
        numero,
        coords
    };

    fetch(`/api/sitios/editar/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sitio)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showEditSuccess('El sitio se ha editado correctamente.');
            // Actualizar la vista del usuario
            updateUserView(sitio);
        } else {
            showError('Hubo un error al editar el sitio.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showError('Hubo un error al procesar la solicitud.');
    });
});

function updateUserView(sitio) {
    // Aquí puedes actualizar la vista del usuario con los nuevos datos del sitio
    // Por ejemplo, si tienes una lista de sitios, puedes actualizar el sitio correspondiente
    const sitioElement = document.getElementById(`sitio-${sitio.id}`);
    if (sitioElement) {
        sitioElement.querySelector('.nombre').textContent = sitio.nombre;
        sitioElement.querySelector('.descripcion').textContent = sitio.descripcion;
        sitioElement.querySelector('.info').textContent = sitio.info;
        sitioElement.querySelector('.numero').textContent = sitio.numero;
        sitioElement.querySelector('.coords').textContent = sitio.coords;
    }

    // Actualizar el marcador en el mapa
    if (window.map && window.markers) {
        const marker = window.markers[sitio.id];
        if (marker) {
            marker.setLatLng(sitio.coords.split(',').map(Number));
            marker.bindPopup(`<b>${sitio.nombre}</b><br>${sitio.descripcion}`);
        }
    }
}

function showEditSuccess(message) {
    // Muestra un mensaje de éxito
    const successMessage = document.getElementById('successMessage');
    successMessage.textContent = message;
    successMessage.style.display = 'block';
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
}

function showError(message) {
    // Muestra un mensaje de error
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 3000);
}