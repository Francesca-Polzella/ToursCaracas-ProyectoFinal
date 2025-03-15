document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('newForm');
    const adminToken = localStorage.getItem('adminToken');

    // Verificar autenticación
    if (!adminToken) {
        window.location.replace('/views/login/index.html');
        return;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitButton = e.target.querySelector('button[type="submit"]');
        submitButton.disabled = true;

        try {
            const formData = {
                nombre: document.getElementById('nombre').value.trim(),
                descripcion: document.getElementById('descripcion').value.trim(),
                info: document.getElementById('info').value.trim(),
                numero: document.getElementById('numero').value.trim(),
                coords: document.getElementById('coords').value.trim()
            };

            // Validate form data
            if (!formData.nombre || !formData.descripcion || !formData.info || !formData.numero || !formData.coords) {
                throw new Error('Todos los campos son requeridos');
            }

            const response = await axios.post('http://localhost:4000/api/cultural', formData, {
                headers: {
                    'Authorization': `Bearer ${adminToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data) {
                alert('Sitio cultural agregado exitosamente');
                form.reset();
                window.location.href = '/views/admin/cultural/lista.html';  // Updated redirect
            }
        } catch (error) {
            console.error('Error:', error);
            alert(error.response?.data?.message || error.message || 'Error al procesar la solicitud');
        } finally {
            submitButton.disabled = false;
        }
    });
});