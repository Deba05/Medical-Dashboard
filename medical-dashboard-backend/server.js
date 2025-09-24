// const express = require ('express');
// const mongoose = require ('mongoose');
// const dotenv = require ('dotenv');
// const cors = require('cors');

// const Patient = require('./models/patient'); 
// const Data = require('./models/data');
// const multer = require('multer');
// const path = require('path');
// const { isAuthenticated, setSessionToLocals } = require('./middleware/auth');
// const dataRoutes = require('./routes/data');
// const userRoutes = require('./routes/users');
// // const usersRoutes = require('./routes/users');
// //  const {  isLoggedIn  } =  require("./middleware/auth");
//  const { isLoggedIn } = require('./middleware/auth');


// dotenv.config();
// const session = require('express-session');

// const app = express();
// app.use (cors());
// app.use(express.json());
// app.set('view engine', 'ejs');
// app.set('views', './views'); 


// app.use(express.static('public'));
// app.use(express.urlencoded({ extended: true })); // for form data
// // app.use(express.json());                         // for JSON data
// app.use(session({
//   secret: 'supersecretkey', // use env variable in production
//   resave: false,
//   saveUninitialized: false
// }));
// app.use(setSessionToLocals); 



// mongoose.connect(process.env.MONGO_URI)
// .then(()=>console.log("MongoDB connected"))
// .catch(err=>console.error("mongoDB connection error",err));

// app.use('/data',require('./routes/data'));
// app.use('/', userRoutes);     // for /signup, /login etc.
// app.use('/data', dataRoutes);
// // app.use('/', usersRoutes);  // mount at root // for /data and related endpoints


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/uploads/');
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   }
// });

// // Upload middleware
// const upload = multer({ storage: storage });

// app.get("/home",isLoggedIn, isAuthenticated,async(req,res)=>{
//    try {
//     const patients = await Data.distinct("patientName"); // or from Patient.find()
//     res.render("home", { patients });
//   } catch (err) {
//     console.error("Error loading home:", err);
//     res.status(500).send("Error loading homepage");
//   }
  
  
  

// });

// app.get('/',isLoggedIn, isAuthenticated, async (req, res) => {
  
//   try{
//   const patients = await Data.distinct('patientName');

//   // Default patient to show
//   const defaultPatient = 'John';

//   const data = await Data.find({ patientName: defaultPatient })
//     .sort({ timestamp: -1 })
//     .limit(10);
//   const profile = await Patient.findOne({ name: defaultPatient });

//   const totalPatients = await Patient.countDocuments();
//   const appointmentsToday = 32; // Optional: Count based on today's date
//   const criticalAlerts = 5;
//   const activeTreatments = 89;

//     res.render('dashboard', {
//     patient: profile,
//     latest: data[0],
//     patientName: defaultPatient,
//     patients,
//     labels: data.map(d => new Date(d.timestamp).toLocaleTimeString()),
//     heartValues: data.map(d => d.heartRate),
//     spo2Values: data.map(d => d.spo2),
//     totalPatients,
//     appointmentsToday,
//     criticalAlerts,
//     activeTreatments
//   });
//   }catch(err){
//        console.error("Error loading dashboard:", err);
//   }
  
// });
// //SHOW ROUTE 
// app.get('/show',isLoggedIn, isAuthenticated, async (req, res) => {
//   try {
//      const patients = await Patient.find();
//     res.render('show', { patients });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Could not load patient list');
//   }
// });
// //NEW ROUTE

// app.get('/new',isLoggedIn, isAuthenticated, (req, res) => {
//   res.render("new.ejs");
// });
// app.post('/new',upload.single('image'),  async (req, res) => {
//   console.log('Request Body:', req.body); 
//   console.log('BODY:', req.body);
//   console.log('FILE:', req.file);
//   const { name, age, gender } = req.body;
//   const image = req.file ? `/uploads/${req.file.filename}` : null;

//   try {
//     const newPatient = new Patient({ name, age, gender,image });
//     await newPatient.save();

