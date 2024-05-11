document.addEventListener('DOMContentLoaded', function () {
    const editProductForm = document.getElementById('edit-product-form');

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const productName = urlParams.get('name');
    const productPrice = parseFloat(urlParams.get('price')).toFixed(2);
    const productImage = urlParams.get('image');

    document.getElementById('name').value = productName;
    document.getElementById('price').value = productPrice;
    document.getElementById('image').value = productImage;

    editProductForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const editedName = document.getElementById('name').value;
        const editedPrice = document.getElementById('price').value;
        const editedImage = document.getElementById('image').value;

        const updatedProduct = {
            id: productId,
            name: editedName,
            price: editedPrice,
            image: editedImage
        };

        saveUpdatedProduct(updatedProduct);

        window.location.href = 'products-admin.html';
    });
});

function saveUpdatedProduct(product) {
    let products = JSON.parse(localStorage.getItem('products')) || [];

    const index = products.findIndex(p => p.id === product.id);
    if (index !== -1) {
        products[index] = product;
    } else {
        console.error('Product not found:', product);
        return;
    }

    localStorage.setItem('products', JSON.stringify(products));

    console.log('Product updated:', product);
}