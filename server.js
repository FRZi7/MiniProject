const express = require("express")
const app = express()
const cors = require("cors")
require('dotenv').config()
const dbConfig = require('./config/dbconfig')
app.use(express.json())
const port = process.env.PORT || 5000
const userRoute = require('./routes/userroute')
const adminRoute = require("./routes/adminroute")


app.use(cors({
    credentials:true,
    origin:["https://localhost:3000"]
}))

app.use('/api/user',userRoute)
app.use('/api/admin',adminRoute)
app.listen(port, ()=> console.log(`"npm run dev"the port is ${port}`))