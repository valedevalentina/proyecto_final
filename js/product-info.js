document.addEventListener('DOMContentLoaded', () => {
    const productInfo = document.getElementById('product-info-container');
    const categoryName = document.getElementById('category-name');

    const id = localStorage.getItem("catID");
    const pid = localStorage.getItem("productID");
    const url = `https://japceibal.github.io/emercado-api/cats_products/${id}.json`;
    const productID = parseInt(localStorage.getItem("productID"), 10);

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const products = data.products;
            const category = data.catName; 
            // Nombre de la categoría 
            categoryName.innerHTML = `<p>Categoria: ${category}</p>`;

            // Buscar el producto por ID
            const product = products.find(p => p.id === productID);

            if (product) {
                let thumbnails = '';
                for (let i = 1; i <= 4; i++) {
                    const imagePath = `img/prod${pid}_${i}.jpg`;
                    thumbnails += `<img src="${imagePath}" class="thumbnail" alt="${product.name}" data-image="${imagePath}">`;
                }

                const mainImage = `${product.image}`;

                // Insertar el contenido de los productos usando insertAdjacentHTML
                productInfo.innerHTML = `
                    <div id="product-images">
                        <div id="thumbnail-list">
                            ${thumbnails}
                        </div>
                        <img id="main-product-image" src="${mainImage}" alt="${product.name}">
                    </div>
                    <div id="product-details">
                        <h2>${product.name}</h2>
                        <p>${product.description}</p>
                        <p class="price">${product.currency} ${product.cost.toFixed(0)}</p>
                        <p class="soldCount">Cantidad de vendidos: ${product.soldCount}</p>
                        <div class="btn-group">
                            <button>Comprar ahora</button>
                            <button>Agregar al carrito</button>
                        </div>
                    </div>
                `;

                // Cambiar la imagen principal al hacer clic en una miniatura
                document.querySelectorAll('.thumbnail').forEach(thumbnail => {
                    thumbnail.addEventListener('click', function () {
                        document.getElementById('main-product-image').src = this.dataset.image;
                    });
                });
            } else {
                productInfo.innerHTML = '<p>Producto no encontrado</p>';
            }
        })
        .catch(error => {
            console.error("Error fetching the JSON:", error);
        });
});
