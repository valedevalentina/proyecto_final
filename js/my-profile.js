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
    const nombre = document.getElementById('nombre');
const segundoNombre = document.getElementById('segundoNombre');
const apellido = document.getElementById('apellido');
const segundoApellido = document.getElementById('segundoApellido');
const email = document.getElementById('email');
const telefono = document.getElementById('telefono');
const fotoPerfil = document.getElementById('fotoPerfil');
const previewImagen = document.getElementById('previewImagen');
const saveButton = document.querySelector('.save-button');

// Cargar datos del Local Storage al cargar la página
window.onload = () => {
    const datosUsuario = JSON.parse(localStorage.getItem('datosUsuario')) || {};

    nombre.value = datosUsuario.nombre || '';
    segundoNombre.value = datosUsuario.segundoNombre || '';
    apellido.value = datosUsuario.apellido || '';
    segundoApellido.value = datosUsuario.segundoApellido || '';
    email.value = datosUsuario.email || '';
    telefono.value = datosUsuario.telefono || '';

    if (datosUsuario.fotoPerfil) {
        previewImagen.src = datosUsuario.fotoPerfil;
    }
};

// Función para validar campos obligatorios
function validarCampos() {
    if (nombre.value.trim() === '' || apellido.value.trim() === '' || email.value.trim() === '') {
        alert('Revise campos sin contestar');
        return false;
    }
    return true;
}

// Evento para guardar datos en el Local Storage si la validación es exitosa
saveButton.addEventListener('click', (event) => {
    event.preventDefault(); // Evitar que el formulario realice un envío involuntario

    console.log("Botón Guardar presionado."); // Mensaje de depuración

    if (validarCampos()) { // Validar antes de continuar
        console.log("Validación exitosa, guardando datos."); // Mensaje de depuración

        const reader = new FileReader();
        reader.onload = function (e) {
            const datosUsuario = {
                nombre: nombre.value,
                segundoNombre: segundoNombre.value,
                apellido: apellido.value,
                segundoApellido: segundoApellido.value,
                email: email.value,
                telefono: telefono.value,
                fotoPerfil: e.target.result
            };

            localStorage.setItem('datosUsuario', JSON.stringify(datosUsuario));
            alert('Datos guardados correctamente');
        };

        if (fotoPerfil.files[0]) {
            reader.readAsDataURL(fotoPerfil.files[0]);
        } else {
            const datosUsuario = {
                nombre: nombre.value,
                segundoNombre: segundoNombre.value,
                apellido: apellido.value,
                segundoApellido: segundoApellido.value,
                email: email.value,
                telefono: telefono.value,
                fotoPerfil: previewImagen.src
            };

            localStorage.setItem('datosUsuario', JSON.stringify(datosUsuario));
            alert('Datos guardados correctamente');
        }
    } else {
        console.log("Validación fallida. Datos no guardados."); // Mensaje de depuración
    }
});


// Vista previa de la imagen seleccionada
fotoPerfil.addEventListener('change', () => {
    const file = fotoPerfil.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            previewImagen.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

botonCerrarSesion.addEventListener('click', () => {
    localStorage.removeItem('datosUsuario'); // Eliminar solo datos del perfil
    localStorage.removeItem('sesionIniciada'); // Si es necesario, también eliminar la sesión
    // Redirigir a la página de inicio de sesión o refrescar la página
    window.location.href = 'login.html'; // Redirige a la página de inicio de sesión
}); 