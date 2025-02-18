function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('fade-out');
        notification.addEventListener('transitionend', () => {
            notification.remove();
        });
    }, 3000);
}

function showError(message) {
    showNotification(message, 'error');
}

function showEditSuccess(message) {
    showNotification(message, 'success');
}

function showAddSuccess(message) {
    showNotification(message, 'success');
}

// CSS for notifications
const style = document.createElement('style');
style.textContent = `
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 10px 20px;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    z-index: 1000;
    opacity: 1;
    transition: opacity 0.5s ease-in-out;
}
.notification.error {
    background-color: #e74c3c;
}
.notification.success {
    background-color: #2ecc71;
}
.notification.fade-out {
    opacity: 0;
}
`;
document.head.appendChild(style);

// Example usage
// showError('Hubo un error al procesar la solicitud.');
// showEditSuccess('El lugar se ha editado correctamente.');
// showAddSuccess('El lugar se ha agregado correctamente.');