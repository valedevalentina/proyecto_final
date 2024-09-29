function getStarsHTML(score) {
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= score) {
            starsHTML += '<span class="star selected">&#9733;</span>'; // Estrella llena
        } else {
            starsHTML += '<span class="star">&#9734;</span>'; // Estrella vacía
        }
    }
    return starsHTML;
}

document.addEventListener('DOMContentLoaded', () => {
    const productInfo = document.getElementById('product-info-container');
    const categoryName = document.getElementById('category-name');
    const commentContainer = document.getElementById('comment-list');
    const avgRatingElement = document.createElement('p');

    const id = localStorage.getItem("catID");
    const pid = localStorage.getItem("productID");
    const url = `https://japceibal.github.io/emercado-api/cats_products/${id}.json`;
    const url_comment = `https://japceibal.github.io/emercado-api/products_comments/${pid}.json`;
    const productID = parseInt(localStorage.getItem("productID"), 10);

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const products = data.products;
            const category = data.catName;
            categoryName.innerHTML = `<a href="products.html">Categoria: ${category}</a>`;

            const product = products.find(p => p.id === productID);

            if (product) {
                let thumbnails = '';
                for (let i = 1; i <= 4; i++) {
                    const imagePath = `img/prod${pid}_${i}.jpg`;
                    thumbnails += `<img src="${imagePath}" class="thumbnail" alt="${product.name}" data-image="${imagePath}">`;
                }

                const mainImage = `${product.image}`;

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
                        <p class="soldCount">N° de ventas: ${product.soldCount}</p>
                        <p class="avgRating" id="avg-rating"><span id="average-score">Cargando...</span> 
                        <button id="btnCalificar" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#ratingModal">Calificar</button>
                        </p>
                        <div class="btn-group">
                            <button class="btn btn-primary">Comprar ahora</button>
                            <button class="btn btn-secondary">Agregar al carrito</button>
                        </div>
                    </div>
                `;

                document.querySelectorAll('.thumbnail').forEach(thumbnail => {
                    thumbnail.addEventListener('click', function () {
                        document.getElementById('main-product-image').src = this.dataset.image;
                    });
                });

                const relatedProductsContainer = document.querySelector('.carousel-inner');
                relatedProductsContainer.innerHTML = '';

                let firstItem = true;
                let rowHTML = '<div class="row">';
                let productCount = 0;

                products.forEach(relatedProduct => {
                    if (relatedProduct.id !== productID) {
                        const relatedProductHTML = `
                            <div class="col-md-4">
                                <div class="related-product">
                                    <img src="${relatedProduct.image}" alt="${relatedProduct.name}" class="img-fluid">
                                    <h4>${relatedProduct.name}</h4>
                                    <p>${relatedProduct.currency} ${relatedProduct.cost.toFixed(0)}</p>
                                </div>
                            </div>
                        `;

                        rowHTML += relatedProductHTML;
                        productCount++;

                        if (productCount === 3) {
                            rowHTML += '</div>';
                            relatedProductsContainer.innerHTML += `<div class="carousel-item ${firstItem ? 'active' : ''}">${rowHTML}</div>`;
                            firstItem = false;
                            rowHTML = '<div class="row">';
                            productCount = 0;
                        }
                    }
                });

                if (productCount > 0) {
                    rowHTML += '</div>';
                    relatedProductsContainer.innerHTML += `<div class="carousel-item">${rowHTML}</div>`;
                }

            } else {
                productInfo.innerHTML = '<p>Producto no encontrado</p>';
            }
        })
        .catch(error => {
            console.error("Error fetching the JSON:", error);
        });

fetch(url_comment)
.then(response => response.json())
.then(comments => {
    let commentHTML = '';
    let totalScore = 0;
    const numberOfComments = comments.length;

    if (numberOfComments > 0) {
        comments.forEach(comment => {
            const date = new Date(comment.dateTime);
            commentHTML += `
                <div class="list-group-item">
                    <h5>${comment.user}</h5>
                    <p>${comment.description}</p>
                    <div class="star-rating">
                        ${getStarsHTML(comment.score)} <!-- Mostrar estrellas según la puntuación del comentario -->
                    </div>
                    <small class="text-muted">Puntuación: ${comment.score}/5 - ${date.toLocaleString()}</small>
                </div>
            `;
            totalScore += comment.score; // Sumar la puntuación de cada comentario
        });

        const averageScore = (totalScore / numberOfComments).toFixed(1);
        const starsHTML = getStarsHTML(averageScore);

        document.getElementById('average-score').innerHTML = `${starsHTML} (${numberOfComments} comentarios)`;
    } else {
        commentHTML = '<p>No hay comentarios para este producto.</p>';
        document.getElementById('average-score').textContent = 'No disponible';
    }

    commentContainer.innerHTML = commentHTML;
})
.catch(error => {
    console.error("Error fetching comments JSON:", error);
});

    const commentForm = document.getElementById('comment-form');

    let userRating = 0;

    const stars = document.querySelectorAll('#star-rating .star');
    stars.forEach(star => {
        star.addEventListener('click', () => {
            userRating = star.getAttribute('data-value');
            updateStars(userRating);
        });
    });

    function updateStars(rating) {
        stars.forEach(star => {
            if (star.getAttribute('data-value') <= rating) {
                star.classList.add('selected');
            } else {
                star.classList.remove('selected');
            }
        });
    }

    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const userComment = document.getElementById('user-comment').value;
        const userEmail = localStorage.getItem('userEmail') || 'Usuario Anónimo';

        //Simular nuevo comentario
        const newCommentHTML = `
            <div class="list-group-item">
                <h5>${userEmail}</h5>
                <p>${userComment}</p>
                <div class="star-rating">
                    ${getStarsHTML(userRating)}
                </div>
                <small class="text-muted">Puntuación: ${userRating}/5 - ${new Date().toLocaleString()}</small>
            </div>
        `;

        //Añadir nuevo comentario
        commentContainer.insertAdjacentHTML('afterbegin', newCommentHTML);
        commentForm.reset(); //Limpia formulario
        updateStars(0); //Reinicia las estrellas
        
        // Actualizar promedio de calificación
        const totalComments = commentContainer.childElementCount; // Número total de comentarios
        const newTotalScore = (totalScore + userRating); // Actualizar la puntuación total
        const averageScore = (newTotalScore / totalComments).toFixed(1); // Calcular nuevo promedio

        // Actualizar el promedio en la interfaz
        const starsHTML = getStarsHTML(averageScore);
        document.getElementById('average-score').innerHTML = `${starsHTML} (${totalComments} comentarios)`;
    });
});
