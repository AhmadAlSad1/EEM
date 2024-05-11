document.addEventListener('DOMContentLoaded', function () {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    const currentPage = document.title.toLowerCase();

    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            navbarPlaceholder.innerHTML = data;

            const cartLink = document.getElementById('cart-link');
            const cartIcon = document.getElementById('cart-icon');
            const homeLink = document.getElementById('home-link');

            if (currentPage.includes('shopping cart')) {
                cartLink.classList.add('active');
                cartIcon.classList.add('active');
                homeLink.classList.remove('active');
            } else {
                cartLink.classList.remove('active');
                cartIcon.classList.remove('active');
                if (currentPage.includes('home')) {
                    homeLink.classList.add('active');
                }
            }
        })
        .catch(error => console.error('Error fetching navbar:', error));
});


document.addEventListener('DOMContentLoaded', function () {
    const cartTableBody = document.querySelector('#cart-table tbody');
    const totalPriceElement = document.getElementById('total-price');
    const confirmOrderButton = document.getElementById('confirm-order-btn');

    displayCart();

    function displayCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        cartTableBody.innerHTML = '';

        let totalPrice = 0;
        cart.forEach(product => {
            const row = document.createElement('tr');
            const productNameCell = document.createElement('td');
            productNameCell.textContent = product.name;
            row.appendChild(productNameCell);

            const quantityCell = document.createElement('td');
            quantityCell.textContent = product.quantity;
            row.appendChild(quantityCell);

            const pricePerItemCell = document.createElement('td');
            pricePerItemCell.textContent = `€${product.price}`;
            row.appendChild(pricePerItemCell);

            const totalPriceCell = document.createElement('td');
            const totalItemPrice = product.quantity * parseFloat(product.price);
            totalPriceCell.textContent = `€${totalItemPrice.toFixed(2)}`;
            row.appendChild(totalPriceCell);

            const removeButtonCell = document.createElement('td');
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', function () {
                removeFromCart(product);
                displayCart();
            });
            removeButtonCell.appendChild(removeButton);
            row.appendChild(removeButtonCell);

            cartTableBody.appendChild(row);

            totalPrice += totalItemPrice;
        });

        totalPriceElement.textContent = `Total Price: €${totalPrice.toFixed(2)}`;

        if (cart.length > 0) {
            confirmOrderButton.disabled = false;
        } else {
            confirmOrderButton.disabled = true;
        }
    }

    function removeFromCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const productIndex = cart.findIndex(item => item.name === product.name);

        if (productIndex !== -1) {
            cart.splice(productIndex, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            console.log('Product removed from cart:', product);
        }
    }

    confirmOrderButton.addEventListener('click', function () {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length > 0) {
            saveOrder(cart);
            window.location.href = 'confirmation.html';
        }
    });

    function saveOrder(cart) {
        let orders = JSON.parse(localStorage.getItem('orders')) || [];

        cart.forEach(product => {
            const existingOrderIndex = orders.findIndex(order => order.name === product.name);

            if (existingOrderIndex !== -1) {
                orders[existingOrderIndex].quantity += product.quantity;
            } else {
                const newOrder = {
                    id: Date.now(),
                    name: product.name,
                    price: product.price,
                    quantity: product.quantity,
                    timestamp: Date.now()
                };
                orders.push(newOrder);
            }
        });

        localStorage.setItem('orders', JSON.stringify(orders));
        console.log('Order saved:', orders);
    }
});