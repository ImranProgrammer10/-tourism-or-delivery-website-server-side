const express=require("express");
const { MongoClient } = require('mongodb');

require("dotenv").config();
const cors =require("cors");
const port = process.env.PORT || 5000;
 
const app=express();    
app.use(cors());
app.use(express.json());


app.get("/",(req,res)=>{
    res.send("server is running");
});


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xq8ej.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
      await client.connect();
      const database = client.db("fantasy-park");
      const package_Collection = database.collection("package");
      app.get("/package", async (req,res)=>{
        const cursor = package_Collection.find({});
         

        const package= await cursor.toArray();
        res.json(package);
       

      });
       
     
       
       
    

    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);

app.listen(port,()=>{
    console.log('server is running on port',port);
});
