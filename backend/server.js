const express = require('express')
const app = express()
const cors = require('cors')
const { sequelize } = require('./models/product')
const productRoutes = require('./routes/productRoutes')

app.use(cors())
app.use(express.json())

app.use('/inventories', productRoutes)

sequelize.sync()

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
