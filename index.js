const express = require("express");
const cors = require("cors");
require('dotenv').config();
const app = express();

const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

//middleware
app.use(cors());
app.use(express.json());

//mongo


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cmdnp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    //create collection
     const usersCollection = client.db("elpApp1").collection("users");
    
    
    //users get method
    app.get('/users', async (req, res) => {
      const query = {};
      const cursor = usersCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    })

    // get single user
    app.get('/users/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email:email };
      const user = await usersCollection.findOne(query);
      res.send(user);
    })


    //post a user 
    app.post('/users', async (req, res) => {
      const newUser = req.body;
      const result = await usersCollection.insertOne(newUser);
      res.send(result);
    })






  } finally {
    
  }
}

run().catch(console.dir);


client.connect((err) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  // client.close();
});











app.get("/", (req, res) => {
  res.send("Hello I am from Server");
});

app.listen(port, () => {
  console.log("Server is running on port ", port);
});

/**
 userName: elpApp
 pass:  qdcx9pVq4KFL012W
 */
