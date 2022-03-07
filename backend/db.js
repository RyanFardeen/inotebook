const mongoose = require('mongoose');
//RtzAUFcNsy2U20zd

const mongoURI = "mongodb+srv://ryanfardeen:RtzAUFcNsy2U20zd@cluster0.pbjlw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected to Mongo Successfully")
    })
}

module.exports = connectToMongo