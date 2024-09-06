document.addEventListener('DOMContentLoaded', () => {
    const productInfo = document.getElementById('product-info');

    // URL del JSON
    const id = localStorage.getItem("catID");
    const url = `https://japceibal.github.io/emercado-api/cats_products/${id}.json`;
    const productID = parseInt(localStorage.getItem("productID"), 10);  // Asegúrate de convertirlo a número

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const products = data.products;

            // Buscar el producto por ID
            const product = products.find(p => p.id === productID);

            if (product) {
                // Mostrar la información del producto
                productInfo.innerHTML = `
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                    <p class="price">${product.currency} ${product.cost.toFixed(0)}</p>
                    <p class="soldCount">Cantidad de vendidos: ${product.soldCount}</p>
                    <p class="catName">Categoría: ${catName}</p>
                    <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src="${product.image}" class="d-block w-100" alt="${product.name}">
                            </div>
                            <!-- Puedes añadir más imágenes si es necesario -->
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                `;
            } else {
                productInfo.innerHTML = '<p>Producto no encontrado</p>';
            }
        })
        .catch(error => {
            console.error("Error fetching the JSON:", error);
        });
});