document.addEventListener("DOMContentLoaded", function() {
    const botonGuardar = document.querySelector(".save-button");
    const botonUsuario = document.getElementById('boton-usuario');
    const userEmail = localStorage.getItem('userEmail');
    const emailField = document.getElementById("email");
    const fotoPerfilInput = document.getElementById("fotoPerfil");
    const profilePictureButton = document.querySelector("label[for='fotoPerfil']");
    const previewImagen = document.getElementById("previewImagen");
    const botonCerrarSesion = document.getElementById("cerrar-sesion"); // Agrega esta línea

    // Actualizar el nombre de usuario en el botón del perfil
    if (userEmail) {
        botonUsuario.textContent = userEmail;
        emailField.value = userEmail;
    }

    // Cargar datos guardados en localStorage al abrir el perfil
    const nombre = localStorage.getItem("nombre");
    const segundoNombre = localStorage.getItem("segundoNombre");
    const apellido = localStorage.getItem("apellido");
    const segundoApellido = localStorage.getItem("segundoApellido");
    const telefono = localStorage.getItem("telefono");
    const fotoPerfilGuardada = localStorage.getItem("fotoPerfil");

    // Asignar valores a los campos
    if (nombre) document.getElementById("nombre").value = nombre;
    if (segundoNombre) document.getElementById("segundoNombre").value = segundoNombre;
    if (apellido) document.getElementById("apellido").value = apellido;
    if (segundoApellido) document.getElementById("segundoApellido").value = segundoApellido;
    if (telefono) document.getElementById("telefono").value = telefono;
    if (fotoPerfilGuardada) {
        previewImagen.src = fotoPerfilGuardada; // Actualizar la vista previa
        
    }

    // Función para guardar los datos del perfil
    botonGuardar.addEventListener("click", function() {
        const nombre = document.getElementById("nombre").value.trim();
        const apellido = document.getElementById("apellido").value.trim();
        const email = document.getElementById("email").value.trim();

        // Validación de campos obligatorios
        if (!nombre || !apellido || !email) {
            alert("Revise campos sin contestar");
            return;
        }

        const segundoNombre = document.getElementById("segundoNombre").value.trim();
        const segundoApellido = document.getElementById("segundoApellido").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const fotoPerfil = fotoPerfilInput.files[0];

        // Guardar datos en localStorage
        localStorage.setItem("nombre", nombre);
        localStorage.setItem("segundoNombre", segundoNombre);
        localStorage.setItem("apellido", apellido);
        localStorage.setItem("segundoApellido", segundoApellido);
        localStorage.setItem("email", email);
        localStorage.setItem("telefono", telefono);

        // Guardar foto de perfil
        if (fotoPerfil) {
            const reader = new FileReader();
            reader.onload = function(event) {
                localStorage.setItem("fotoPerfil", event.target.result);
                previewImagen.src = event.target.result; // Actualizar la vista previa de la imagen
            };
            reader.readAsDataURL(fotoPerfil);
        }

        alert("Datos guardados correctamente");
    });

    // Evento para cambiar el texto del botón y actualizar la vista previa de la imagen
    fotoPerfilInput.addEventListener("change", function() {
        const fotoPerfil = fotoPerfilInput.files[0];

        if (fotoPerfil) {
            
            // Actualizar la vista previa de la imagen y guardar en localStorage
            const reader = new FileReader();
            reader.onload = function(event) {
                localStorage.setItem("fotoPerfil", event.target.result);
                previewImagen.src = event.target.result; // Mostrar la nueva imagen seleccionada
            };
            reader.readAsDataURL(fotoPerfil);
        }
    });

      // Se borren los datos
      botonCerrarSesion.addEventListener("click", function(event) {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
        localStorage.removeItem("nombre");
        localStorage.removeItem("segundoNombre");
        localStorage.removeItem("apellido");
        localStorage.removeItem("segundoApellido");
        localStorage.removeItem("telefono");
        localStorage.removeItem("fotoPerfil"); 
        localStorage.removeItem("userEmail");
              
        window.location.href = "login.html"; 
    });
});
