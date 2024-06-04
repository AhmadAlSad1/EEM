document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-container');
    const cartIcon = document.getElementById('cart-icon');

    const fetchProducts = () => {
        const products = JSON.parse(localStorage.getItem('product')) || [];
        products.forEach(product => {
            productContainer.appendChild(createProductCard(product));
        });
    };

    const createProductCard = (product) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${product.url}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>€${product.price}</p>
            <button class="btn">Add to Cart</button>
        `;
        card.querySelector('button').addEventListener('click', () => {
            addToCart(product);
            showNotificationCircle();
        });
        return card;
    };

    const addToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find(item => item.title === product.title);

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            product.quantity = 1;
            cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('Product toegevoegd aan winkelwagen:', product);
    };

    const showNotificationCircle = () => {
        if (!cartIcon.querySelector('.notification-circle')) {
            const notificationCircle = document.createElement('div');
            notificationCircle.className = 'notification-circle';
            cartIcon.appendChild(notificationCircle);
        }
    };

    fetchProducts();
});