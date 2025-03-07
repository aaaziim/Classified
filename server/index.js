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

    const profileCollection = client.db('Sidegurus').collection('profiles')
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




app.get("/singlecategory", async (req, res) => {
  try {
    const { category } = req.query;
    console.log("Category received from query:", category); // Log category received
    
    if (!category) {
      return res.status(400).json({ error: "Category query parameter is missing" });
    }

    // Query to search the category name
    let query = { name: { $regex: category, $options: "i" } }; // Case-insensitive search for category name
    console.log("MongoDB query:", query); // Log the query object used for DB lookup
    
    const cat = await categoriesCollection.findOne(query);
    
    if (!cat) {
      console.log("No category found matching query.");
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(cat); // Send the result to the frontend
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});





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
  const result = await locationsCollection.
  findOne({_id : new ObjectId(id)});
  res.send(result)
})


app.get("/country/:slug", async (req, res) => {
  const slug = req.params.slug; // Get the slug from the request parameters

  try {
    const result = await locationsCollection.findOne({ slug: slug }); // Find the location by slug
    
    if (!result) {
      return res.status(404).json({ error: "Location not found" });
    }

    res.send(result); // Send the result as a response
  } catch (error) {
    console.error("Error fetching location:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Locations API End





// Services API Starts

// Get API Services

app.get("/services", async(req, res) => {
  let { page, limit } = req.query;
  page = parseInt(page) || 1; // Default to page 1
  limit = parseInt(limit) || 10; // Default limit

  const skip = (page - 1) * limit;

  const result = await servicesCollection.find().skip(skip).limit(limit).toArray();
  const totalServices = await servicesCollection.countDocuments(); // Count all documents

  res.send({
      services: result,
      totalPages: Math.ceil(totalServices / limit), // Calculate total pages
  });
});


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



 
app.get("/servicesbycategory", async (req, res) => {
  try {
    const { category } = req.query; // Corrected destructuring
    let { page, limit } = req.query;
    page = parseInt(page) || 1; // Default to page 1
    limit = parseInt(limit) || 10; // Default limit
  
    const skip = (page - 1) * limit;

    let query = {};

    if (category) {
      query.category = category; // Match category exactly
    }

    const services = await servicesCollection.find(query).skip(skip).limit(limit).toArray();
    const totalServices = await servicesCollection.countDocuments(query); // Count all documents

    res.send({
        services: services,
        totalPages: Math.ceil(totalServices / limit), // Calculate total pages
    });
    
  } catch (error) {
    console.error("Error fetching services by category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



app.get("/servicesbysubcategory", async (req, res) => {
  try {
    const { subcategory, category } = req.query; // Get parameters
    let { page, limit } = req.query;
    page = parseInt(page) || 1; // Default to page 1
    limit = parseInt(limit) || 10; // Default limit
  
    const skip = (page - 1) * limit;

    let query = {};

    if (category) {
      query.category = category;
    }
    if (subcategory) {
      query.subcategory = subcategory; // Ensures filtering works even if only subcategory is selected
    }

    const services = await servicesCollection.find(query).skip(skip).limit(limit).toArray();
    const totalServices = await servicesCollection.countDocuments(query); // Count all documents

    res.send({
        services: services,
        totalPages: Math.ceil(totalServices / limit), // Calculate total pages
    });
  } catch (error) {
    console.error("Error fetching services by subcategory:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



app.get("/servicesbycountry", async (req, res) => {
  try {
    const { country } = req.query; // Corrected destructuring
    let { page, limit } = req.query;
  page = parseInt(page) || 1; // Default to page 1
  limit = parseInt(limit) || 10; // Default limit

  const skip = (page - 1) * limit;

 

    let query = {};

    if (country) {
      query.country = country; // Match country exactly
    }

    const services = await servicesCollection.find(query).skip(skip).limit(limit).toArray();
    
    const totalServices = await servicesCollection.countDocuments(query);
    res.send({
        services: services,
        totalPages: Math.ceil(totalServices / limit), // Calculate total pages
    });
  } catch (error) {
    console.error("Error fetching services by country:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/servicesbystate", async (req, res) => {
  try {
    const { state } = req.query; // Corrected destructuring
    let { page, limit } = req.query;
    page = parseInt(page) || 1; // Default to page 1
    limit = parseInt(limit) || 10; // Default limit
  
    const skip = (page - 1) * limit;
  

    let query = {};

    if (state) {
      query.state = state; // Match state exactly
    }

    const services = await servicesCollection.find(query).skip(skip).limit(limit).toArray();
    const totalServices = await servicesCollection.countDocuments(query);
    res.send({
      services: services,
      totalPages: Math.ceil(totalServices / limit), // Calculate total pages
  });
  } catch (error) {
    console.error("Error fetching services by state:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



app.get("/servicesbycity", async (req, res) => {
  try {
    const { city } = req.query; // Corrected destructuring
    console.log("city filter:", city);

    let query = {};

    if (city) {
      query.city = city; // Match city exactly
    }

    const services = await servicesCollection.find(query).toArray();
    
    res.json(services);
  } catch (error) {
    console.error("Error fetching services by city:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

 



app.get("/servicesbyfilter", async (req, res) => {
  try {
    // Destructuring query parameters, with default value for `sort`
    const { searchtext, category, subcategory, country, state, city, page = 1, limit = 10, sort = 'title' } = req.query;

    const pageNumber = parseInt(page); // Page number
    const limitNumber = parseInt(limit); // Limit per page
    const skip = (pageNumber - 1) * limitNumber; // Calculate the number of documents to skip

    let query = {};

    // Apply filters only if they have a value
    if (category) query.category = category;
    if (subcategory) query.subcategory = subcategory;
    if (country) query.country = country;
    if (state) query.state = state;
    if (city) query.city = city;
    if (searchtext) query.title = { $regex: searchtext, $options: "i" };

    console.log("Final query:", query); // Log the constructed query

    let options = {
      sort: { [sort]: 1 }, // Ascending order by default
    };

    // Fetch services with pagination
    const services = await servicesCollection.find(query, options).skip(skip).limit(limitNumber).toArray();
    
    // Fetch total count for pagination
    const totalServices = await servicesCollection.countDocuments(query);

    // Send response with services and pagination info
    res.json({
      services: services,
      totalPages: Math.ceil(totalServices / limitNumber), // Calculate total pages
      currentPage: pageNumber,
      totalServices: totalServices,
    });
  } catch (error) {
    console.error("Error fetching services by filter:", error);
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
  let { page, limit } = req.query;
  page = parseInt(page) || 1; // Default to page 1
  limit = parseInt(limit) || 10; // Default limit

  const skip = (page - 1) * limit;
  const result = await eventsCollection.find().skip(skip).limit(limit).toArray();
  const totalEvents = await eventsCollection.countDocuments();
  res.send({
    events: result,
    totalPages: Math.ceil(totalEvents / limit), // Calculate total pages
});
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






app.get("/eventsbycategory", async (req, res) => {
  try {
    const { category } = req.query; // Corrected destructuring
    let { page, limit } = req.query;
    page = parseInt(page) || 1; // Default to page 1
    limit = parseInt(limit) || 10; // Default limit
  
    const skip = (page - 1) * limit;

    let query = {};

    if (category) {
      query.category = category; // Match category exactly
    }

    const events = await eventsCollection.find(query).skip(skip).limit(limit).toArray();
    const totalEvents = await eventsCollection.countDocuments(query);
  res.send({
    events: events,
    totalPages: Math.ceil(totalEvents / limit), // Calculate total pages
});
  } catch (error) {
    console.error("Error fetching events by category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



app.get("/eventsbysubcategory", async (req, res) => {
  try {
    const { subcategory, category } = req.query; // Get parameters
    let { page, limit } = req.query;
    page = parseInt(page) || 1; // Default to page 1
    limit = parseInt(limit) || 10; // Default limit
  
    const skip = (page - 1) * limit;

    let query = {};

    if (category) {
      query.category = category;
    }
    if (subcategory) {
      query.subcategory = subcategory; // Ensures filtering works even if only subcategory is selected
    }

    const events = await eventsCollection.find(query).skip(skip).limit(limit).toArray();
    const totalEvents = await eventsCollection.countDocuments(query);
  res.send({
    events: events,
    totalPages: Math.ceil(totalEvents / limit), // Calculate total pages
});
  } catch (error) {
    console.error("Error fetching services by subcategory:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




app.get("/eventsbycountry", async (req, res) => {
  try {
    const { country } = req.query; // Corrected destructuring
    let { page, limit } = req.query;
    page = parseInt(page) || 1; // Default to page 1
    limit = parseInt(limit) || 10; // Default limit
  
    const skip = (page - 1) * limit;
  
   

    let query = {};

    if (country) {
      query.country = country; // Match country exactly
    }

    const events = await eventsCollection.find().skip(skip).limit(limit).toArray();
    const totalEvents = await eventsCollection.countDocuments(query);
    res.send({
      events: events,
      totalPages: Math.ceil(totalEvents / limit), // Calculate total pages
  });
  } catch (error) {
    console.error("Error fetching events by country:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/eventsbystate", async (req, res) => {
  try {
    const { state } = req.query; // Corrected destructuring
    let { page, limit } = req.query;
    page = parseInt(page) || 1; // Default to page 1
    limit = parseInt(limit) || 10; // Default limit
  
    const skip = (page - 1) * limit;
  
   


    let query = {};

    if (state) {
      query.state = state; // Match state exactly
    }

    const events = await eventsCollection.find(query).skip(skip).limit(limit).toArray();
    const totalEvents = await eventsCollection.countDocuments(query);
    res.send({
      events: events,
      totalPages: Math.ceil(totalEvents / limit), // Calculate total pages
  });
     
  } catch (error) {
    console.error("Error fetching events by state:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



app.get("/eventsbycity", async (req, res) => {
  try {
    const { city } = req.query; // Corrected destructuring
    console.log("city filter:", city);

    let query = {};

    if (city) {
      query.city = city; // Match city exactly
    }

    const events = await eventsCollection.find(query).toArray();
    
    res.json(events);
  } catch (error) {
    console.error("Error fetching events by city:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




// app.get("/eventsbyfilter", async (req, res) => {
//   try {
//     const { searchtext, category, subcategory, country, state, city, sort = 'title' } = req.query;
//     console.log("Filtering events:", { searchtext, category, subcategory, country, state, city });

//     let query = {};

//     // Apply filters only if they have a value
//     if (category) query.category = category;
//     if (subcategory) query.subcategory = subcategory;
//     if (country) query.country = country; // Country is a string at the root level
//     if (state) query.state = state; // State is directly stored, but in your example, it's null
//     if (city) query.city = city; // City is also stored directly
//     if (searchtext) query.title = { $regex: searchtext, $options: "i" };

//     console.log("Final query:", query); // Log the constructed query

//     let options = {};

//     // Sorting
//     if (sort) {
//       options.sort = { [sort]: 1 }; // Ascending order
//     }

//     // Fetch services without pagination
//     const events = await eventsCollection.find(query, options).toArray();

//     console.log("Matching events count:", events.length);
//     res.json(events); // Return the filtered services
//   } catch (error) {
//     console.error("Error fetching events by filter:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });








// Post API Events


app.get("/eventsbyfilter", async (req, res) => {
  try {
    // Destructuring query parameters, with default value for `sort`
    const { searchtext, category, subcategory, country, state, city, page = 1, limit = 10, sort = 'title' } = req.query;

    const pageNumber = parseInt(page); // Page number
    const limitNumber = parseInt(limit); // Limit per page
    const skip = (pageNumber - 1) * limitNumber; // Calculate the number of documents to skip

    let query = {};

    // Apply filters only if they have a value
    if (category) query.category = category;
    if (subcategory) query.subcategory = subcategory;
    if (country) query.country = country;
    if (state) query.state = state;
    if (city) query.city = city;
    if (searchtext) query.title = { $regex: searchtext, $options: "i" };

    console.log("Final query:", query); // Log the constructed query

    let options = {
      sort: { [sort]: 1 }, // Ascending order by default
    };

    // Fetch services with pagination
    const events = await eventsCollection.find(query, options).skip(skip).limit(limitNumber).toArray();
    
    // Fetch total count for pagination
    const totalEvents = await eventsCollection.countDocuments(query);

    // Send response with services and pagination info
    res.json({
      events: events,
      totalPages: Math.ceil(totalEvents / limitNumber), // Calculate total pages
      currentPage: pageNumber,
      totalEvents: totalEvents,
    });
  } catch (error) {
    console.error("Error fetching events by filter:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



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


// Profile API Start

// Create Profile API

app.post("/profile", async (req, res) => {
  const newProfile = req.body;
  
  // Check if profile already exists (based on a unique field, e.g., email or userId)
  const existingProfile = await profileCollection.findOne({ email: newProfile.email }); // Change to a relevant unique field
    // Insert the new profile if it doesn't exist
  if (!existingProfile) {
     const result = await profileCollection.insertOne(newProfile);
  res.status(201).json(result);
  }

});

// Get All Profiles API
app.get("/profiles", async(req, res)=>{
  const result = await profileCollection.find().sort({ name: 1 }).toArray();
  res.send(result)
})





app.get("/userprofile/:email", async (req, res) => {
  try {
    const email = req.params.email;
    console.log(email);

    const result = await profileCollection.findOne({ email: email });

    if (!result) {
      return res.status(404).send({ message: "User not found" });
    }

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});



app.put("/profile-update/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const updatedProfile = req.body;

    // Validate request body
    if (!updatedProfile || Object.keys(updatedProfile).length === 0) {
      return res.status(400).send({ message: "Invalid update data" });
    }

    console.log(`Updating profile for: ${email}`);

    const result = await profileCollection.updateOne(
      { email: email }, // Filter
      { $set: updatedProfile }, // Update operation
      { upsert: true } // Options: Create if not found
    );

    if (result.matchedCount === 0 && result.upsertedCount === 0) {
      return res.status(404).send({ message: "User not found" });
    }

    res.send({ message: "Profile updated successfully", result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});



// Profile API End







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


