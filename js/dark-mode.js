document.addEventListener('DOMContentLoaded', function() {
    const modeToggleButton = document.getElementById('mode-toggle');
    const currentTheme = localStorage.getItem('theme');
  
    // Aplicar el tema guardado en localStorage
    if (currentTheme === 'dark-mode') {
      document.body.classList.add('dark-mode');
      modeToggleButton.textContent = '🌞 Modo Día';
    } else {
      modeToggleButton.textContent = '🌓 Modo Noche';
    }
  
    // Cambiar tema cuando el usuario haga clic en el botón
    modeToggleButton.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      const theme = document.body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
      localStorage.setItem('theme', theme);
      modeToggleButton.textContent = theme === 'dark-mode' ? '🌞 Modo Día' : '🌓 Modo Noche';
    });
  });


