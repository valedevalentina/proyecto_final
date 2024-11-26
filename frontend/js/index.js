document.addEventListener("DOMContentLoaded", function () {
    const sesionIniciada = localStorage.getItem('sesionIniciada');
    const userEmail = localStorage.getItem('userEmail');
    const botonUsuario = document.getElementById('boton-usuario');
    const autos = document.getElementById("autos");
    const juguetes = document.getElementById("juguetes");
    const muebles = document.getElementById("muebles");
    const cerrarSesionBtn = document.getElementById("cerrar-sesion"); // Cambiado el selector

    if (!sesionIniciada) {
        location.replace("login.html");
        return;
    }

    if (sesionIniciada && userEmail && botonUsuario) {
        botonUsuario.textContent = userEmail;
        botonUsuario.addEventListener("click", function (event) {
            event.preventDefault();
            const dropdownMenu = botonUsuario.nextElementSibling; // Menú desplegable adyacente
            if (dropdownMenu) {
                dropdownMenu.classList.toggle('show');
            }
        });
    }

    if (cerrarSesionBtn) {
        cerrarSesionBtn.addEventListener("click", function () {
            cerrarSesion();
        });
    }

    if (autos) {
        autos.addEventListener("click", function () {
            localStorage.setItem("catID", 101);
            window.location = "products.html";
        });
    }

    if (juguetes) {
        juguetes.addEventListener("click", function () {
            localStorage.setItem("catID", 102);
            window.location = "products.html";
        });
    }

    if (muebles) {
        muebles.addEventListener("click", function () {
            localStorage.setItem("catID", 103);
            window.location = "products.html";
        });
    }

    function cerrarSesion() {
        localStorage.removeItem('sesionIniciada');
        localStorage.removeItem('userEmail');
        location.replace("login.html");
    }
});
