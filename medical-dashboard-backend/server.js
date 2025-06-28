const express = require ('express');
const mongoose = require ('mongoose');
const dotenv = require ('dotenv');
const cors = require('cors');
const Patient = require('./models/patient'); 
const Data = require('./models/data');
const multer = require('multer');
const path = require('path');


dotenv.config();
const app = express();
app.use (cors());
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', './views'); 

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // for form data
// app.use(express.json());                         // for JSON data


mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.error("mongoDB connection error",err));

app.use('/data',require('./routes/data'));


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// Upload middleware
const upload = multer({ storage: storage });

app.get("/home",async(req,res)=>{
   try {
    const patients = await Data.distinct("patientName"); // or from Patient.find()
    res.render("home", { patients });
  } catch (err) {
    console.error("Error loading home:", err);
    res.status(500).send("Error loading homepage");
  }
  
  
  

});

app.get('/', async (req, res) => {
  // Get all unique patient names for dropdown
  try{
  const patients = await Data.distinct('patientName');

  // Default patient to show
  const defaultPatient = 'John';

  const data = await Data.find({ patientName: defaultPatient })
    .sort({ timestamp: -1 })
    .limit(10);
  const profile = await Patient.findOne({ name: defaultPatient });

  const totalPatients = await Patient.countDocuments();
  const appointmentsToday = 32; // Optional: Count based on today's date
  const criticalAlerts = 5;
  const activeTreatments = 89;

    res.render('dashboard', {
    patient: profile,
    latest: data[0],
    patientName: defaultPatient,
    patients,
    labels: data.map(d => new Date(d.timestamp).toLocaleTimeString()),
    heartValues: data.map(d => d.heartRate),
    spo2Values: data.map(d => d.spo2),
    totalPatients,
    appointmentsToday,
    criticalAlerts,
    activeTreatments
  });
  }catch(err){
       console.error("Error loading dashboard:", err);
  }
  
});
//SHOW ROUTE 
app.get('/show', async (req, res) => {
  try {
     const patients = await Patient.find();
    res.render('show', { patients });
  } catch (err) {
    console.error(err);
    res.status(500).send('Could not load patient list');
  }
});
//NEW ROUTE

app.get('/new', (req, res) => {
  res.render("new.ejs");
});
app.post('/new',upload.single('image'),  async (req, res) => {
  console.log('Request Body:', req.body); 
  console.log('BODY:', req.body);
  console.log('FILE:', req.file);
  const { name, age, gender } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const newPatient = new Patient({ name, age, gender,image });
    await newPatient.save();

    // Redirect to patient dashboard (e.g., /John)
    res.redirect(`/${name}`);
  } catch (err) {
    console.error('Error adding patient:', err);
    res.status(500).send('Failed to add patient');
  }
});

// Dynamic patient route


app.get('/:patient', async (req, res) => {
  const patientName = req.params.patient; 

  try {
    const patients = await Data.distinct('patientName');

    const data = await Data.find({ patientName })
      .sort({ timestamp: -1 })
      .limit(10);

    const profile = await Patient.findOne({ name: patientName });
    const totalPatients = await Patient.countDocuments();
    const appointmentsToday = 32;
    const criticalAlerts = 5;
    const activeTreatments = 89;

    res.render('dashboard', {
      patient: profile,                     // ✅ full object with name, age, gender
      patientName,                          // ✅ just the string name
      latest: data[0],
      patients,
      labels: data.map(d => new Date(d.timestamp).toLocaleTimeString()),
      heartValues: data.map(d => d.heartRate),
      spo2Values: data.map(d => d.spo2),
      totalPatients,
      appointmentsToday,
      criticalAlerts,
      activeTreatments
     
     
    });
  } catch (err) {
    console.error('Error loading patient dashboard:', err);
    res.status(500).send('Error loading dashboard');
  }
});
//DELETE ROUTE 
app.post('/delete/:patientName', async (req, res) => {
  const patientName = req.params.patientName;

  try {
    // Delete patient profile
    await Patient.deleteOne({ name: patientName });

    // Delete patient vitals (optional)
    await Data.deleteMany({ patientName });

    res.redirect('/show'); // or wherever your "All Patients" page is
  } catch (err) {
    console.error('Error deleting patient:', err);
    res.status(500).send('Failed to delete patient');
  }
});





app.listen(process.env.PORT,()=>
console.log(`server running on:${process.env.port}`)
);



