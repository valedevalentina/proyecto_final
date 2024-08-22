document.addEventListener("DOMContentLoaded", function(){
    // Verificar si la sesión está iniciada
    const sesionIniciada = sessionStorage.getItem('sesionIniciada');
    const botonUsuario = document.getElementById('boton-usuario');

    if (!sesionIniciada) {
        // Si no hay sesión iniciada, redirigir al login
        location.replace("login.html");
        return; // Evitar que se ejecute el resto del código
    }
    
    if (sesionIniciada) {
        // Cambiar texto del botón a "Cerrar Sesión"
        botonUsuario.textContent = "Cerrar Sesión";
        // Cambiar funcionalidad del botón
        botonUsuario.addEventListener("click", function() {
            sessionStorage.removeItem('sesionIniciada');
            location.replace("login.html"); // Redirigir al login al cerrar sesión
        });
    } else {
        // Funcionalidad del botón de Login
        botonUsuario.addEventListener("click", function() {
            location.replace("login.html"); // Redirigir al login si no está iniciado
        });
    }
    
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
});

