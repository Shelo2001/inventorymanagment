const { where } = require('sequelize')
const { Product } = require('../models/product')

const getProducts = async (req, res) => {
  const page = parseInt(req.query.page || 1)
  const priceSort = req.query.pricesort
  const location = req.query.location
  const offset = (page - 1) * 20

  try {
    let order = [['name', 'ASC']]
    if (priceSort === 'asc') {
      order = [['price', 'ASC']]
    } else if (priceSort === 'desc') {
      order = [['price', 'DESC']]
    }

    if (location) {
      products = await Product.findAndCountAll({
        where: {
          location: location,
        },
        limit: 20,
        offset: offset,
        order: order,
      })
    } else {
      products = await Product.findAndCountAll({
        limit: 20,
        offset: offset,
        order: order,
      })
    }

    const totalCount = products.count
    const totalPages = Math.ceil(totalCount / 20)

    res.json({
      products: products.rows,
      currentPage: page,
      totalPages: totalPages,
      totalCount: totalCount,
    })
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
}

const createProduct = async (req, res) => {
  try {
    const { name, price, location } = req.body
    const product = await Product.create({
      name,
      price,
      location,
    })
    res.status(201).json(product)
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
}

const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findOne({ where: { id } })
    if (!product) {
      return res.json({ message: 'Product not found' })
    }
    await product.destroy()
    return res.json({ message: 'Product deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
}

module.exports = { getProducts, createProduct, deleteProductById }
