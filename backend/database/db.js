const { Sequelize } = require('sequelize')
const { Product } = require('../models/product')

const sequelize = new Sequelize('db', 'postgres', 'postgres', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
})

const models = {
  Product,
}

// Load the models and set up the associations
Object.values(models)
  .filter((model) => typeof model.associate === 'function')
  .forEach((model) => model.associate(models))

module.exports = {
  sequelize,
  models,
}
