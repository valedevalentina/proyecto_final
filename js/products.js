
document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');

    // URL del JSON
    const url = 'https://japceibal.github.io/emercado-api/cats_products/101.json';

    // Función para obtener los productos desde la URL
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const products = data.products;
            products.forEach(product => {
                const productItem = document.createElement('div');
                productItem.classList.add('product-item');

                productItem.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-info">
                        <h2>${product.name}</h2>
                        <p>${product.description}</p>
                        <p></p>
                        <p class="price">${product.currency} ${product.cost.toFixed(2)}</p>
                        <p class="soldCount">Cantidad de vendidos: ${product.soldCount} </p> 
                    </div>
                `;

                productList.appendChild(productItem);
            });
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });
});

