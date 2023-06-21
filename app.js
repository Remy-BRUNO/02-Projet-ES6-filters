import { products } from "./products.js"
let filteredProducts = [...products]

const container = document.querySelector(".products-container")
const btns = document.querySelector(".companies")
const form = document.querySelector(".input-form")
const input = document.querySelector(".search-input")

// articles
const displayProducts = (product) => {
  const newArticle = product.map((item) => {
    const { title, image, price } = item

    return `
  <article class="product">
    <img src="${image} " alt="${title}" class="product-img img" />
    <footer>
      <h5 class="product-name">${title}</h5>
      <span class="product-price">${price} </span>
    </footer>
  </article>
      `
  })
  container.innerHTML = newArticle.join("")
}
displayProducts(filteredProducts)

// buttons
const displayButtons = () => {
  const btn = ["All", ...new Set(products.map((product) => product.company))]
  btns.innerHTML = btn
    .map((company) => {
      return `
    <button class="company-btn">${company}</button>
    `
    })
    .join("")
}
displayButtons()

btns.addEventListener("click", (e) => {
  const targ = e.target

  if (targ.textContent === "All") {
    displayProducts(filteredProducts)
  } else {
    const result = filteredProducts.filter(
      (r) => r.company === targ.textContent
    )
    displayProducts(result)
  }
  input.value = ""
})

// search
form.addEventListener("keyup", () => {
  const inputValue = input.value.toLowerCase()
  const result = filteredProducts.filter((r) =>
    r.title.toLowerCase().includes(inputValue)
  )
  displayProducts(result)
  if (!result.length) {
    container.textContent = "Sorry, no products matched your search"
  }
})