//     // Redirect to patient dashboard (e.g., /John)
//     res.redirect(`/${name}`);
//   } catch (err) {
//     console.error('Error adding patient:', err);
//     res.status(500).send('Failed to add patient');
//   }
// });

// app.get('/login', (req, res) => {
//   res.render('users/login');
// });

// app.post('/login', (req, res) => {
//   const { username, password } = req.body;

//   // Dummy credentials — replace with DB later
//   if (username === 'admin' && password === 'admin123') {
//     req.session.user = 'admin';
//     res.redirect('/');
//   } else {
//     res.send('Invalid credentials. <a href="/login">Try again</a>');
//   }
// });

// app.get('/logout', (req, res) => {
//   req.session.destroy(err => {
//     if (err) return res.send('Error logging out.');
//     res.redirect('/login');
//   });
// });

// // Dynamic patient route


// app.get('/:patient',isAuthenticated, async (req, res) => {
//   const patientName = req.params.patient; 

//   try {
//     const patients = await Data.distinct('patientName');

//     const data = await Data.find({ patientName })
//       .sort({ timestamp: -1 })
//       .limit(10);

//     const profile = await Patient.findOne({ name: patientName });
//     const totalPatients = await Patient.countDocuments();
//     const appointmentsToday = 32;
//     const criticalAlerts = 5;
//     const activeTreatments = 89;

//     res.render('dashboard', {
//       patient: profile,                     // ✅ full object with name, age, gender
//       patientName,                          // ✅ just the string name
//       latest: data[0],
//       patients,
//       labels: data.map(d => new Date(d.timestamp).toLocaleTimeString()),
//       heartValues: data.map(d => d.heartRate),
//       spo2Values: data.map(d => d.spo2),
//       totalPatients,
//       appointmentsToday,
//       criticalAlerts,
//       activeTreatments
     
     
//     });
//   } catch (err) {
//     console.error('Error loading patient dashboard:', err);
//     res.status(500).send('Error loading dashboard');
//   }
// });
// //DELETE ROUTE 
// app.post('/delete/:patientName', async (req, res) => {
//   const patientName = req.params.patientName;

//   try {
//     // Delete patient profile
//     await Patient.deleteOne({ name: patientName });

//     // Delete patient vitals (optional)
//     await Data.deleteMany({ patientName });

//     res.redirect('/show'); // or wherever your "All Patients" page is
//   } catch (err) {
//     console.error('Error deleting patient:', err);
//     res.status(500).send('Failed to delete patient');
//   }
// });





// app.listen(process.env.PORT,()=>
// console.log(`server running on:${process.env.port}`)
// );
// changes made afte this
// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const multer = require('multer');
// const path = require('path');
// const session = require('express-session');

// const Patient = require('./models/patient');
// const Data = require('./models/data');
// const { isAuthenticated, setSessionToLocals, isLoggedIn } = require('./middleware/auth');
// const dataRoutes = require('./routes/data');
// const userRoutes = require('./routes/users');

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.set('view engine', 'ejs');
// app.set('views', './views');
// app.use(express.static('public'));

// app.use(session({
//   secret: process.env.SESSION_SECRET || 'supersecretkey',
//   resave: false,
//   saveUninitialized: false
// }));
// app.use(setSessionToLocals);

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log("✅ MongoDB connected"))
// .catch(err => console.error("❌ MongoDB connection error:", err));

// // Routes
// app.use('/', userRoutes);     // signup, login, logout
// app.use('/data', dataRoutes); // vitals data endpoints

// // Multer config for image uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/uploads/');
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   }
// });
// const upload = multer({ storage: storage });

// // Home page
// app.get('/home', isLoggedIn, isAuthenticated, async (req, res) => {
//   try {
//     const patients = await Data.distinct("patientName");
//     res.render("home", { patients });
//   } catch (err) {
//     console.error("Error loading home:", err);
//     res.status(500).send("Error loading homepage");
//   }
// });

// // Default dashboard (loads John by default)
// app.get('/', isLoggedIn, isAuthenticated, async (req, res) => {
//   try {
//     const patients = await Data.distinct('patientName');
//     const defaultPatient = 'John';

