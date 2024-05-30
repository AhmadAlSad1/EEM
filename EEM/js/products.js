document.addEventListener('DOMContentLoaded', function () {
    const productContainer = document.getElementById('product-container');
    const cartIcon = document.getElementById('cart-icon');
    fetchProducts();

    function fetchProducts() {
        let products = JSON.parse(localStorage.getItem('product')) || [];
        products.forEach(product => {
            const card = createProductCard(product);
            productContainer.appendChild(card);
        });
    }

    function createProductCard(product) {
        const card = document.createElement('div');
        card.classList.add('card');

        const img = document.createElement('img');
        img.src = product.url;
        img.alt = product.title;
        card.appendChild(img);

        const name = document.createElement('h2');
        name.textContent = product.title;
        card.appendChild(name);

        const price = document.createElement('p');
        price.textContent = `€${product.price}`;
        card.appendChild(price);

        const button = document.createElement('button');
        button.classList.add('btn');
        button.textContent = 'Add to Cart';
        button.addEventListener('click', function () {
            addToCart(product);
            showNotificationCircle();
        });
        card.appendChild(button);

        return card;
    }

    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProductIndex = cart.findIndex(item => item.title === product.title);

        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity++;
        } else {
            product.quantity = 1;
            cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('Product toegevoegd aan winkelwagen:', product);
    }

    function showNotificationCircle() {
        const notificationCircle = document.createElement('div');
        notificationCircle.classList.add('notification-circle');
        cartIcon.appendChild(notificationCircle);
    }
});