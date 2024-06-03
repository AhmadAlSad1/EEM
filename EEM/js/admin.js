document.addEventListener('DOMContentLoaded', () => {
    const orderList = document.getElementById('order-list');

    const displayOrders = () => {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        orderList.innerHTML = orders.map(order => `
            <tr>
                <td>${order.id}</td>
                <td>€${order.total.toFixed(2)}</td>
                <td>${new Date(order.timestamp).toLocaleString()}</td>
            </tr>
        `).join('');
    };

    displayOrders();
});