//     const data = await Data.find({ patientName: defaultPatient })
//       .sort({ timestamp: -1 })
//       .limit(10);

//     const profile = await Patient.findOne({ name: defaultPatient });
//     const totalPatients = await Patient.countDocuments();

//     res.render('dashboard', {
//       patient: profile,
//       latest: data[0],
//       patientName: defaultPatient,
//       patients,
//       labels: data.map(d => new Date(d.timestamp).toLocaleTimeString()),
//       heartValues: data.map(d => d.heartRate),
//       spo2Values: data.map(d => d.spo2),
//       totalPatients,
//       appointmentsToday: 32,
//       criticalAlerts: 5,
//       activeTreatments: 89
//     });
//   } catch (err) {
//     console.error("Error loading dashboard:", err);
//     res.status(500).send("Error loading dashboard");
//   }
// });

// // Show all patients
// app.get('/show', isLoggedIn, isAuthenticated, async (req, res) => {
//   try {
//     const patients = await Patient.find();
//     res.render('show', { patients });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Could not load patient list');
//   }
// });

// // New patient form
// app.get('/new', isLoggedIn, isAuthenticated, (req, res) => {
//   res.render("new.ejs");
// });

// app.post('/new', upload.single('image'), async (req, res) => {
//   const { name, age, gender } = req.body;
//   const image = req.file ? `/uploads/${req.file.filename}` : null;

//   try {
//     const newPatient = new Patient({ name, age, gender, image });
//     await newPatient.save();
//     res.redirect(`/${name}`);
//   } catch (err) {
//     console.error('Error adding patient:', err);
//     res.status(500).send('Failed to add patient');
//   }
// });

// // Login
// app.get('/login', (req, res) => {
//   res.render('users/login');
// });

// app.post('/login', (req, res) => {
//   const { username, password } = req.body;

//   if (username === 'admin' && password === 'admin123') {
//     req.session.user = 'admin';
//     res.redirect('/');
//   } else {
//     res.send('Invalid credentials. <a href="/login">Try again</a>');
//   }
// });

// // Logout
// app.get('/logout', (req, res) => {
//   req.session.destroy(err => {
//     if (err) return res.send('Error logging out.');
//     res.redirect('/login');
//   });
// });

// // Dynamic patient route
// app.get('/:patient', isAuthenticated, async (req, res) => {
//   const patientName = req.params.patient;

//   try {
//     const patients = await Data.distinct('patientName');
//     const data = await Data.find({ patientName })
//       .sort({ timestamp: -1 })
//       .limit(10);

//     const profile = await Patient.findOne({ name: patientName });
//     const totalPatients = await Patient.countDocuments();

//     res.render('dashboard', {
//       patient: profile,
//       patientName,
//       latest: data[0],
//       patients,
//       labels: data.map(d => new Date(d.timestamp).toLocaleTimeString()),
//       heartValues: data.map(d => d.heartRate),
//       spo2Values: data.map(d => d.spo2),
//       totalPatients,
//       appointmentsToday: 32,
//       criticalAlerts: 5,
//       activeTreatments: 89
//     });
//   } catch (err) {
//     console.error('Error loading patient dashboard:', err);
//     res.status(500).send('Error loading dashboard');
//   }
// });

// // Delete patient
// app.post('/delete/:patientName', async (req, res) => {
//   const patientName = req.params.patientName;

//   try {
//     await Patient.deleteOne({ name: patientName });
//     await Data.deleteMany({ patientName });
//     res.redirect('/show');
//   } catch (err) {
//     console.error('Error deleting patient:', err);
//     res.status(500).send('Failed to delete patient');
//   }
// });

// // Start server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () =>
//   console.log(` Server running on: http://localhost:${PORT}`)
// );


//changes made after this 


// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const multer = require('multer');
// const path = require('path');
// const session = require('express-session');

