const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = 5000;

// starAgencyDb
// GWGKk2ffobNpSUbt

// MIDDLEWARE
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pgkyz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



async function run(){
    try{
        await client.connect();
        const database = client.db('star_travel_agency');
        const servicesCollection = database.collection('services');

        //GET API
        app.get('/services', async(req, res)=> {
            const cursor = servicesCollection.find({});
            const services = await cursor.toArray();
            res.send(services);
            console.log('hitting the servises')
        })

        //GET SINGLE API
        app.get('/services/:id', async(req, res)=> {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const service = await servicesCollection.findOne(query);
            res.json(service)
        })
    }
    finally{
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res)=> {
    res.send('This is my Start Travel Agency Server');
});

app.listen(port, ()=>{
    console.log('listing the port', port)
})