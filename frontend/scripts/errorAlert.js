export default function showAlert(message, timeout = 7000) {
    const alertBox = document.createElement('div');
    alertBox.className = 'custom-alert';
    alertBox.textContent = message;

    document.body.appendChild(alertBox);

    setTimeout(() => {
        alertBox.remove();
    }, timeout);
}
