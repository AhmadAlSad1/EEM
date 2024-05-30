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
            removeButton.className = 'remove-button';
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
            window.open('confirmation.html', '_blank');
        }
    });

    function saveOrder(cart) {
        let orders = JSON.parse(localStorage.getItem('orders')) || [];

        const newOrderId = orders.length > 0 ? orders[orders.length - 1].id + 1 : 0;

        const newOrder = {
            id: newOrderId,
            products: cart.map(product => ({
                name: product.name,
                price: product.price,
                quantity: product.quantity
            })),
            total: cart.reduce((acc, product) => acc + product.price * product.quantity, 0),
            timestamp: new Date().toISOString()
        };

        orders.push(newOrder);

        localStorage.setItem('orders', JSON.stringify(orders));
        console.log('Order saved:', orders);
    }
});