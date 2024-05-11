document.addEventListener('DOMContentLoaded', function () {
    const productList = document.getElementById('product-list');
    const addProductBtn = document.getElementById('add-product-btn');
    const resetChangesBtn = document.getElementById('reset-changes-btn');

    resetChangesBtn.addEventListener('click', function () {
        localStorage.removeItem('products');
        location.reload();
    });

    fetchProducts();

    function fetchProducts() {
        fetch('products.json')
            .then(response => response.json())
            .then(data => {
                data.forEach(product => {
                    const row = createProductRow(product);
                    productList.appendChild(row);
                });
            })
            .catch(error => console.error('Error fetching products:', error));
    }

    function createProductRow(product) {
        const row = document.createElement('tr');
        row.setAttribute('data-id', product.id);

        const idCell = document.createElement('td');
        idCell.textContent = product.id;
        row.appendChild(idCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = product.name;
        row.appendChild(nameCell);

        const priceCell = document.createElement('td');
        priceCell.textContent = `€${product.price}`;
        row.appendChild(priceCell);

        const imageCell = document.createElement('td');
        const image = document.createElement('img');
        image.src = product.image;
        image.alt = product.name;
        imageCell.appendChild(image);
        row.appendChild(imageCell);

        const editCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editProduct(product));
        editCell.appendChild(editButton);
        row.appendChild(editCell);

        const removeCell = document.createElement('td');
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => removeProduct(product));
        removeCell.appendChild(removeButton);
        row.appendChild(removeCell);

        return row;
    }

    function editProduct(product) {
        const editUrl = `edit.html?id=${product.id}&name=${encodeURIComponent(product.name)}&price=${product.price}&image=${encodeURIComponent(product.image)}`;
        window.location.href = editUrl;
    }

    function removeProduct(product) {
        const productId = product.id;
        const productRow = document.querySelector(`tr[data-id="${productId}"]`);
        if (productRow) {
            productRow.remove();
            updateLocalStorage(productId);
        } else {
            console.log(`Product met ID ${productId} niet gevonden.`);
        }
    }

    function updateLocalStorage(updatedProduct) {
        let products = JSON.parse(localStorage.getItem('products')) || [];
        const index = products.findIndex(p => p.id === updatedProduct.id);
        if (index !== -1) {
            products[index] = updatedProduct;
            localStorage.setItem('products', JSON.stringify(products));
            const productRow = document.querySelector(`tr[data-id="${updatedProduct.id}"]`);
            if (productRow) {
                productRow.cells[1].textContent = updatedProduct.name;
                productRow.cells[2].textContent = `€${updatedProduct.price}`;
                productRow.cells[3].querySelector('img').src = updatedProduct.image;
                productRow.cells[3].querySelector('img').alt = updatedProduct.name;
            }
        } else {
            console.error('Product not found:', updatedProduct);
        }
    }
});