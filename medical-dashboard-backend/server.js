const express = require ('express');
const mongoose = require ('mongoose');
const dotenv = require ('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
app.use (cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.error("mongoDB connection error",err));

app.use('/data',require('./routes/data'));

app.listen(process.env.port,()=>
console.log(`server running on:${process.env.port}`)
);
