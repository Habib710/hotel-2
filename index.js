const express = require('express');
const cors=require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const port= process.env.PORT || 3300;
const app=express();


// ........moddelware.......
app.use(cors());
app.use(express.json());





;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.j89kg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
    

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){

    try{
        await client.connect();
        const roomCollection = client.db("Hotel-cls").collection("Room");

        app.get('/rooms',async(req,res)=>{

            const query={}
            const cursor = roomCollection.find(query);
            const result=await cursor.toArray();

            res.send(result)
        })
        app.get('/rooms/:id',async(req,res)=>{
            const id=req.params.id;
            const query={_id:ObjectId(id)};
            const result = await roomCollection.findOne(query);
            res.send(result)
           


        })

    }

    finally{

    }

}

run().catch(console.dir);

app.get('/',(req,res)=>{
    res.send('hello world')
})




app.listen(port ,()=>{
    console.log('mongodb');
})