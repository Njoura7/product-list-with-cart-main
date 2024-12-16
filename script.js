// async function fetchDessertss() {}
// todo: Readme==> implement the arrow func

const fetchDesserts = async () => {
  const response = await fetch('./data.json')
  return response.json()
}

const createDessertItem = (dessert, template) => {
  const dessertItem = template.cloneNode(true)

  dessertItem.querySelector('.dessert-image').src = dessert.image.desktop
  dessertItem.querySelector('.dessert-image').alt = dessert.image.name
  dessertItem.querySelector('.dessert-category').textContent =
    dessert.category
  dessertItem.querySelector('.dessert-name').textContent = dessert.name
  dessertItem.querySelector(
    '.dessert-price'
  ).textContent = `${dessert.price.toFixed(2)}`

  return dessertItem
}

// Main function to display desserts

const displayDesserts = async () => {
  const dessertList = document.querySelector('.dessert-list')
  const dessertTemplate = document.querySelector('.dessert-item')

  try {
    const desserts = await fetchDesserts()
    dessertList.innerHTML = ''
    desserts.forEach((dessert) => {
      const dessertItem = createDessertItem(dessert, dessertTemplate)
      dessertList.appendChild(dessertItem)
    })
  } catch (error) {
    console.error('Error loading desserts', error)
    dessertList.innerHTML = '<p> Failed to load desserts </p>'
  }
}

document.addEventListener('DOMContentLoaded', displayDesserts)
