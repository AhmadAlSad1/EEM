document.addEventListener('DOMContentLoaded', () => {
    const cartTableBody = document.querySelector('#cart-table tbody');
    const totalPriceElement = document.getElementById('total-price');
    const confirmOrderButton = document.getElementById('confirm-order-btn');

    const displayCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartTableBody.innerHTML = '';

        const rows = cart.map(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>€${product.price}</td>
                <td>€${(product.quantity * parseFloat(product.price)).toFixed(2)}</td>
                <td><button class="remove-button">Remove</button></td>
            `;
            row.querySelector('.remove-button').addEventListener('click', () => {
                removeFromCart(product.name);
                displayCart();
            });
            return row;
        });

        rows.forEach(row => cartTableBody.appendChild(row));

        const totalPrice = cart.reduce((total, product) => total + product.quantity * parseFloat(product.price), 0);
        totalPriceElement.textContent = `Total Price: €${totalPrice.toFixed(2)}`;
        confirmOrderButton.disabled = cart.length === 0;
    };

    const removeFromCart = (productName) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(product => product.name !== productName);
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('Product removed from cart:', productName);
    };

    confirmOrderButton.addEventListener('click', () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length > 0) {
            saveOrder(cart);
            window.open('confirmation.html', '_blank');
        }
    });

    const saveOrder = (cart) => {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const newOrderId = orders.length ? orders[orders.length - 1].id + 1 : 0;
        const newOrder = {
            id: newOrderId,
            products: cart,
            total: cart.reduce((acc, product) => acc + product.price * product.quantity, 0),
            timestamp: new Date().toISOString(),
        };
        orders.push(newOrder);
        localStorage.setItem('orders', JSON.stringify(orders));
        console.log('Order saved:', orders);
    };

    displayCart();
});