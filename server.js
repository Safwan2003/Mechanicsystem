const express = require("express")
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())


app.use('/api/auth',require('./routes/auth'))
app.use('/api/user',require('./routes/user'))
app.use('/api/admin',require('./routes/admin'))
app.use('/api/mechanic',require('./routes/mechanic'))







const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGOURL)
        console.log('mongodb is connected')
    } catch (error) {
        console.error(error.message)
        process.exit(1);
    }
}
    connectDb();

 const PORT  = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
} )