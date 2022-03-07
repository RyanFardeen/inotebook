const mongoose = require('mongoose');


const mongoURI = "mongodb+srv://ryan:allahallah001@cluster0.pbjlw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected to Mongo Successfully")
    })
}

module.exports = connectToMongo