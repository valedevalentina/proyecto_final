
document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const searchBar = document.getElementById('search-bar');
    
    const minPriceInput = document.getElementById("min-price");
    const maxPriceInput = document.getElementById("max-price");
    const filterButton = document.getElementById("filter-button");
    const sortPriceAscButton = document.getElementById("sort-price-asc");
    const sortPriceDescButton = document.getElementById("sort-price-desc");
    const sortRelevanceDescButton = document.getElementById("sort-relevance-desc");
    
    // URL del JSON
    const id = localStorage.getItem("catID");
    const url = `https://japceibal.github.io/emercado-api/cats_products/${id}.json`;

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
                            <p></p>
                            <p class="price">${product.currency} ${product.cost.toFixed(0)}</p>
                            <p class="soldCount">Cantidad de vendidos: ${product.soldCount}</p>
                        </div>
                    `;

                    productList.appendChild(productItem);
                });
            }

            // Mostrar todos los productos inicialmente
            displayProducts(products);

                        // Filtrar productos por rango de precio
                        filterButton.addEventListener("click", () => {
                            const minPrice = parseFloat(minPriceInput.value) || 0;
                            const maxPrice = parseFloat(maxPriceInput.value) || Infinity;
                            const filteredProducts = products.filter(product =>
                                product.cost >= minPrice && product.cost <= maxPrice
                            );
                            displayProducts(filteredProducts);
                        });
            
                        // Ordenar productos por precio ascendente
                        sortPriceAscButton.addEventListener("click", () => {
                            const sortedProducts = [...products].sort((a, b) => a.cost - b.cost);
                            displayProducts(sortedProducts);
                        });
            
                        // Ordenar productos por precio descendente
                        sortPriceDescButton.addEventListener("click", () => {
                            const sortedProducts = [...products].sort((a, b) => b.cost - a.cost);
                            displayProducts(sortedProducts);
                        });
            
                        // Ordenar productos por relevancia descendente (cantidad de vendidos)
                        sortRelevanceDescButton.addEventListener("click", () => {
                            const sortedProducts = [...products].sort((a, b) => b.soldCount - a.soldCount);
                            displayProducts(sortedProducts);
                        });
            

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
