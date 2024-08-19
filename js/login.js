const ingresar = document.getElementById("ingresar")

ingresar.addEventListener("click", function(){
let valid = true; 
const user = document.getElementById('usuario').value.trim();
const psw = document.getElementById('contrasena').value.trim();
const alertDanger = document.getElementById('alert-danger');

if (!user || !psw ) {
    valid = false;
    alertDanger.querySelector('p').textContent = 'Ningún campo puede estar vacío.';
    alertDanger.classList.add('show');
    return;
}

if (valid) {
    location.replace("index.html")
} else {
    document.getElementById("alert-danger").classList.add("show");
}
})


