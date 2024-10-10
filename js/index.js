document.addEventListener("DOMContentLoaded", function(){
    // Verificar si la sesión está iniciada
    const sesionIniciada = localStorage.getItem('sesionIniciada');
    const userEmail = localStorage.getItem('userEmail')
    const botonUsuario = document.getElementById('boton-usuario');
  

    if (!sesionIniciada) {
        // Si no hay sesión iniciada, redirigir al login
        location.replace("login.html");
        return; // Evitar que se ejecute el resto del código
    }
    
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

    // Asignar el evento de cerrar sesión solo a la opción del menú
    document.querySelector('.dropdown-item[data-action="cerrar-sesion"]').addEventListener("click", function() {
        cerrarSesion();
    });
    
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
    function cerrarSesion() {
        localStorage.removeItem('sesionIniciada');
        localStorage.removeItem('userEmail');
        location.replace("login.html");
    }
    
});

