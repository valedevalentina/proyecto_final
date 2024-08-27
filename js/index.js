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
        // Cambiar funcionalidad del botón para cerrar sesión
        botonUsuario.addEventListener("click", function() {
            localStorage.removeItem('sesionIniciada');
            localStorage.removeItem('userEmail');
            location.replace("login.html"); // Redirigir al login al cerrar sesión
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

