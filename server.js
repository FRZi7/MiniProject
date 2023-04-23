const express = require("express")
const app = express()
require('dotenv').config()
const dbConfig = require('./config/dbconfig')
app.use(express.json())
const port = process.env.PORT || 5000
const userRoute = require('./routes/userroute')


app.use('/api/user',userRoute)
app.listen(port, ()=> console.log(`"npm run dev"the port is ${port}`))