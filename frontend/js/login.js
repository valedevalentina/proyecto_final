const ingresar = document.getElementById("ingresar");

ingresar.addEventListener("click", function() {
    let valid = true; 
    const user = document.getElementById('usuario').value.trim();
    const psw = document.getElementById('contrasena').value.trim();
    const alertDanger = document.getElementById('alert-danger');

    // Validar si los campos están vacíos
    if (user === '' || psw === '') {
        valid = false;
    }

    // Validar si la contraseña tiene menos de 5 caracteres
    if (psw.length < 5) {
        valid = false;
        alertDanger.textContent = 'La contraseña debe tener al menos 5 caracteres.';
        }

    // Expresión regular para validar el formato de email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validar si el email no es válido
    if (!emailPattern.test(user)) {
    valid = false;
    alertDanger.textContent = 'Por favor, ingresa un correo electrónico válido.';
    }

    if (valid) {
        // Guardar la sesión en sessionStorage
        localStorage.setItem('sesionIniciada', 'true');
        localStorage.setItem("userEmail", user)
        // Redireccionar a la página principal
        location.replace("index.html");
    } else {
        // Mostrar alerta si la validación falla
        document.getElementById("alert-danger").classList.add("show");
    }
});

const togglePassword = document.querySelector('#togglePassword');
const contrasena = document.querySelector('#contrasena');

togglePassword.addEventListener('click', function (e) {
    // Alternar el tipo de input
    const type = contrasena.getAttribute('type') === 'password' ? 'text' : 'password';
    contrasena.setAttribute('type', type);

    // Cambiar el ícono
    this.classList.toggle('fa-eye-slash');
});