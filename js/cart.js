// Obtener los productos del localStorage
function getCartItems() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Guardar los productos en el localStorage
function saveCartItems(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Calcular el subtotal de un producto
function calculateSubtotal(product) {
    const unitPrice = product.currency === 'USD' ? product.cost * 40 : product.cost;
    return unitPrice * product.quantity;
}

// Calcular el total del carrito
function calculateTotal(cartItems) {
    return cartItems.reduce((total, product) => total + calculateSubtotal(product), 0);
}

// Incrementar la cantidad de un producto
function increaseQuantity(productId) {
    const cart = getCartItems();
    const product = cart.find(item => item.id === productId);
    product.quantity += 1;
    saveCartItems(cart);
    renderCart();
    updateCartBadge(); // Actualizar el badge
}

// Disminuir la cantidad de un producto
function decreaseQuantity(productId) {
    const cart = getCartItems();
    const product = cart.find(item => item.id === productId);
    if (product.quantity > 1) {
        product.quantity -= 1;
        saveCartItems(cart);
        renderCart();
        updateCartBadge(); // Actualizar el badge
    } else {
        removeProduct(productId); // Eliminar si la cantidad es 1 y se intenta reducir más
    }
}

// Eliminar un producto del carrito
function removeProduct(productId) {
    let cart = getCartItems();
    cart = cart.filter(item => item.id !== productId); // Filtrar productos para eliminar el deseado
    saveCartItems(cart);
    renderCart();
    updateCartBadge(); // Actualizar el badge
}


// Inicializar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});


// desde acá lo que hace es ocultar el boton de comprar si no hay elementos en el carrito
// Renderizar los productos del carrito
function renderCart() {
    const cartItems = getCartItems();
    const cartContainer = document.getElementById('cart-items');
    const emptyMessage = document.getElementById('empty-message');
    const totalPriceElement = document.getElementById('total-price');
    const buyButton = document.getElementById('buy-btn');

    if (cartItems.length === 0) {
        emptyMessage.style.display = 'block';      // Mostrar mensaje de carrito vacío
        cartContainer.innerHTML = '';              // Limpiar el contenido del carrito
        totalPriceElement.textContent = '';        // Limpiar el precio total
        buyButton.style.display = 'none';          // Ocultar el botón "Comprar"
        buyButton.disabled = true;                 // Deshabilitar el botón "Comprar" por seguridad
        return;
    }

    emptyMessage.style.display = 'none';           // Ocultar mensaje de carrito vacío
    buyButton.style.display = 'inline-block';      // Mostrar el botón "Comprar"
    buyButton.disabled = false;                    // Habilitar el botón "Comprar"

    let cartHTML = '';
    cartItems.forEach(product => {
        const subtotal = calculateSubtotal(product);
        cartHTML += `
            <div class="cart-item d-flex pb-2 mb-2">
                <img src="${product.image}" alt="${product.name}">
                <div>
                    <h5>${product.name}</h5>
                    <p>${product.currency} ${product.cost.toFixed(0)}</p>
                    <div class="d-flex align-items-center">
                        <button class="btn btn-sm btn-outline-secondary me-2" onclick="decreaseQuantity(${product.id})">-</button>
                        <span>${product.quantity}</span>
                        <button class="btn btn-sm btn-outline-secondary ms-2" onclick="increaseQuantity(${product.id})">+</button>
                    </div>
                </div>
                <div class="subtotal">
                    <h6>Subtotal: UYU ${subtotal.toFixed(0)}</h6>
                    <button class="btn btn-sm btn-danger" onclick="removeProduct(${product.id})">Eliminar</button>
                </div>
            </div>
        `;
    });

    const total = calculateTotal(cartItems);
    totalPriceElement.textContent = `Total: UYU ${total.toFixed(0)}`;
    cartContainer.innerHTML = cartHTML;
}
// Función para mostrar el modal de compra
document.getElementById('buy-btn').addEventListener('click', () => {
    console.log("Botón de comprar presionado");
    const total = calculateTotal(getCartItems());
    document.getElementById('finalTotal').textContent = `UYU ${total.toFixed(0)}`;
    const purchaseModal = new bootstrap.Modal(document.getElementById('purchaseModal'));
    purchaseModal.show();
});

// Función para actualizar el total con el envío
function updateTotal() {
    const cartItems = getCartItems();
    const shippingCost = parseFloat(document.getElementById('shippingType').value);
    const cartTotal = calculateTotal(cartItems);
    const finalTotal = cartTotal + shippingCost;
    document.getElementById('finalTotal').textContent = `UYU ${finalTotal.toFixed(0)}`;
}

// Función para completar la compra
function completePurchase() {
    // Aquí puedes agregar la lógica para procesar la compra
    alert("Compra realizada con éxito.");
    localStorage.removeItem('cart'); // Vaciar el carrito después de la compra
    renderCart(); // Renderizar el carrito vacío
    const purchaseModal = bootstrap.Modal.getInstance(document.getElementById('purchaseModal'));
    purchaseModal.hide();
}
// Mostrar el modal de compra al hacer clic en "Comprar"
document.getElementById('buy-btn').addEventListener('click', () => {
    console.log("Botón de comprar presionado");
    const total = calculateTotal(getCartItems());
    document.getElementById('total-cost').textContent = `Total: UYU ${total.toFixed(0)}`;
    const shippingModal = new bootstrap.Modal(document.getElementById('shippingModal'));
    shippingModal.show();
});

// Función para actualizar el total con el envío
function updateTotal() {
    const cartItems = getCartItems();
    const cartTotal = calculateTotal(cartItems);

    // Obtener el costo de envío seleccionado
    const shippingCost = parseFloat(document.querySelector('input[name="shippingType"]:checked').value || 0);
    
    const finalTotal = cartTotal + (cartTotal * shippingCost);
    document.getElementById('shipping-cost').textContent = `Costo de envío: UYU ${(cartTotal * shippingCost).toFixed(0)}`;
    document.getElementById('total-cost').textContent = `Total: UYU ${finalTotal.toFixed(0)}`;
}

// Escuchar el cambio de selección en el tipo de envío
document.querySelectorAll('input[name="shippingType"]').forEach(input => {
    input.addEventListener('change', updateTotal);
});

// Función para completar la compra
function completePurchase() {
    alert("Compra realizada con éxito.");
    localStorage.removeItem('cart'); // Vaciar el carrito después de la compra
    renderCart(); // Renderizar el carrito vacío
    const shippingModal = bootstrap.Modal.getInstance(document.getElementById('shippingModal'));
    shippingModal.hide();
}

// Evento para el botón de confirmar compra en el modal
document.getElementById('confirmPurchaseBtn').addEventListener('click', completePurchase);

function handlePayment() {
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
    if (paymentMethod) {
      if (paymentMethod.value === "transfer") {
        window.location.href = "https://ebanking.brou.com.uy/frontend/loginStep1";
      } else if (paymentMethod.value === "mercadoPago") {
        window.location.href = "https://www.mercadopago.com";
      }
    } else {
      alert("Por favor, selecciona un método de pago.");
    }
  }
//BOTON COMPRAR VALIDACION 

function validatePurchaseButton() {
    const shippingType = document.querySelector('input[name="shippingType"]:checked');
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
    const street = document.getElementById('street').value.trim();
    const doorNumber = document.getElementById('doorNumber').value.trim();
    
    // Habilitar o deshabilitar el botón 
    const isFormValid = shippingType && paymentMethod && street && doorNumber;
    document.getElementById('confirmPurchaseBtn').disabled = !isFormValid;
  }
  // Función para cargar los departamentos desde el JSON
  async function loadDepartments() {
    try {
      const response = await fetch('data/localidades.json');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const departmentsData = await response.json();
  
      // Llenar el selector de departamentos
      const departmentSelect = document.getElementById('departmentSelect');
      departmentsData.forEach(department => {
        const option = document.createElement('option');
        option.value = department.id;
        option.text = department.name;
        departmentSelect.add(option);
      });
  
      // Configurar el evento de cambio para cargar localidades
      departmentSelect.addEventListener('change', () => populateLocalities(departmentsData));
    } catch (error) {
      console.error('Error al cargar el JSON:', error);
    }
  }
  
  // Función para cargar las localidades según el departamento seleccionado
  function populateLocalities(departmentsData) {
    const departmentSelect = document.getElementById('departmentSelect');
    const localitySelect = document.getElementById('localitySelect');
    localitySelect.innerHTML = '<option value="">Selecciona una localidad</option>';
  
    const selectedDepartment = departmentsData.find(dep => dep.id == departmentSelect.value);
    if (selectedDepartment) {
      selectedDepartment.towns.forEach(town => {
        const option = document.createElement('option');
        option.value = town.id;
        option.text = town.name;
        localitySelect.add(option);
      });
    }
  }

 
  document.getElementById('shippingForm').addEventListener('input', validatePurchaseButton);
  document.getElementById('shippingForm').addEventListener('change', validatePurchaseButton);
