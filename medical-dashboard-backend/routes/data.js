const express = require('express');
const router = express.Router();
const Data= require('../models/data');
const { isLoggedIn } = require('../middleware/auth');


router.post('/',isLoggedIn, async (req, res) => {
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
router.post('/device', async (req, res) => {
  try {
    const newData = new Data(req.body);
    await newData.save();
    res.status(201).json({ message: 'Data saved from device' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save data' });
  }
});


router.get('/',isLoggedIn,async(req,res)=>{
    try{
        const recentData = await Data.find().sort({ timestamp:-1}).limit(10);
        res.json(recentData);
    }catch(err){
        res.status(500).send('Erro fetching data');
    }
});

module.exports = router;
