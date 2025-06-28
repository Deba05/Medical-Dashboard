const express = require('express');
const router = express.Router();
const Data= require('../models/data');


router.post('/', async (req, res) => {
  console.log(" Incoming request body:", req.body); 

  try {
    const newData = new Data(req.body);
    await newData.save();
    res.status(201).send('data saved');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error saving data');
  }
});


router.get('/',async(req,res)=>{
    try{
        const recentData = await Data.find().sort({ timestamp:-1}).limit(10);
        res.json(recentData);
    }catch(err){
        res.status(500).send('ERrro setchinf data');
    }
});

module.exports = router;
