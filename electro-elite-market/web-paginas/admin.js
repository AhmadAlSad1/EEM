document.addEventListener('DOMContentLoaded', function () {
    const orderList = document.getElementById('order-list');

    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    orders.forEach((order, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>€${(order.price * order.quantity).toFixed(2)}</td>
            <td>${new Date(order.timestamp).toLocaleString()}</td>
        `;
        orderList.appendChild(row);
    });
});

function addToCart(product) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];

    const newOrder = {
        id: Date.now(),
        name: product.name,
        price: product.price,
        quantity: 1,
        timestamp: Date.now()
    };

    orders.push(newOrder);

    localStorage.setItem('orders', JSON.stringify(orders));
    console.log('Product toegevoegd aan winkelwagen:', product);
}