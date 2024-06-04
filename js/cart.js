document.addEventListener('DOMContentLoaded', () => {
    const cartTableBody = document.querySelector('#cart-table tbody');
    const totalPriceElement = document.getElementById('total-price');
    const confirmOrderButton = document.getElementById('confirm-order-btn');

    const displayCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartTableBody.innerHTML = '';

        let totalPrice = 0;
        cart.forEach((product, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.title}</td>
                <td>${product.quantity}</td>
                <td>€${product.price}</td>
                <td>€${(product.quantity * parseFloat(product.price)).toFixed(2)}</td>
                <td><button class="remove-button" data-index="${index}">Remove</button></td>
            `;
            cartTableBody.appendChild(row);

            totalPrice += product.quantity * parseFloat(product.price);
        });

        totalPriceElement.textContent = `Total Price: €${totalPrice.toFixed(2)}`;
        confirmOrderButton.disabled = cart.length === 0;

        document.querySelectorAll('.remove-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.getAttribute('data-index');
                removeFromCart(index);
                displayCart();
            });
        });
    };

    const removeFromCart = (index) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('Product removed from cart:', index);
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