const { default: mongoose } = require('mongoose');
const mongooose = require('mongoose')

const connect = mongooose.connect(process.env.MONGO_URL)

const connection = mongooose.connection

connection.on("connected",()=>{
    console.log("mongoDB is sucessfully connected");
})

connection.error("error",(error)=>{
    console.log("mongo DB connection error",error);
})

module.export = mongoose