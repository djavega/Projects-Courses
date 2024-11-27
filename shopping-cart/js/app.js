//Global variables
const $shoppingList = document.querySelector('#lista-carrito tbody')
let articles = []

loadEventListeners()
function loadEventListeners() {
    document.addEventListener('DOMContentLoaded', () => {
        articles = JSON.parse(localStorage.getItem('carrito')) || []
        createShoppingCartHTML()
    })
    //Add to shopping cart
    document.querySelectorAll('.agregar-carrito').forEach((btn, _) => {
        btn.addEventListener('click', (event) => addToCart(event, btn));
    });

    //Remove from shopping cart
    document.querySelector('#carrito').addEventListener('click', (event) => removeFromCart(event));

    //Remove all articles from shopping cart
    document.querySelector('#vaciar-carrito').addEventListener('click', (event) => removeAllFromCart(event));
}

function removeAllFromCart(event) {
    event.preventDefault()
    articles = []
    createShoppingCartHTML()
}

function removeFromCart(event) {
    event.preventDefault()
    if (event.target.classList.contains('borrar-curso')) {
        console.log('Removing from cart...')
        const id = event.target.getAttribute('data-id')
        const index = articles.findIndex(a => a.id === id)
        if (articles[index].quantity === 1)
            articles = articles.filter(a => a.id !== id)
        else {
            articles[index].quantity -= 1
        }
        createShoppingCartHTML()
    }
}

function addToCart(event, btn) {
    console.log('Adding to cart...')
    event.preventDefault()
    // Find the Card element which contains all the data we need
    const selectedCard = btn.closest('.card')
    const id = btn.getAttribute('data-id')

    //Create the course to display it in the cart
    const course = createCourse(id, selectedCard)

    //Check if the course is already in the articles
    const iDuplicated = articles.findIndex(a => a.id === course.id);
    if (iDuplicated > -1) {
        //Update the article
        console.log(articles[iDuplicated])
        articles[iDuplicated].quantity += 1
        articles = [...articles]
    } else {
        //Add the course to the articles
        articles = [...articles, course]
    }

    //Create DOM elements to display it in the shopping cart table
    createShoppingCartHTML()
}

function cleanShoppingCart() {
    while ($shoppingList.firstChild) {
        $shoppingList.removeChild($shoppingList.firstChild)
    }
}

function sincronizeLocalStorage (articles) {
    localStorage.setItem('carrito', JSON.stringify(articles))
}

function createShoppingCartHTML() {
    sincronizeLocalStorage(articles)
    //Clean the previous articles
    cleanShoppingCart()

    //Generate HTML
    articles.forEach(a => {
        const { id, img, info, price, quantity } = a
        const row = document.createElement('tr')
        row.innerHTML = `
        <td>
            <img src="${img}"/>
        </td>
        <td>${info}</td>
        <td>${price}</td>
        <td>${quantity}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
        `;
        $shoppingList.appendChild(row)
    })
}
function createCourse(id, card) {
    return {
        id: id,
        img: card.querySelector('.imagen-curso').getAttribute('src'),
        info: card.querySelector('.info-card').querySelector('h4').textContent,
        price: card.querySelector('.precio').querySelector('span').textContent,
        quantity: 1
    }
}