// const Patient = require('./models/patient');
// const Data = require('./models/data');
// const { isAuthenticated, setSessionToLocals, isLoggedIn } = require('./middleware/auth');
// const dataRoutes = require('./routes/data');
// const userRoutes = require('./routes/users');

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.set('view engine', 'ejs');
// app.set('views', './views');
// app.use(express.static('public'));

// app.use(session({
//   secret: process.env.SESSION_SECRET || 'supersecretkey',
//   resave: false,
//   saveUninitialized: false
// }));
// app.use(setSessionToLocals);

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log("✅ MongoDB connected"))
// .catch(err => console.error("❌ MongoDB connection error:", err));

// // Routes
// app.use('/', userRoutes);     // signup, login, logout
// app.use('/data', dataRoutes); // vitals data endpoints

// // Multer config for image uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/uploads/');
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   }
// });
// const upload = multer({ storage: storage });

// // Home page
// app.get('/home', isLoggedIn, isAuthenticated, async (req, res) => {
//   try {
//     const patients = await Data.distinct("patientName");
//     res.render("home", { patients });
//   } catch (err) {
//     console.error("Error loading home:", err);
//     res.status(500).send("Error loading homepage");
//   }
// });

// // Default dashboard (loads John by default)
// app.get('/', isLoggedIn, isAuthenticated, async (req, res) => {
//   try {
//     const patients = await Data.distinct('patientName');
//     const defaultPatient = 'John';

//     const data = await Data.find({ patientName: defaultPatient })
//       .sort({ timestamp: -1 })
//       .limit(10);

//     const profile = await Patient.findOne({ name: defaultPatient });
//     const totalPatients = await Patient.countDocuments();

//     res.render('dashboard', {
//       patient: profile,
//       latest: data[0],
//       patientName: defaultPatient,
//       patients,
//       labels: data.map(d => new Date(d.timestamp).toLocaleTimeString()),
//       heartValues: data.map(d => d.heartRate),
//       spo2Values: data.map(d => d.spo2),
//       totalPatients,
//       appointmentsToday: 32,
//       criticalAlerts: 5,
//       activeTreatments: 89
//     });
//   } catch (err) {
//     console.error("Error loading dashboard:", err);
//     res.status(500).send("Error loading dashboard");
//   }
// });

// // Show all patients
// app.get('/show', isLoggedIn, isAuthenticated, async (req, res) => {
//   try {
//     const patients = await Patient.find();
//     res.render('show', { patients });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Could not load patient list');
//   }
// });

// // New patient form
// app.get('/new', isLoggedIn, isAuthenticated, (req, res) => {
//   res.render("new.ejs");
// });

// app.post('/new', upload.single('image'), async (req, res) => {
//   const { name, age, gender } = req.body;
//   const image = req.file ? `/uploads/${req.file.filename}` : null;

//   try {
//     const newPatient = new Patient({ name, age, gender, image });
//     await newPatient.save();
//     res.redirect(`/${name}`);
//   } catch (err) {
//     console.error('Error adding patient:', err);
//     res.status(500).send('Failed to add patient');
//   }
// });

// // Login
// app.get('/login', (req, res) => {
//   res.render('users/login');
// });

// app.post('/login', (req, res) => {
//   const { username, password } = req.body;

//   if (username === 'admin' && password === 'admin123') {
//     req.session.user = 'admin';
//     res.redirect('/');
//   } else {
//     res.send('Invalid credentials. <a href="/login">Try again</a>');
//   }
// });

// // Logout
// app.get('/logout', (req, res) => {
//   req.session.destroy(err => {
//     if (err) return res.send('Error logging out.');
//     res.redirect('/login');
//   });
// });

// // Dynamic patient route
// app.get('/:patient', isAuthenticated, async (req, res) => {
//   const patientName = req.params.patient;

//   try {
//     const patients = await Data.distinct('patientName');
//     const data = await Data.find({ patientName })
//       .sort({ timestamp: -1 })
//       .limit(10);

//     const profile = await Patient.findOne({ name: patientName });
//     const totalPatients = await Patient.countDocuments();

