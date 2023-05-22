const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = 8585;

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("ki obostha borther")
})


const uri = "mongodb+srv://imran:WwASr3PGwWkjXK3H@cluster0.darcm8e.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        const dataBase = client.db("coffee_items").collection("coffee");

        app.post("/add_coffee", async(req, res) => {
            const coffeeData = req.body;
            const result = await dataBase.insertOne(coffeeData)
            res.send(result)
        });

        app.get("/coffee", async(req, res) => {
            const dataFromDataBase = dataBase.find();
            const result = await dataFromDataBase.toArray();
            res.send(result)
        })

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch((respnonce) => {
    console.log(respnonce);
});



app.listen(port, () => {
    console.log(`your server is running on this ${port}`)
})
