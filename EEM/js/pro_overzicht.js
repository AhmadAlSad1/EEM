let title = document.getElementById('title');
let price = document.getElementById('price');
let url = document.getElementById('url');
let count = document.getElementById('count');
let submit = document.getElementById('submit');
let resetButton = document.getElementById('resetButton');

let mood = 'create';
let tmp;
let dataProduct = [];

document.addEventListener('DOMContentLoaded', (event) => {
    if (localStorage.product != null) {
        dataProduct = JSON.parse(localStorage.product);
    } else {
        fetchJSONData().then(initialData => {
            dataProduct = initialData;
            localStorage.setItem('product', JSON.stringify(dataProduct));
        });
    }
    showData();
});

submit.onclick = function () {
    let newProduct = {
        title: title.value,
        price: price.value,
        url: url.value,
        count: count.value,
    };

    if (title.value != '' && price.value != '' && url.value != '' && newProduct.count < 100) {
        if (mood === 'create') {
            if (newProduct.count > 1) {
                for (let i = 0; i < newProduct.count; i++) {
                    dataProduct.push(newProduct);
                }
            } else {
                dataProduct.push(newProduct);
            }
        } else {
            dataProduct[tmp] = newProduct;
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }
        clearData();
    }

    localStorage.setItem('product', JSON.stringify(dataProduct));
    showData();
    clearData();
};

function clearData() {
    title.value = '';
    price.value = '';
    url.value = '';
    count.value = '';
}

function showData() {
    let table = '';
    for (let i = 0; i < dataProduct.length; i++) {
        table += `
        <tr>
            <td>${i}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].url}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
        `;
    }

    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if (dataProduct.length > 0) {
        btnDelete.innerHTML = `<button onclick="deleteAll()">Delete All (${dataProduct.length})</button>`;
    } else {
        btnDelete.innerHTML = '';
    }
}

function deleteData(i) {
    dataProduct.splice(i, 1);
    localStorage.setItem('product', JSON.stringify(dataProduct));
    showData();
}

function deleteAll() {
    dataProduct = [];
    localStorage.setItem('product', JSON.stringify(dataProduct));
    showData();
}

function updateData(i) {
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    url.value = dataProduct[i].url;
    count.style.display = 'none';
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth',
    });
}

resetButton.onclick = function () {
    localStorage.clear();
    fetchJSONData().then(initialData => {
        dataProduct = initialData;
        localStorage.setItem('product', JSON.stringify(dataProduct));
        showData();
    });
};

async function fetchJSONData() {
    try {
        const response = await fetch('../json/products.json');
        const data = await response.json();
        return data.map(item => ({
            title: item.name,
            price: item.price,
            url: item.image,
            count: 1
        }));
    } catch (error) {
        console.error('Error fetching JSON data:', error);
        return [];
    }
}

showData();