//     res.render('dashboard', {
//       patient: profile,
//       patientName,
//       latest: data[0],
//       patients,
//       labels: data.map(d => new Date(d.timestamp).toLocaleTimeString()),
//       heartValues: data.map(d => d.heartRate),
//       spo2Values: data.map(d => d.spo2),
//       totalPatients,
//       appointmentsToday: 32,
//       criticalAlerts: 5,
//       activeTreatments: 89
//     });
//   } catch (err) {
//     console.error('Error loading patient dashboard:', err);
//     res.status(500).send('Error loading dashboard');
//   }
// });

// // ---------- NEW: Separate Patient Dashboard with Charts ----------
// app.get('/patient/:id/dashboard', isAuthenticated, async (req, res) => {
//   const patientId = req.params.id;

//   try {
//     const profile = await Patient.findById(patientId);
//     if (!profile) return res.status(404).send('Patient not found');

//     const vitals = await Data.find({ patientName: profile.name })
//       .sort({ timestamp: 1 }); // chronological order

//     res.render('patientDashboard', { patient: profile, vitals });
//   } catch (err) {
//     console.error('Error loading patient dashboard:', err);
//     res.status(500).send('Failed to load patient dashboard');
//   }
// });

// // Delete patient
// app.post('/delete/:patientName', async (req, res) => {
//   const patientName = req.params.patientName;

//   try {
//     await Patient.deleteOne({ name: patientName });
//     await Data.deleteMany({ patientName });
//     res.redirect('/show');
//   } catch (err) {
//     console.error('Error deleting patient:', err);
//     res.status(500).send('Failed to delete patient');
//   }
// });

// // Start server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () =>
//   console.log(` Server running on: http://localhost:${PORT}`)
// );



////EDITED ROUTE



const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcrypt');

// Models
const Patient = require('./models/patient');
const Data = require('./models/data');
const Doctor = require('./models/doctor'); // ✅ use new Doctor model
const { isAuthenticated, setSessionToLocals, isLoggedIn } = require('./middleware/auth');
const patientRoutes = require("./routes/patient");
const dummyRoutes = require("./routes/dummy"); // create file routes/dummy.js
const methodOverride = require('method-override');





const dataRoutes = require('./routes/data');
const userRoutes = require('./routes/users');
const messageRoutes = require("./routes/messages");





dotenv.config();
const app = express();

/* 
   Middleware
*/
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'supersecretkey',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.use("/patient", patientRoutes);
console.log("Loaded messageRoutes:", messageRoutes);
app.use("/messages", messageRoutes);


app.use(setSessionToLocals);
app.use("/simulate", dummyRoutes);
app.use("/",dummyRoutes);
app.use(methodOverride('_method'));



/* 
   MongoDB connection
*/
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch(err => console.error("❌ MongoDB Atlas connection error:", err));

/* 
   Routes
 */
app.use('/', userRoutes); // signup/login/logout
app.use('/data', dataRoutes); // vitals API

/* 
   Multer Config
*/
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads/'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

/* 
   Doctor Dashboard
 */
app.get('/home', isLoggedIn, isAuthenticated, async (req, res) => {
  try {
    let patients = [];

    if (req.session.user.role === 'doctor') {
      if (req.session.user.name === 'admin') {
        // ✅ Hardcoded admin sees ALL patients
        patients = await Patient.find();
      } else {
        // ✅ Normal doctor only sees their patients
        const doctor = await Doctor.findById(req.session.user.id).populate('patients');
        patients = doctor ? doctor.patients : [];
      }
    }

    res.render('home', { patients, hasPatients: patients.length > 0 });
  } catch (err) {
    console.error('Error loading home:', err);
    res.status(500).send('Error loading homepage');
  }
});

/* 
   Dashboard Default
 */
