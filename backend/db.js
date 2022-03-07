const mongoose = require('mongoose');
//GobmkjOA1H7mr0rx

const mongoURI = "mongodb+srv://ryan:GobmkjOA1H7mr0rx@cluster0.bqacc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected to Mongo Successfully")
    })
}

module.exports = connectToMongo