// const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

// Connection URL and Database Name
const url = 'mongodb+srv://user1:Zr1C2kw5xMRiN58I@cluster0.y39my.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0s';

// const dbName = 'yourDatabase';

// Create a new MongoClient
// const client = new MongoClient(url,{useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,});


async function connectToDatabase() {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        // const test = await client.connect();
        console.log('Connected successfully to MongoDB');
        //return client.db(); // Return the database object
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

module.exports = connectToDatabase;