app.get('/', isLoggedIn, isAuthenticated, async (req, res) => {
  try {
    const defaultPatient = 'John';
    const patients = await Data.distinct('patientName');
    const data = await Data.find({ patientName: defaultPatient }).sort({ timestamp: -1 }).limit(10);

    const profile = await Patient.findOne({ name: defaultPatient });
    const totalPatients = await Patient.countDocuments();

    res.render('dashboard', {
      patient: profile,
      latest: data[0],
      patientName: defaultPatient,
      patients,
      labels: data.map((d) => new Date(d.timestamp).toLocaleTimeString()),
      heartValues: data.map((d) => d.heartRate),
      spo2Values: data.map((d) => d.spo2),
      totalPatients,
      appointmentsToday: 32,
      newPatients: 5,
      criticalAlerts: 5,
    });
  } catch (err) {
    console.error('Error loading dashboard:', err);
    res.status(500).send('Error loading dashboard');
  }
});

/*
   Show All Patients
*/
app.get('/show', isLoggedIn, isAuthenticated, async (req, res) => {
  try {
    let patients = [];

    if (req.session.user.role === 'doctor') {
      if (req.session.user.name === 'admin') {
        patients = await Patient.find();
      } else {
        const doctor = await Doctor.findById(req.session.user.id).populate('patients');
        patients = doctor ? doctor.patients : [];
      }
    }

    res.render('show', { patients });
  } catch (err) {
    console.error(err);
    res.status(500).send('Could not load patient list');
  }
});

/* 
   Add New Patient
*/
app.get('/new', isLoggedIn, isAuthenticated, (req, res) => {
  res.render('new.ejs');
});

app.post('/new', upload.single('image'), async (req, res) => {
  const { name, age, gender } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const newPatient = new Patient({ name, age, gender, image });
    await newPatient.save();

    // ✅ Link patient to logged-in doctor (except hardcoded admin)
    if (req.session.user && req.session.user.role === 'doctor' && req.session.user.name !== 'admin') {
      const doctor = await Doctor.findById(req.session.user.id);
      if (doctor) {
        doctor.patients.push(newPatient._id);
        await doctor.save();
      }
    }

    // ✅ Redirect to the patient’s dashboard (using ID, not name)
    res.redirect(`/patient/${newPatient._id}`);
  } catch (err) {
    console.error('Error adding patient:', err);
    res.status(500).send('Failed to add patient');
  }
});


/* 
   Authentication
 */
app.get('/login', (req, res) => res.render('users/login'));

