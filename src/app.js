const express = require('express')
const port = process.env.PORT
const userRouter = require('./routers/user')
const wishRouter = require('./routers/wish')
require('./db/db')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(wishRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})