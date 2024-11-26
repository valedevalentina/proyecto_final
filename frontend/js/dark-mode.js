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

// cartBadge.js
function updateCartBadge() {
  // Obtener productos del carrito desde localStorage
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const badge = document.getElementById('cart-badge');

  // Verifica si el badge existe en la página antes de intentar actualizarlo
  if (badge) {
      // Suma la cantidad total de productos en el carrito
      const totalQuantity = cartItems.reduce((sum, product) => sum + product.quantity, 0);
      badge.textContent = totalQuantity; // Actualiza el contenido del badge
  }
}

// Ejecutar la función cuando el contenido esté completamente cargado
document.addEventListener('DOMContentLoaded', updateCartBadge);
