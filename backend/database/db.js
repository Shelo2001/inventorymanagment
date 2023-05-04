const { Sequelize } = require('sequelize')
const { Product } = require('../models/product')

const models = {
  Product,
}

// Load the models and set up the associations
Object.values(models)
  .filter((model) => typeof model.associate === 'function')
  .forEach((model) => model.associate(models))

module.exports = {
  models,
}
