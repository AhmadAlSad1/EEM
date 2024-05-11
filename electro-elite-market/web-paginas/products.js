document.addEventListener('DOMContentLoaded', function () {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            navbarPlaceholder.innerHTML = data;
            const currentPage = document.title.toLowerCase();
            const links = document.querySelectorAll('#navbar a');
            links.forEach(link => {
                if (link.textContent.toLowerCase() === currentPage) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        })
        .catch(error => console.error('Error fetching navbar:', error));
});

document.addEventListener('DOMContentLoaded', function () {
    const productContainer = document.getElementById('product-container');

    fetchProducts();

    function fetchProducts() {
        fetch('products.json')
            .then(response => response.json())
            .then(data => {
                data.forEach(product => {
                    const card = createProductCard(product);
                    productContainer.appendChild(card);
                });
            })
            .catch(error => console.error('Error fetching products:', error));
    }

    function createProductCard(product) {
        const card = document.createElement('div');
        card.classList.add('card');

        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;
        card.appendChild(img);

        const name = document.createElement('h2');
        name.textContent = product.name;
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
        const existingProductIndex = cart.findIndex(item => item.name === product.name);

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
        const cartIcon = document.getElementById('cart-icon');
        const notificationCircle = document.createElement('div');
        notificationCircle.classList.add('notification-circle');
        cartIcon.appendChild(notificationCircle);
    }
});