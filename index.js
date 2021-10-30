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
        const orderCollection = database.collection('orders')

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

        // GET ORDERS API
        app.get('/orders', async(req, res)=>{
            const cursor = orderCollection.find({});
            const orders = await cursor.toArray();
            res.send(orders)
            console.log('hitting the orders')
        })

        // GET SINGLE API
        app.get('/orders/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const order = await orderCollection.findOne(query);
            res.json(order)
            console.log('hitting the single order', order)
        })

        //POST ORDER API
        app.post('/orders', async(req, res)=> {
            const order = req.body;
            const result = await orderCollection.insertOne(order);
            res.json(result)
        })

        // DELETE API
        app.delete('/orders/:id', async(req, res)=> {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await orderCollection.deleteMany(query);
            console.log('deleting result id', result)
            res.json(result)
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