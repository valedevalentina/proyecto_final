document.addEventListener('DOMContentLoaded', () => {
    const productInfo = document.getElementById('product-info-container');
    const categoryName = document.getElementById('category-name');
    const commentContainer = document.getElementById('comment-list'); // Para los comentarios


    const id = localStorage.getItem("catID");
    const userEmail = localStorage.getItem('userEmail')
    const pid = localStorage.getItem("productID");
    const url = `https://japceibal.github.io/emercado-api/cats_products/${id}.json`;
    const url_comment = `https://japceibal.github.io/emercado-api/products_comments/${pid}.json`;
    const productID = parseInt(localStorage.getItem("productID"), 10);

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const products = data.products;
            const category = data.catName; 
            // Nombre de la categoría 
            categoryName.innerHTML = `<a href="products.html">Categoria: ${category}</a>`;

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
                            <button class="btn btn-primary">Comprar ahora</button>
                            <button class="btn btn-secondary">Agregar al carrito</button>
                            <!-- Botón para abrir el modal de calificación -->
                            <button class="btn btn-info" data-bs-toggle="modal" data-bs-target="#ratingModal">Calificar</button>
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

     // Fetch para obtener los comentarios
     fetch(url_comment)
     .then(response => response.json())
     .then(comments => {
         let commentHTML = '';
         if (comments.length > 0) {
             comments.forEach(comment => {
                 const date = new Date(comment.dateTime);
                 commentHTML += `
                     <div class="list-group-item">
                         <h5>${comment.user}</h5>
                         <p>${comment.description}</p>
                         <small class="text-muted">Puntuación: ${comment.score}/5 - ${date.toLocaleString()}</small>
                     </div>
                 `;
             });
         } else {
             commentHTML = '<p>No hay comentarios para este producto.</p>';
         }
         commentContainer.innerHTML = commentHTML;
     })
     .catch(error => {
         console.error("Error fetching comments JSON:", error);
     });

        // Agregar nuevo comentario desde el formulario
        const commentForm = document.getElementById('comment-form');

        commentForm.addEventListener('submit', (e) => {
           e.preventDefault(); // Evitar que la página se recargue

            const userComment = document.getElementById('user-comment').value;
            const userRating = document.getElementById('user-rating').value;
            const userEmail = localStorage.getItem('userEmail'); // Recuperar el nombre del usuario desde localStorage
    
            // Simular un nuevo comentario
            const newCommentHTML = `
                <div class="list-group-item">
                    <h5>${userEmail || 'Usuario Anónimo'}</h5>
                    <p>${userComment}</p>
                    <small class="text-muted">Puntuación: ${userRating}/5 - ${new Date().toLocaleString()}</small>
                </div>
            `;
    
            // Añadir el nuevo comentario a la lista de comentarios
            commentContainer.insertAdjacentHTML('beforeend', newCommentHTML);
            
            // Limpiar el formulario después de enviarlo
            commentForm.reset();

        /*Cerrar el modal de calificación
        const ratingModal = document.getElementById('ratingModal');
        const modal = bootstrap.Modal.getInstance(ratingModal); // Obtener la instancia del modal
        modal.hide(); // Cerrar el modal
        if (modal) {
        modal.hide(); // Cerrar el modal
        } else {
        // Si no hay instancia, crear una nueva
        new bootstrap.Modal(ratingModal).hide();
        }*/
});
});