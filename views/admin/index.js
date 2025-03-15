document.addEventListener('DOMContentLoaded', async () => {
    const adminToken = localStorage.getItem('adminToken');

    // Section handling
    const menuLinks = document.querySelectorAll('[data-section]');
    const sections = {
        dashboard: document.getElementById('dashboard-section'),
        historic: document.getElementById('historic-section')
    };

    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionName = link.getAttribute('data-section');
            
            // Hide all sections
            Object.values(sections).forEach(section => {
                section.classList.add('hidden');
            });
            
            // Show selected section
            sections[sectionName]?.classList.remove('hidden');
        });
    });

    // Handle historical sites form
    const editForm = document.getElementById('editForm');
    if (editForm) {
        editForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = {
                nombre: document.getElementById('nombre').value,
                descripcion: document.getElementById('descripcion').value,
                info: document.getElementById('info').value,
                numero: document.getElementById('numero').value,
                coords: document.getElementById('coords').value
            };

            try {
                const response = await axios.post('/api/admin/historic-sites', formData, {
                    headers: { Authorization: `Bearer ${adminToken}` }
                });

                if (response.data.success) {
                    alert('Sitio histórico actualizado exitosamente');
                    editForm.reset();
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al actualizar el sitio histórico');
            }
        });
    }

    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.clear();
        window.location.replace('/views/login/index.html');
    });

    try {
        // Example API calls to get dashboard data
        const [users, historic, cultural, gastronomic, news] = await Promise.all([
            axios.get('/api/admin/users', {
                headers: { Authorization: `Bearer ${adminToken}` }
            }),
            axios.get('/api/admin/historic-sites', {
                headers: { Authorization: `Bearer ${adminToken}` }
            }),
            axios.get('/api/admin/cultural-sites', {
                headers: { Authorization: `Bearer ${adminToken}` }
            }),
            axios.get('/api/admin/gastronomic-sites', {
                headers: { Authorization: `Bearer ${adminToken}` }
            }),
            axios.get('/api/admin/news', {
                headers: { Authorization: `Bearer ${adminToken}` }
            })
        ]);

        // Update dashboard counters
        document.getElementById('userCount').textContent = users.data.count || 150;
        document.getElementById('historicCount').textContent = historic.data.count || 11;
        document.getElementById('culturalCount').textContent = cultural.data.count || 13;
        document.getElementById('gastronomicCount').textContent = gastronomic.data.count || 6;
        document.getElementById('newsCount').textContent = news.data.count || 5;

    } catch (error) {
        console.error('Error fetching dashboard data:', error);
    }
});