app.post('/login', async (req, res) => {
  const { username, password, role } = req.body;

  try {
    if (role === 'doctor') {
      // ✅ Hardcoded admin
      if (username === 'admin' && password === 'admin123') {
        req.session.user = { role: 'doctor', name: 'admin' };
        return res.redirect('/home');
      }

      // ✅ Normal doctor
      const doctor = await Doctor.findOne({ username });
      if (!doctor) return res.send('Doctor not found. <a href="/login">Try again</a>');

      const isMatch = await bcrypt.compare(password, doctor.password);
      if (!isMatch) return res.send('Invalid password. <a href="/login">Try again</a>');

      req.session.user = { role: 'doctor', id: doctor._id, name: doctor.username };
      return res.redirect('/home');
    }

    if (role === 'patient') {
      const patient = await Patient.findOne({ name: username });
      if (!patient) return res.send('Patient not found. <a href="/login">Try again</a>');

      req.session.user = { role: 'patient', id: patient._id, name: patient.name };
      return res.redirect(`/patient/id/${patient._id}`);
    }

    res.send('Invalid role. <a href="/login">Try again</a>');
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send('Login failed');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

/* 
   Dynamic Doctor Dashboard
 */
// app.get('/doctor/:patient', isLoggedIn, isAuthenticated, async (req, res) => {
//   const patientName = req.params.patient;

//   try {
//     const patients = await Data.distinct('patientName');
//     const data = await Data.find({ patientName }).sort({ timestamp: -1 }).limit(10);

//     const profile = await Patient.findOne({ name: patientName });
//     const totalPatients = await Patient.countDocuments();

//     res.render('dashboard', {
//       patient: profile,
//       patientName,
//       latest: data[0],
//       patients,
//       labels: data.map((d) => new Date(d.timestamp).toLocaleTimeString()),
//       heartValues: data.map((d) => d.heartRate),
//       spo2Values: data.map((d) => d.spo2),
//       totalPatients,
//       appointmentsToday: 32,
//       criticalAlerts: 5,
//       activeTreatments: 89,
//       newPatients: 5,
//     });
//   } catch (err) {
//     console.error('Error loading doctor patient dashboard:', err);
//     res.status(500).send('Error loading dashboard');
//   }
  
// });
// app.get('/patient/:id', isLoggedIn, isAuthenticated, async (req, res) => {
//   try {
//     const patient = await Patient.findById(req.params.id);
//     if (!patient) return res.status(404).send("Patient not found");

//     const data = await Data.find({ patient: patient._id }).sort({ timestamp: -1 }).limit(10);
//     const totalPatients = await Patient.countDocuments();

//     res.render("dashboard", {
//       patient,
//       patientName: patient.name,
//       latest: data[0],
//       patients: await Patient.find(),
//       labels: data.map(d => new Date(d.timestamp).toLocaleTimeString()),
//       heartValues: data.map(d => d.heartRate),
//       spo2Values: data.map(d => d.spo2),
//       totalPatients,
//       appointmentsToday: 32,
//       criticalAlerts: 5,
//       activeTreatments: 89,
//       newPatients: 5,
//     });
//   } catch (err) {
//     console.error("Error loading patient dashboard:", err);
//     res.status(500).send("Error loading patient dashboard");
//   }
// });
app.get('/patient/:id', isLoggedIn, isAuthenticated, async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).send("Patient not found");

    // ✅ Use ObjectId for lookup
    const data = await Data.find({ patient: patient._id }).sort({ timestamp: -1 }).limit(10);
    const totalPatients = await Patient.countDocuments();
     const systolicValues = data.map(d => d.systolicBP || null);
    const diastolicValues = data.map(d => d.diastolicBP || null);

    res.render("dashboard", {
      patient,
      patientName: patient.name,
      latest: data[0],
      patients: await Patient.find(), // ✅ All patients list
      labels: data.map(d => new Date(d.timestamp).toLocaleTimeString()),
      heartValues: data.map(d => d.heartRate),
      spo2Values: data.map(d => d.spo2),
      systolicValues,   // ✅ pass to EJS
      diastolicValues, 
      totalPatients,
      appointmentsToday: 32,
      criticalAlerts: 5,
      activeTreatments: 89,
      newPatients: 5,
    });
  } catch (err) {
    console.error("Error loading doctor dashboard:", err);
    res.status(500).send("Error loading doctor dashboard");
  }
});



/* 
   Patient Dashboard
 */
// app.get('/patient/id/:id', async (req, res) => {
//   const patient = await Patient.findById(req.params.id);
//   if (!patient) return res.status(404).send("Patient not found");

//   const vitals = await Data.find({ patientName: patient.name }).sort({ timestamp: -1 }).limit(10);

//   res.render("patientDashboard", {
//     patient,
//     vitals,
//     labels: vitals.map(d => new Date(d.timestamp).toLocaleTimeString()).reverse(),
//     heartValues: vitals.map(d => d.heartRate).reverse(),
//     spo2Values: vitals.map(d => d.spo2).reverse(),
//     weightValues: vitals.map(d => d.weight).reverse(),
//   });
// });

// app.get('/patient/:name', async (req, res) => {
//   const patientName = req.params.name;

//   try {
//     const patient = await Patient.findOne({ name: patientName });
    
//     if (!patient) return res.status(404).send('Patient not found');

//     const vitals = await Data.find({ patientName }).sort({ timestamp: -1 }).limit(10);

