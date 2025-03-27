const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const port = process.env.PORT || 5000;
const app = express();

// Middleware
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://classified-b08c3.web.app",
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "azimskit@gmail.com", // replace with your email
    pass: "clyrgdbsroaxjzxs", // replace with your email password
  },
});

app.use("/uploads", express.static(process.cwd() + "/uploads"));

// Verify JWT Middleware
const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;

  

  if (!token) {
    return res
      .status(401)
      .send({ message: "Unauthorized Access: No token provided" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send({ message: "Unauthorized Access: Invalid token" });
    }

    // Attach the decoded user information to the request object
    req.user = decoded;
  
    
    next(); // Pass control to the next middleware or route handler
  });
};

//Middleware End

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.b9e8y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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

    const profileCollection = client.db("Sidegurus").collection("profiles");
    const servicesCollection = client.db("Sidegurus").collection("services");
    const eventsCollection = client.db("Sidegurus").collection("events");
    const categoriesCollection = client
      .db("Sidegurus")
      .collection("categories");
    const locationsCollection = client.db("Sidegurus").collection("locations");




    const verifyAdmin = async (req, res, next) => {
      const adminEmail = req.user.email;
      const user = await profileCollection.findOne({ email: adminEmail });
    
      if (!user || !user.isAdmin) {
        return res.status(403).send({ message: "Access denied: Admins only" });
      }
      next();
    };
    
    const verifyAdminOrAuthor = async (req, res, next) => {
      const userEmail = req.user.email;
      const { id } = req.params; // Get the service/event ID
    
      // Find the service or event in both collections
      const service = await servicesCollection.findOne({ _id: new ObjectId(id) });
      const event = await eventsCollection.findOne({ _id: new ObjectId(id) });
    
      if (!service && !event) {
        return res.status(404).send({ message: "Service or Event not found" });
      }
    
      // Get user role from profileCollection
      const user = await profileCollection.findOne({ email: userEmail });
    
      if (!user) {
        return res.status(403).send({ message: "User not found" });
      }
    
      // Check if the user is an admin OR the author of the post
      if (user.isAdmin || (service && service.author.email === userEmail) || (event && event.author.email === userEmail)) {
        next();
      } else {
        res.status(403).send({ message: "Unauthorized: Only admin or author can modify this" });
      }
    };
    
