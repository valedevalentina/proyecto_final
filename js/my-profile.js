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
} 

document.addEventListener('DOMContentLoaded', function() {
    const modeToggleButton = document.getElementById('mode-toggle');
    const currentTheme = localStorage.getItem('theme');
  
    // Aplicar el tema guardado en localStorage
    if (currentTheme) {
      document.body.classList.add(currentTheme);
      modeToggleButton.textContent = currentTheme === 'dark-mode' ? '🌞 Modo Día' : '🌓 Modo Noche';
    }
  
    // Cambiar tema cuando el usuario haga clic en el botón
    modeToggleButton.addEventListener('click', function() {
      if (document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light-mode');
        modeToggleButton.textContent = '🌓 Modo Noche';
      } else {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
        modeToggleButton.textContent = '🌞 Modo Día';
      }
    });
  });
  