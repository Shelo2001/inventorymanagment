const { where } = require('sequelize')
const { Product } = require('../models/product')

const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll()
    res.json({ products })
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
