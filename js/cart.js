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
        removeProduct(productId);
    }
}

// Eliminar un producto del carrito
function removeProduct(productId) {
    let cart = getCartItems();
    cart = cart.filter(item => item.id !== productId);
    saveCartItems(cart);
    renderCart();
    updateCartBadge(); // Actualizar el badge
}

// Renderizar los productos del carrito
function renderCart() {
    const cartItems = getCartItems();
    const cartContainer = document.getElementById('cart-items');
    const emptyMessage = document.getElementById('empty-message');
    const totalPriceElement = document.getElementById('total-price');
    const buyButton = document.getElementById('buy-btn');

    if (cartItems.length === 0) {
        emptyMessage.style.display = 'block';
        cartContainer.innerHTML = '';
        totalPriceElement.textContent = '';
        buyButton.disabled = true;
        return;
    }

    emptyMessage.style.display = 'none';
    buyButton.disabled = false;

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
                        <button class="btn btn-sm btn-outline-secondary me-2" id="btnEliminar" onclick="decreaseQuantity(${product.id})">-</button>
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

// Inicializar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});


// desde acá lo que hace es ocultar el boton de comprar si no hay elementos en el carrito
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
// hasta acá.