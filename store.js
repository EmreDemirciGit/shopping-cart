import items from './items.json'
import formatCurrency from './util/formatCurrency'
import { addToCart } from './cart.js'

const IMAGE_URL = "https://dummyimage.com/420x260/"
const storeItemTemplate = document.querySelector('#storeItemTemplate')
const storeItemContainer = document.querySelector('[data-store-container]')

export default function setupStore() {
  console.log(storeItemContainer)
  if (storeItemContainer == null) return

  storeItemContainer.addEventListener('click', addItemToCart)

  items.forEach(renderStoreItem)
}

function renderStoreItem(item) {
  const clone = storeItemTemplate.content.cloneNode(true)
  
  const container = clone.querySelector("[data-item-container]")
  container.dataset.itemId = item.id

  const image = clone.querySelector("[data-image]")
  image.src = `${IMAGE_URL}/${item.imageColor}/${item.imageColor}`

  const category = clone.querySelector("[data-category]")
  category.innerHTML = item.category

  const name = clone.querySelector("[data-name]")
  name.innerHTML = item.name

  const price = clone.querySelector("[data-price]")
  price.innerHTML = formatCurrency(item.priceCents / 100)

  storeItemContainer.append(clone);
}

function addItemToCart(e) {
  if (!e.target.matches('[data-add-to-cart-button]')) return

  const container = e.target.closest('[data-item-container]')
  const itemId = parseInt(container.dataset.itemId)

  addToCart(itemId)
}