// Add AdminFrom Dashboard
app.post("/add-admin", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { name, email } = req.body;

    // Check if the user already exists
    const existingUser = await profileCollection.findOne({ email });
    
    if (existingUser) {
      // Update existing user role to admin
      await profileCollection.updateOne({ email }, { $set: { isAdmin: true } });
      return res.send({ message: "User role updated to Admin" });
    }

    // Create a new admin object
    const newAdmin = {
      name,
      email,
      isAdmin: true,
      createdAt: new Date()
    };

    // Insert into database
    const result = await profileCollection.insertOne(newAdmin);
    res.status(201).send({ message: "Admin added successfully", result});
  } catch (err) {
    console.error("Error adding admin:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});


//Get Admins
app.get("/admins", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const admins = await profileCollection.find({ isAdmin: true }).toArray();
    res.send(admins);
  } catch (err) {
    console.error("Error fetching admins:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});



    app.put("/remove-admin/:email", verifyToken, verifyAdmin, async (req, res) => {
      const { email } = req.params;
    
      const user = await profileCollection.findOne({ email });
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
    
      await profileCollection.updateOne({ email }, { $set: { isAdmin: false } });
      res.send({ message: "Admin rights removed" });
    });
    
    
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "7d",
      });

      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "none" ,
        })
        .send({ success: true });
    });

    app.post("/logout", (req, res) => {
      res
        .clearCookie("token", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "none" ,

          maxAge: 0,
        })
        .send({ success: true });
    });

    app.post("/send-email", (req, res) => {
      const { name, email, message } = req.body;
   

      const mailOptions = {
        from: email,
        to: "sidegurusservices@gmail.com",
        subject: "Contact Form Submission",
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res
            .status(500)
            .json({ success: false, message: error.message });
        }
        res
          .status(200)
          .json({ success: true, message: "Message sent successfully!" });
      });
    });

    // Categories API Start
    // Get API Categories

    app.get("/categories", async (req, res) => {
      const result = await categoriesCollection.find().toArray();
      res.send(result);
    });

    // Get An Category  by Id
    app.get("/category/:id", async (req, res) => {
      const id = req.params.id;
      const result = await categoriesCollection.findOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    app.get("/singlecategory", async (req, res) => {
      try {
        const { category } = req.query;
 
        

        if (!category) {
          return res
            .status(400)
            .json({ error: "Category query parameter is missing" });
        }

        // Query to search the category name
        let query = { name: { $regex: category, $options: "i" } }; // Case-insensitive search for category name
        console.log("MongoDB query:", query); // Log the query object used for DB lookup

        const cat = await categoriesCollection.findOne(query);

        if (!cat) {
         
          
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
    app.get("/locations", async (req, res) => {
      const result = await locationsCollection.find().toArray();
      res.send(result);
    });
    // Get An Category  by Id
    app.get("/location/:id", async (req, res) => {
      const id = req.params.id;
      const result = await locationsCollection.findOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });
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

    // Get All Services

    app.get("/services", async (req, res) => {
      let { page, limit } = req.query;
      page = parseInt(page) || 1; // Default to page 1
      limit = parseInt(limit); // Default limit

      const skip = (page - 1) * limit;

      const result = await servicesCollection
        .find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limit)
        .toArray();
      const totalServices = await servicesCollection.countDocuments(); // Count all documents

      res.send({
        services: result,
        totalPages: Math.ceil(totalServices / limit), // Calculate total pages
      });
    });
    // Get An Specific Service by Id
    app.get("/service/:id", async (req, res) => {
      const id = req.params.id;
      const result = await servicesCollection.findOne({
        _id: new ObjectId(id),
      });
 

      res.send(result);
    });
    // Get Specific Services Posted by a user
    app.get("/servicesbyauser", verifyToken, async (req, res) => {
      const user = req.user;
      
      const email = user.email;
      if (!email) {
        return res
          .status(400)
          .json({ error: "Email query parameter is missing" });
      }
      // Extract user information from JWT token

      const result = await servicesCollection
        .find({ "author.email": email })
        .sort({ _id: -1 })
        .toArray();
      res.send(result);
    });
    // Get Specific Services Posted under a category
    app.get("/servicesbycategory", async (req, res) => {
      try {
        const { category } = req.query; // Corrected destructuring
        let { page, limit } = req.query;
        page = parseInt(page) || 1; // Default to page 1
        limit = parseInt(limit); // Default limit

        const skip = (page - 1) * limit;

        let query = {};

        if (category) {
          query.category = category; // Match category exactly
        }

        const services = await servicesCollection
          .find(query)
        .sort({ _id: -1 })
          .skip(skip)
          .limit(limit)
          .toArray();
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
    // Get Specific Services Posted under a subcategory
    app.get("/servicesbysubcategory", async (req, res) => {
      try {
        const { subcategory, category } = req.query; // Get parameters
        let { page, limit } = req.query;
        page = parseInt(page) || 1; // Default to page 1
        limit = parseInt(limit); // Default limit

        const skip = (page - 1) * limit;

        let query = {};

        if (category) {
          query.category = category;
        }
        if (subcategory) {
          query.subcategory = subcategory; // Ensures filtering works even if only subcategory is selected
        }

        const services = await servicesCollection
          .find(query)
        .sort({ _id: -1 })
          .skip(skip)
          .limit(limit)
          .toArray();
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
    // Get Specific Services Posted under a country
    app.get("/servicesbycountry", async (req, res) => {
      try {
        const { country } = req.query; // Corrected destructuring
        let { page, limit } = req.query;
        page = parseInt(page) || 1; // Default to page 1
        limit = parseInt(limit); // Default limit

        const skip = (page - 1) * limit;

        let query = {};

        if (country) {
          query.country = country; // Match country exactly
        }

        const services = await servicesCollection
          .find(query)
        .sort({ _id: -1 })
          .skip(skip)
          .limit(limit)
          .toArray();

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
    // Get Specific Services Posted under a state
    app.get("/servicesbystate", async (req, res) => {
      try {
        const { state } = req.query; // Corrected destructuring
        let { page, limit } = req.query;
        page = parseInt(page) || 1; // Default to page 1
        limit = parseInt(limit); // Default limit

        const skip = (page - 1) * limit;

        let query = {};

        if (state) {
          query.state = state; // Match state exactly
        }

        const services = await servicesCollection
          .find(query)
          .sort({ _id: -1 })
          .skip(skip)
          .limit(limit)
          .toArray();
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
    // Get Specific Services Posted under a city
    app.get("/servicesbycity", async (req, res) => {
      try {
        const { city } = req.query; // Corrected destructuring
       
        

        let query = {};

        if (city) {
          query.city = city; // Match city exactly
        }

        const services = await servicesCollection
        .find(query)
        .sort({ _id: -1 })
        .toArray();

        res.json(services);
      } catch (error) {
        console.error("Error fetching services by city:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
    // Get Specific Services Posted under certain conditions
    app.get("/servicesbyfilter", async (req, res) => {
      try {
        // Destructuring query parameters, with default value for `sort`
        const {
          searchtext,
          category,
          subcategory,
          country,
          state,
          city,
          status,
          page = 1,
          limit,
          sort = "title",
        } = req.query;

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
        if (status) query.status = status;
        if (searchtext) query.title = { $regex: searchtext, $options: "i" };

        let options = {
          sort: { [sort]: 1 }, // Ascending order by default
        };

        // Fetch services with pagination
        const services = await servicesCollection
          .find(query, options)
          .sort({ _id: -1 })
          .skip(skip)
          .limit(limitNumber)
          .toArray();

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

    app.post("/services", async (req, res) => {
      try {
        const {
          title,
          category,
          subcategory,
          price,
          description,
          country,
          state,
          city,
          author,
          images,
        } = req.body;

  
        

        // Ensure service_images is an array and is provided
       
        
        const simages = Array.isArray(images) ? images : [];
       
        

        // Ensure author is parsed correctly if it's a stringified JSON
        const authorData =
          typeof author === "string" ? JSON.parse(author) : author;

        const newService = {
          title,
          category,
          subcategory,
          price,
          description,
          country,
          state,
          city,
          posted: new Date().toISOString(),
          author: authorData, // Ensure this is an object
          images: simages, // Store Cloudinary image URLs
        };

        // Insert new service into the database
        const result = await servicesCollection.insertOne(newService);
       
        
        res.send(result);
      } catch (err) {
        console.error("Error posting service:", err);
        res.status(500).send({ error: "Failed to save service" });
      }
    });



    app.put("/service-update/:id", verifyToken,verifyAdminOrAuthor, async (req, res) => {
      try {
        const serviceId = req.params.id; // Get service ID from URL parameter
        const userEmail = req.user.email;
        const service = await servicesCollection.findOne({
        _id: new ObjectId(serviceId),
      });
  
        const {
          title,
          category,
          subcategory,
          price,
          description,
          country,
          state,
          city,
          author,
          images,
        } = req.body;
    
        
        // Ensure images is an array and is provided
        const serviceImages = Array.isArray(images) ? images : [];
      
        const authorData = typeof author === "string" ? JSON.parse(author) : author;
    
        const updatedService = {
          title,
          category,
          subcategory,
          price,
          description,
          country,
          state,
          city,
          updated: new Date().toISOString(), // Set the current time for the updated field
          author: authorData, // Ensure this is an object
          images: serviceImages, // Ensure images are an array
        };
    
        // Find the service by ID and update it
        const result = await servicesCollection.updateOne(
          { _id: new ObjectId(serviceId) }, // Filter by service ID
          { $set: updatedService } // Update the service with the new data
        );
    
        if (result.modifiedCount === 0) {
          return res.status(404).send({ error: "Service not found" });
        }
       
     
        res.send(result );
      } catch (err) {
        console.error("Error updating service:", err);
        res.status(500).send({ error: "Failed to update service" });
      }
    });
    

    app.put("/service-report/:id", async (req, res) => {
      const id = req.params.id;
      const updatedService = req.body;
     
      
      const result = await servicesCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedService },
        { upsert: true }
      );

      res.send(result);
    });
    app.put("/service-report-close/:id",verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const updatedService = req.body;
     
      
      const result = await servicesCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedService },
        { upsert: true }
      );

      res.send(result);
    });

 

    app.delete("/service/:id", verifyToken, verifyAdminOrAuthor, async (req, res) => {
      const { id } = req.params;
      await servicesCollection.deleteOne({ _id: new ObjectId(id) });
      res.send({ message: "Service deleted successfully" });
    });
    

    // Services API Ends
    // Events API Starts
    // Get API Events
    app.get("/events", async (req, res) => {
      let { page, limit } = req.query;
      page = parseInt(page) || 1; // Default to page 1
      limit = parseInt(limit); // Default limit

      const skip = (page - 1) * limit;
      const result = await eventsCollection
        .find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limit)
        .toArray();
      const totalEvents = await eventsCollection.countDocuments();
      res.send({
        events: result,
        totalPages: Math.ceil(totalEvents / limit), // Calculate total pages
      });
    });

    // Get An Specific Event by Id
    app.get("/event/:id", async (req, res) => {
      const id = req.params.id;
      const result = await eventsCollection.findOne({ _id: new ObjectId(id) });
      res.send(result);
    });
    // Get Specific Events Posted by a user by user email
    app.get("/eventsbyauser", verifyToken, async (req, res) => {
      const user = req.user;
      const email = user.email;
      if (!email) {
        return res
          .status(400)
          .json({ error: "Email query parameter is missing" });
      }

      const result = await eventsCollection
        .find({ "author.email": email })
        .sort({ _id: -1 })
        .toArray();
   
      res.send(result);
    });

    app.get("/eventsbycategory", async (req, res) => {
      try {
        const { category } = req.query; // Corrected destructuring
        let { page, limit } = req.query;
        page = parseInt(page) || 1; // Default to page 1
        limit = parseInt(limit); // Default limit

        const skip = (page - 1) * limit;

        let query = {};

        if (category) {
          query.category = category; // Match category exactly
        }

        const events = await eventsCollection
          .find(query)
          .sort({ _id: -1 })
          .skip(skip)
          .limit(limit)
          .toArray();
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
        limit = parseInt(limit); // Default limit

        const skip = (page - 1) * limit;

        let query = {};

        if (category) {
          query.category = category;
        }
        if (subcategory) {
          query.subcategory = subcategory; // Ensures filtering works even if only subcategory is selected
        }

        const events = await eventsCollection
          .find(query)
          .sort({ _id: -1 })
          .skip(skip)
          .limit(limit)
          .toArray();
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
        limit = parseInt(limit); // Default limit

        const skip = (page - 1) * limit;

        let query = {};

        if (country) {
          query.country = country; // Match country exactly
        }

        const events = await eventsCollection
          .find()
          .sort({ _id: -1 })
          .skip(skip)
          .limit(limit)
          .toArray();
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
        limit = parseInt(limit); // Default limit

        const skip = (page - 1) * limit;

        let query = {};

        if (state) {
          query.state = state; // Match state exactly
        }

        const events = await eventsCollection
          .find(query)
          .sort({ _id: -1 })
          .skip(skip)
          .limit(limit)
          .toArray();
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
       
        

        let query = {};

        if (city) {
          query.city = city; // Match city exactly
        }

        const events = await eventsCollection
        .find(query)
        .sort({ _id: -1 })
        .toArray();

        res.json(events);
      } catch (error) {
        console.error("Error fetching events by city:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.get("/eventsbyfilter", async (req, res) => {
      try {
        // Destructuring query parameters, with default value for `sort`
        const {
          searchtext,
          category,
          subcategory,
          country,
          state,
          city,
          status,
          page = 1,
          limit,
          sort = "title",
        } = req.query;

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
        if (status) query.status = status;
        if (searchtext) query.title = { $regex: searchtext, $options: "i" };

      
        

        let options = {
          sort: { [sort]: 1 }, // Ascending order by default
        };

        // Fetch services with pagination
        const events = await eventsCollection
          .find(query, options)
          .sort({ _id: -1 })
          .skip(skip)
          .limit(limitNumber)
          .toArray();

          
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

 

    app.post("/events", async (req, res) => {
      try{
        const {
          title,
          category,
          subcategory,
          price,
          description,
          startDate,
          endDate,
          country,
          state,
          city,
          author,
          images,
        } = req.body;
  
    
        
  
        // Ensure images is an array and is provided
   
        
        const simages = Array.isArray(images) ? images : [];
       
        
  
        const authorData =
            typeof author === "string" ? JSON.parse(author) : author;
  
        const newEvent ={
          title,
          category,
          subcategory,
          price,
          description,
          startDate,
          endDate,
          country,
          state,
          city,
          posted: new Date().toISOString(),
          author: authorData, // Ensure this is an object
          images: simages,
        }
  
        const result = await eventsCollection.insertOne(newEvent);
      
        
  
        res.send(result);
      } catch(err){
        console.error("Error posting service:", err);
        res.status(500).send({ error: "Failed to save service" });
      }
    });
 


    app.put("/event-update/:id",verifyToken,verifyAdminOrAuthor, async (req, res) => {
  try {
    const eventId = req.params.id;  // Get event ID from URL parameter
    const user = req.user;
    const userEmail = user.email;
    const event = await eventsCollection.findOne({ _id: new ObjectId(eventId) });
    
    const {
      title,
      category,
      subcategory,
      price,
      event_availability,
      description,
      startDate,
      endDate,
      country,
      state,
      city,
      author,
      images,
    } = req.body;


    

    // Ensure images is an array and is provided

    
    const simages = Array.isArray(images) ? images : [];

    

    const authorData =
      typeof author === "string" ? JSON.parse(author) : author;

    const updatedEvent = {
      title,
      category,
      subcategory,
      price,
      event_availability,
      description,
      startDate,
      endDate,
      country,
      state,
      city,
      updated: new Date().toISOString(),  // Set the current time for the updated field
      author: authorData,  // Ensure this is an object
      images: simages,
    };

    // Find the event by ID and update it
    const result = await eventsCollection.updateOne(
      { _id: new ObjectId(eventId) }, // Filter by event ID
      { $set: updatedEvent } // Update the event with the new data
    );

    if (result.modifiedCount === 0) {
      return res.status(404).send({ error: "Event not found" });
    }


    
    res.send({ message: "Event updated successfully", result });
  } catch (err) {
    console.error("Error updating event:", err);
    res.status(500).send({ error: "Failed to update event" });
  }
});

    //Report an Event
    app.put("/event-report/:id", async (req, res) => {
      const id = req.params.id;
      const updatedEvent = req.body;
      const result = await eventsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedEvent },
        { upsert: true }
      );

      res.send(result);
    });
    app.put("/event-report-close/:id",verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const updatedEvent = req.body;
      const result = await eventsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedEvent },
        { upsert: true }
      );

      res.send(result);
    });
 

    app.delete("/event/:id", verifyToken, verifyAdminOrAuthor, async (req, res) => {
      const { id } = req.params;
      await eventsCollection.deleteOne({ _id: new ObjectId(id) });
      res.send({ message: "Event deleted successfully" });
    });

 

    // Events API Ends
    // Profile API Start
    app.post("/profile-exists", async (req, res) => {
      try {
        const { email } = req.body;
    
        if (!email) {
          return res.status(400).send({ message: "Email is required" });
        }
    
        const existingProfile = await profileCollection.findOne({ email });
    
        res.send({ exists: !!existingProfile }); // true if profile exists, false otherwise
    
      } catch (err) {
        console.error("Error checking profile:", err);
        res.status(500).send({ message: "Internal Server Error" });
      }
    });
    

    app.post("/profile", async (req, res) => {
      try {
        const newProfile = req.body;

        const registerprofile ={
          name: newProfile.name,
          email: newProfile.email.toLowerCase(),
        }

        
    
        // Insert the new profile into the database
        const result = await profileCollection.insertOne(registerprofile);
    
        // Respond with a success message, no profile returned
        res.status(201).send({
          message: "Profile created successfully",
        });
        
      } catch (err) {
        console.error("Error creating profile:", err);
        res.status(500).send({ message: "Internal Server Error" });
      }
    });
    

    // Get All Profiles API
    app.get("/profiles",verifyToken, verifyAdmin, async (req, res) => {
      try {
        const result = await profileCollection
          .find()
          .sort({ _id: -1 })
          .toArray();
        res.send(result);
      } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error" });
      }
    });

    // Get userProfile
    app.get("/userprofile", verifyToken, async (req, res) => {
      try {
        const user = req.user;
        const email = user.email;
        if (!email) {
          return res
            .status(400)
            .json({ error: "Email query parameter is missing" });
        }
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
 
    // Update userProfile
    app.put("/profile-update", verifyToken, async (req, res) => {
      try {
        const email = req.user.email;
        const updatedProfile = req.body;
        const profile = await profileCollection.findOne({ email: email });
        
        
        if (email !== profile.email) {
          return res.status(403).json({ error: "Unauthorized Access" });
        }
        // Validate request body
        if (!updatedProfile || Object.keys(updatedProfile).length === 0) {
          return res.status(400).send({ message: "Invalid update data" });
        }
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

    // Delete user profile
//not used
    // app.delete("/profile-delete", verifyToken, verifyAdmin, async (req, res) => {
    //   try {
    //     const email = req.user.email;
    //     const profile = await profileCollection.findOne({ email: email });

    //     // Update it by admin email upon completion
    //     if (email !== profile.email) {
    //       return res.status(403).json({ error: "Unauthorized Access" });
    //     }

    //     const result = await profileCollection.deleteOne({ email: email });
    //     if (result.deletedCount === 0) {
    //       return res.status(404).send({ message: "User not found" });
    //     }
    //     res.send({ message: "Profile deleted successfully" });
    //   } catch (error) {
    //     console.error(error);
    //     res.status(500).send({ message: "Internal Server Error" });
    //   }
    // });

    // Profile API End

    // await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello from SideGurus Server");
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));
