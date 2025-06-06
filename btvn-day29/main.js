const getProducts = async () => {
    const response = await fetch('https://fakestoreapi.com/products')
    return await response.json()
}
const main = async () => {
    const products = await getProducts()
    renderProducts(products);
    console.log(products)
}
main()
const renderProducts = (products) => {
    const container = document.querySelector('.container')

    products.forEach(product => {
        const productsCard = document.createElement('div')
        productsCard.className = 'product-card'

        // tao img

        const img = document.createElement('img')
        img.src = product.image

        // tao title

        const h3 = document.createElement('h3')
        h3.className = 'title'
        h3.textContent = product.title

        //tao price
        const price = document.createElement('p')
        price.className = 'price'
        price.textContent = `$${product.price}`

        // tao description
        const description = document.createElement('p')
        description.className = 'description'
        description.textContent = product.description

        //tao category
        const category = document.createElement('i')
        category.className = 'category'
        category.textContent = `Category: ${product.category}`

        // tao rating

        const rating = document.createElement('p')
        rating.className = 'rating'
        rating.textContent = `Rating: ⭐ ${product.rating.rate} (${product.rating.count} review)`

        // them phan tu vao productsCard
        productsCard.appendChild(img)
        productsCard.appendChild(h3)
        productsCard.appendChild(price)
        productsCard.appendChild(description)
        productsCard.appendChild(category)
        productsCard.appendChild(rating)

        // them phan tu vao container
        container.appendChild(productsCard)

    })


}