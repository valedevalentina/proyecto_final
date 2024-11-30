document.addEventListener("DOMContentLoaded", function() {
    const sesionIniciada = localStorage.getItem('sesionIniciada');
    const userEmail = localStorage.getItem('userEmail');
    const botonUsuario = document.getElementById('boton-usuario');

    if (!sesionIniciada) {
        location.replace("login.html");
        return;
    }

    if (sesionIniciada && userEmail) {
        botonUsuario.textContent = userEmail;

        botonUsuario.addEventListener("click", function(event) {
            event.preventDefault();
            const dropdownMenu = document.querySelector('.dropdown-menu');
            dropdownMenu.classList.toggle('show');
        });
    }

    document.getElementById('cerrar-sesion').addEventListener("click", function() {
        cerrarSesion();
    });

    document.getElementById('mi-carrito').addEventListener("click", function() {
        window.location = "cart.html";
    });

    document.getElementById('mi-perfil').addEventListener("click", function() {
        window.location = "my-profile.html";
    });

    function cerrarSesion() {
        localStorage.removeItem('sesionIniciada');
        localStorage.removeItem('userEmail');
        location.replace("login.html");
    }
});