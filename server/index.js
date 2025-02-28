const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')



const port = process.env.PORT || 5000


const app = express()


//Middleware Start
const corsOptions = {
    origin: [ 'http://localhost:5173', 'http://localhost:5174' ],
    credentials: true,
    optionSuccessStatus: 200,
}



app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

// Verify JWT Middleware



//Middleware End


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.b9e8y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
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

    const servicesCollection = client.db('Sidegurus').collection('services')
    const eventsCollection = client.db('Sidegurus').collection('events')
    const categoriesCollection = client.db('Sidegurus').collection('categories')
    const locationsCollection = client.db('Sidegurus').collection('locations')
 
 

// Categories API Start
// Get API Categories

app.get("/categories", async(req, res)=>{
  const result = await categoriesCollection.find().toArray();
  res.send(result)
})


// Get An Category  by Id

app.get("/category/:id", async(req, res)=>{
  const id = req.params.id;
 
  const result = await categoriesCollection.findOne({_id : new ObjectId(id)});
  res.send(result)
})






// Categories API End




// Locations API Start
// Get API Locations

app.get("/locations", async(req, res)=>{
  const result = await locationsCollection.find().toArray();
  res.send(result)
})

// Get An Category  by Id

app.get("/location/:id", async(req, res)=>{
  const id = req.params.id
  const result = await locationsCollection.findOne({_id : new ObjectId(parseInt(id))});
  res.send(result)
})

// Locations API End




// Services API Starts

// Get API Services

    app.get("/services", async(req, res)=>{
        const result = await servicesCollection.find().toArray();
        res.send(result)
    })


// Get An Specific Service by Id

    app.get("/service/:id", async(req, res)=>{
        const id = req.params.id
        const result = await servicesCollection.findOne({_id : new ObjectId(id)});
        res.send(result)
    })


// Get An Specific Services Posted by a user by user email

    app.get("/services/:email",  async(req, res)=>{
      const email = req.params.email
      
      const result = await servicesCollection.find({'author.email' : email}).toArray();
      res.send(result)
    })



     
// // Get all jobs data from db for pagination
// app.get('/all-jobs', async (req, res) => {
//   const size = parseInt(req.query.size)
//   const page = parseInt(req.query.page) - 1
//   const filter = req.query.filter
//   const sort = req.query.sort
//   const search = req.query.search
//   console.log(size, page)

//   let query = {
//     job_title: { $regex: search, $options: 'i' },
//   }
//   if (filter) query.category = filter
//   let options = {}
//   if (sort) options = { sort: { deadline: sort === 'asc' ? 1 : -1 } }
//   const result = await jobsCollection
//     .find(query, options)
//     .skip(page * size)
//     .limit(size)
//     .toArray()

//   res.send(result)
// })

app.get("/servicesbycategory", async (req, res) => {
  try {
    const { category } = req.query; // Corrected destructuring
    console.log("Category filter:", category);

    let query = {};

    if (category) {
      query.category = category; // Match category exactly
    }

    const services = await servicesCollection.find(query).toArray();
    
    res.json(services);
  } catch (error) {
    console.error("Error fetching services by category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



// Post API Services

app.post("/services", async(req, res)=>{
  const newService = req.body;
  const result = await servicesCollection.insertOne(newService)
  res.send(result)
})

// Put API Services

app.put("/service-update/:id", async(req, res)=>{
  const id = req.params.id
  const updatedService = req.body;
  const result = await servicesCollection.updateOne({_id : new ObjectId(id)}, {$set : updatedService},{ upsert: true });
  res.send(result)
})


// Delete API Services

app.delete("/service/:id", async(req, res)=>{
  const id = req.params.id
  const result = await servicesCollection.deleteOne({_id : new ObjectId(id)});
  res.send(result)
})




// Services API Ends








// Events API Starts

// Get API Events

app.get("/events", async(req, res)=>{
  const result = await eventsCollection.find().toArray();
  res.send(result)
})


// Get An Specific Event by Id

app.get("/event/:id", async(req, res)=>{
  const id = req.params.id
  const result = await eventsCollection.findOne({_id : new ObjectId(id)});
  res.send(result)
})

// Get An Specific Events Posted by a user by user email

app.get("/events/:email",  async(req, res)=>{
const tokenEmail = req.user.email
const email = req.params.email;
if(tokenEmail !== email){
  return res.status(403).send({message: "Forbidden Access"})
}
const result = await eventsCollection.find({'buyer.email' : email}).toArray();
res.send(result)
})

// Post API Events

app.post("/events", async(req, res)=>{
  const newService = req.body;
  const result = await eventsCollection.insertOne(newService)
  res.send(result)
})

// Put API Events

app.put("/event-update/:id", async(req, res)=>{
  const id = req.params.id
  const updatedEvent = req.body;
  const result = await eventsCollection.updateOne({_id : new ObjectId(id)}, {$set : updatedEvent},{ upsert: true });
  res.send(result)
})


// Delete API Events

app.delete("/event/:id", async(req, res)=>{
  const id = req.params.id
  const result = await eventsCollection.deleteOne({_id : new ObjectId(id)});
  res.send(result)
})



// Events API Ends








    // await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
























app.get("/", (req, res)=>{
    res.send("Hello from SideGurus Server")
})

app.listen(port, ()=>console.log(`Server is listening on port ${port}`))


