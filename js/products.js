
document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const searchBar = document.getElementById('search-bar');

    // URL del JSON
    const url = 'https://japceibal.github.io/emercado-api/cats_products/101.json';

    // Función para obtener los productos desde la URL
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const products = data.products;

            // Función para mostrar los productos en la lista
            function displayProducts(productsToShow) {
                productList.innerHTML = '';
                productsToShow.forEach(product => {
                    const productItem = document.createElement('div');
                    productItem.classList.add('product-item');

                    productItem.innerHTML = `
                        <img src="${product.image}" alt="${product.name}">
                        <div class="product-info">
                            <h2>${product.name}</h2>
                            <p>${product.description}</p>
                            <p class="price">${product.currency} ${product.cost.toFixed(2)}</p>
                        </div>
                    `;

                    productList.appendChild(productItem);
                });
            }

            // Mostrar todos los productos inicialmente
            displayProducts(products);

            // Filtrar los productos en función de la entrada en la barra de búsqueda
            searchBar.addEventListener('input', () => {
                const searchText = searchBar.value.toLowerCase();
                const filteredProducts = products.filter(product =>
                    product.name.toLowerCase().includes(searchText) ||
                    product.description.toLowerCase().includes(searchText)
                );
                displayProducts(filteredProducts);
            });
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });
});
