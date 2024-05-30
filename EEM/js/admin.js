document.addEventListener('DOMContentLoaded', function () {
    const orderList = document.getElementById('order-list');

    function displayOrders() {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];

        orderList.innerHTML = '';

        orders.forEach(order => {
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = order.id;
            row.appendChild(idCell);

            const totalPriceCell = document.createElement('td');
            totalPriceCell.textContent = `€${order.total.toFixed(2)}`;
            row.appendChild(totalPriceCell);

            const dateTimeCell = document.createElement('td');
            dateTimeCell.textContent = new Date(order.timestamp).toLocaleString();
            row.appendChild(dateTimeCell);

            orderList.appendChild(row);
        });
    }

    displayOrders();
});