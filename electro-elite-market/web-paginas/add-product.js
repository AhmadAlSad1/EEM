document.addEventListener('DOMContentLoaded', function () {
    const addProductForm = document.getElementById('add-product-form');
    const addProductBtn = document.getElementById('add-product-btn');

    addProductBtn.addEventListener('click', function () {
        const productName = document.getElementById('product-name').value;
        const productPrice = parseFloat(document.getElementById('product-price').value);
        const productImage = document.getElementById('product-image').value;

        if (productName && !isNaN(productPrice) && productImage) {
            const newProduct = {
                id: generateProductId(),
                name: productName,
                price: productPrice,
                image: productImage
            };

            addNewProduct(newProduct);

            clearFormFields();
        } else {
            alert('Fill in all fields to add the product.');
        }
    });

    function clearFormFields() {
        document.getElementById('product-name').value = '';
        document.getElementById('product-price').value = '';
        document.getElementById('product-image').value = '';
    }

    function addNewProduct(product) {
        const productList = document.getElementById('product-list');
        const row = createProductRow(product);
        productList.appendChild(row);
    }

    function createProductRow(product) {
        const row = document.createElement('tr');

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
        editCell.appendChild(editButton);
        row.appendChild(editCell);

        const removeCell = document.createElement('td');
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeCell.appendChild(removeButton);
        row.appendChild(removeCell);

        return row;
    }
});