import formatCurrency from "./util/formatCurrency"
import items from './items.json'

let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []
const cartItemContainer = document.querySelector('[data-cart-item-container]')
const cartItemList = document.querySelector('[data-cart-item-list]')
const cartWrapper = document.querySelector('[data-cart-wrapper]')
const cartPrice = document.querySelector('[data-cart-price]')
const itemCount = document.querySelector('[data-cart-count]')
const cartButton = document.querySelector('[data-cart-button]')
const IMAGE_URL = 'https://dummyimage.com/210x130'
let totalPrice = 0;

export default function setupCart() {
  renderCart()
}

function renderCart() {
  if (cartItems.length < 1) {
    cartWrapper.classList.add('invisible')
  } else {
    cartWrapper.classList.remove('invisible')
    cartItemList.innerHTML = ''
    totalPrice = 0
    cartItems.forEach(renderCartItems)

    itemCount.innerHTML = cartItems.reduce((total, current) => total + parseInt(current.amount), 0)
    cartPrice.innerHTML = formatCurrency(totalPrice / 100)
  }
}

function renderCartItems(cartItem) {
  const clone = cartItemTemplate.content.cloneNode(true)

  const item = items.find(item => item.id == cartItem.id)
  
  const container = clone.querySelector("[data-item-container]")
  container.dataset.itemId = item.id

  const image = clone.querySelector("[data-image]")
  image.src = `${IMAGE_URL}/${item.imageColor}/${item.imageColor}`

  const name = clone.querySelector("[data-name]")
  name.innerHTML = item.name

  if (cartItem.amount > 1) {
    const amount = clone.querySelector("[data-amount]")
    amount.innerHTML = `x${cartItem.amount}`
  }

  const price = clone.querySelector("[data-price]")
  price.innerHTML = formatCurrency((item.priceCents * cartItem.amount) / 100)

  totalPrice += item.priceCents * cartItem.amount

  cartItemList.append(clone);
}


function removeCartItem(e) {
  if (!e.target.matches('[data-remove-from-cart-button]')) return

  const container = e.target.closest('[data-item-container]')
  const itemId = parseInt(container.dataset.itemId)

  const item = cartItems.find(item => item.id === itemId)
  if (item.amount > 1) {
    item.amount--
  } else {
    cartItems = cartItems.filter(item => item.id !== itemId)
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems))
  renderCart()
}

function addToCart(itemId) {
  const cartItem = cartItems.find(item => item.id === itemId)
  if (!cartItem) {
    cartItems.push({id: itemId, amount: 1})
  } else {
    cartItem.amount++
  }
  
  localStorage.setItem('cartItems', JSON.stringify(cartItems))
  renderCart()
}

function toggleCart() {
  cartItemContainer.classList.toggle('invisible')
}

cartWrapper.addEventListener('click', removeCartItem)
cartButton.addEventListener('click', toggleCart)



export { addToCart }
