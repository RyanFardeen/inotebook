const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors') 
require('dotenv').config()

connectToMongo()
const app = express()


app.use(cors())
app.use(express.json())

// Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

if(process.env.NODE_ENV === 'production'){
     
}


app.listen( process.env.PORT || 5000, () => {
  console.log(`iNotebook backend listening on port`)
})