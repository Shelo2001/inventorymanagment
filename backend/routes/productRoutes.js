const express = require('express')
const router = express.Router()

const {
  getProducts,
  createProduct,
  deleteProductById,
} = require('../controllers/productController')

router.get('/', getProducts)
router.post('/', createProduct)
router.delete('/:inventoryId', deleteProductById)

module.exports = router
