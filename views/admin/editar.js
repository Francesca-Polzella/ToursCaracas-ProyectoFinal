document.getElementById('editForm').addEventListener('submit', function(event) {
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

    fetch('/api/sitios/editar', {
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
}