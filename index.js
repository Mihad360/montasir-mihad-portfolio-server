const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster20.1jwh8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster20`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const projectsCollection = client.db("portfolioDB").collection("projects");
    const projectCarouselCollection = client
      .db("portfolioDB")
      .collection("project-carousel");

    app.get("/projects", async (req, res) => {
      const result = await projectsCollection.find().toArray();
      res.send(result);
    });

    app.get("/project-carousel", async (req, res) => {
      const result = await projectCarouselCollection.find().toArray();
      res.send(result);
    });

    app.post("/projects", async (req, res) => {
      const project = req.body;
      const result = await projectsCollection.insertOne(project);
      res.send(result);
    });

    app.post("/project-carousel", async (req, res) => {
      const carousel = req.body;
      const result = await projectCarouselCollection.insertOne(carousel);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send(`boss is running`);
});

app.listen(port, (req, res) => {
  console.log(`boss is running on port: ${port}`);
});
