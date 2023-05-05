const { faker } = require('@faker-js/faker')
const { Product } = require('../models/product')

const generateProducts = (count) => {
  const products = []

  for (let i = 0; i < count; i++) {
    const name = faker.commerce.productName()
    const price = parseFloat(faker.commerce.price())
    const locations = [
      'მთავარი ოფისი',
      'კავეა გალერია',
      'კავეა თბილისი მოლი',
      'კავეა ისთ ფოინთი',
      'კავეა სითი მოლი',
    ]
    const location = locations[Math.floor(Math.random() * locations.length)]
    products.push({ name, price, location })
  }
  return products
}

const seed = async () => {
  try {
    await Product.sync({ force: true })
    const products = generateProducts(300000)
    await Product.bulkCreate(products)
    console.log('Seed completed')
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

seed()
