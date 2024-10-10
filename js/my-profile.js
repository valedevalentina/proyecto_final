const sesionIniciada = localStorage.getItem('sesionIniciada');
    const userEmail = localStorage.getItem('userEmail')
    const botonUsuario = document.getElementById('boton-usuario');

if (sesionIniciada && userEmail) {
    // Cambiar texto del botón al email del usuario
    botonUsuario.textContent = userEmail;

    // Evitar que el botón de usuario cierre sesión directamente
    botonUsuario.addEventListener("click", function(event) {
        event.preventDefault(); // Evitar la acción por defecto
        const dropdownMenu = document.querySelector('.dropdown-menu'); // Seleccionar el menú desplegable
        dropdownMenu.classList.toggle('show'); // Alternar la visibilidad del menú
    });
} 