//     res.render('patientDashboard', {
//       patient,
//       vitals,
//       labels: vitals.map((d) => new Date(d.timestamp).toLocaleTimeString()).reverse(),
//       heartValues: vitals.map((d) => d.heartRate).reverse(),
//       spo2Values: vitals.map((d) => d.spo2).reverse(),
//       weightValues: vitals.map((d) => d.weight).reverse(),
//     });
//   } catch (err) {
//     console.error('Error loading patient dashboard:', err);
//     res.status(500).send('Error loading patient dashboard');
//   }
// });
// Patient Dashboard by ID
// app.get('/patient/id/:id', async (req, res) => {
//   try {
//     const patient = await Patient.findById(req.params.id);
//     if (!patient) return res.status(404).send("Patient not found");
//     let doctor = null;
//     if (patient.doctor) {
//       doctor = await Doctor.findById(patient.doctor);
//     }

//     // ✅ Use ObjectId for lookup
//     const vitals = await Data.find({ patient: patient._id }).sort({ timestamp: -1 }).limit(10);

//     res.render("patientDashboard", {
//       patient,
//       doctor,
//       vitals,
//       labels: vitals.map(d => new Date(d.timestamp).toLocaleTimeString()).reverse(),
//       heartValues: vitals.map(d => d.heartRate).reverse(),
//       spo2Values: vitals.map(d => d.spo2).reverse(),
//       weightValues: vitals.map(d => d.weight).reverse(),
//     });
//   } catch (err) {
//     console.error("Error loading patient dashboard:", err);
//     res.status(500).send("Error loading patient dashboard");
//   }
// });
app.get('/patient/id/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).send("Patient not found");

    // Find the doctor who has this patient assigned
    const doctor = await Doctor.findOne({ patients: patient._id });

    // Get last 10 vitals
    const vitals = await Data.find({ patient: patient._id })
      .sort({ timestamp: -1 })
      .limit(10);

    // Prepare chart values (reverse to show oldest → latest on x-axis)
    const labels = vitals.map(d => new Date(d.timestamp).toLocaleTimeString()).reverse();
    const heartValues = vitals.map(d => d.heartRate).reverse();
    const spo2Values = vitals.map(d => d.spo2).reverse();
    const systolicValues = vitals.map(d => d.systolicBP || 0).reverse();
    const diastolicValues = vitals.map(d => d.diastolicBP || 0).reverse();
    const weightValues = vitals.map(d => d.weight).reverse();

    res.render("patientDashboard", {
      patient,
      doctor,   // ✅ used for messaging section
      vitals,
      labels,
      heartValues,
      spo2Values,
      systolicValues,
      diastolicValues,
      weightValues
    });
  } catch (err) {
    console.error("Error loading patient dashboard:", err);
    res.status(500).send("Error loading patient dashboard");
  }
});



// Patients Consent

// Update patient consent
app.post('/patients/:id/consent', async (req, res) => {
  try {
    const patientId = req.params.id;
    const consent = req.body.consent === "true";

    const patient = await Patient.findByIdAndUpdate(
      patientId,
      { consentForResearch: consent },
      { new: true }
    );

    // ✅ Redirect back to that patient's dashboard
    res.redirect(`/patient/${patient.name}`);
  } catch (err) {
    console.error('Error updating consent:', err);
    res.status(500).send('Failed to update consent');
  }
});


/* 
   Delete Patient
 */
app.post('/delete/:patientName', async (req, res) => {
  try {
    const patientName = req.params.patientName;
    await Patient.deleteOne({ name: patientName });
    await Data.deleteMany({ patientName });
    res.redirect('/show');
  } catch (err) {
    console.error('Error deleting patient:', err);
    res.status(500).send('Failed to delete patient');
  }
});
// const axios = require("axios");

// app.post("/ai/predict/:patientId", async (req, res) => {
//   const patientId = req.params.patientId;
//   const patient = await Patient.findById(patientId).populate("vitals");

//   const latest = patient.vitals[0]; // latest vitals
//   const data = {
//     heartRate: latest.heartRate,
//     spo2: latest.spo2,
//     weight: latest.weight
//   };

//   try {
//     const response = await axios.post("http://localhost:5000/predict", data);
//     const prediction = response.data;
//     res.render("aiResult", { patient, prediction });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("AI model error");
//   }
// });


/* 
   Start Server
*/
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on: http://localhost:${PORT}`));









