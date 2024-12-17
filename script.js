// async function fetchDessertss() {}
// todo: Readme==> implement the arrow func

const fetchDesserts = async () => {
  const response = await fetch('./data.json')
  return response.json()
}

const createDessertItem = (dessert, template) => {
  const dessertItem = template.cloneNode(true)

  const imageContainer = dessertItem.querySelector(
    '.dessert-image-container'
  )

  const mobileMediaQuery = window.matchMedia('(max-width: 374px)')
  const desktopMediaQuery = window.matchMedia('(min-width: 1440px)')

  // Function to update background image based on screen size
  const updateBackgroundImage = () => {
    if (desktopMediaQuery.matches) {
      // Desktop: 1440px and above
      imageContainer.style.backgroundImage = `url(${dessert.image.desktop})`
    } else if (mobileMediaQuery.matches) {
      // Mobile: Below 375px
      imageContainer.style.backgroundImage = `url(${dessert.image.mobile})`
    } else {
      // Tablet: Between 375px and 1439px
      imageContainer.style.backgroundImage = `url(${dessert.image.tablet})`
    }
  }

  // Add listeners for screen size changes using modern addEventListener
  mobileMediaQuery.addEventListener('change', updateBackgroundImage)
  desktopMediaQuery.addEventListener('change', updateBackgroundImage)

  // Initial check
  updateBackgroundImage()

  // todo: talk about the  window.matchMedia() and its importance and necessity here ?
  // imageContainer.style.backgroundImage = `url(${dessert.image.mobile})`

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
