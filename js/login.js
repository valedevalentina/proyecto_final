//Código JavaScript para iniciar sesión://

const ingresar = document.getElementById("ingresar");

ingresar.addEventListener("click", function() {
    let valid = true; 
    const user = document.getElementById('usuario').value.trim();
    const psw = document.getElementById('contrasena').value.trim();
    const alertDanger = document.getElementById('alert-danger');

<<<<<<< HEAD
if (valid) {
    location.replace("index.html")
} else {
    document.getElementById("alert-danger").classList.add("show");
}

})
=======
    if (!user || !psw) {
        valid = false;
        alertDanger.querySelector('p').textContent = 'Ningún campo puede estar vacío.';
        alertDanger.classList.add('show');
        return;
    }
>>>>>>> fabi

    if (valid) {
        // Guardar la sesión en sessionStorage
        sessionStorage.setItem('sesionIniciada', 'true');
        // Redireccionar a la página principal
        location.replace("index.html");
    } else {
        document.getElementById("alert-danger").classList.add("show");
    }
});

<<<<<<< HEAD
=======
//Código de JavaScript para visualizar contraseña//

>>>>>>> fabi
const togglePassword = document.querySelector('#togglePassword');
const contrasena = document.querySelector('#contrasena');

togglePassword.addEventListener('click', function (e) {
<<<<<<< HEAD
// Alternar el tipo de input
const type = contrasena.getAttribute('type') === 'password' ? 'text' : 'password';
contrasena.setAttribute('type', type);

// Cambiar el ícono
this.classList.toggle('fa-eye-slash');
=======
    // Alternar el tipo de input
    const type = contrasena.getAttribute('type') === 'password' ? 'text' : 'password';
    contrasena.setAttribute('type', type);

    // Cambiar el ícono
    this.classList.toggle('fa-eye-slash');
>>>>>>> fabi
});