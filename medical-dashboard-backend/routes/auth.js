// router.get('/signup', (req, res) => {
//   res.render('signup'); // signup.ejs form
// });

// router.post('/signup', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const doctor = new Doctor({ name, email, password: hashedPassword });
//     await doctor.save();

//     req.session.doctorId = doctor._id; // auto login
//     res.redirect('/dashboard');
//   } catch (err) {
//     res.status(400).send("Error creating doctor: " + err.message);
//   }
// });

// module.exports = router;
const express = require("express");
const bcrypt = require("bcrypt");
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");

const router = express.Router();

// ✅ Render login page
router.get("/login", (req, res) => {
  res.render("login", { error: null });
});

// ✅ Handle login
router.post("/login", async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // ----------------------------
    // 1️⃣ Admin login (hardcoded)
    // ----------------------------
    if (role === "admin" && username === "admin" && password === "admin123") {
      req.session.user = {
        id: "admin",
        name: "admin",
        role: "admin"
      };
      return res.redirect("/admin/dashboard");
    }

    // ----------------------------
    // 2️⃣ Doctor login
    // ----------------------------
    if (role === "doctor") {
      const doctor = await Doctor.findOne({ name: username });
      if (!doctor) {
        return res.render("login", { error: "Doctor not found" });
      }

      const isMatch = await bcrypt.compare(password, doctor.password);
      if (!isMatch) {
        return res.render("login", { error: "Invalid credentials" });
      }

      req.session.user = {
        id: doctor._id,
        name: doctor.name,
        role: "doctor"
      };

      return res.redirect(`/doctor/${doctor.name}`);
    }

    // ----------------------------
    // 3️⃣ Patient login
    // ----------------------------
    if (role === "patient") {
      const patient = await Patient.findOne({ name: username });
      if (!patient) {
        return res.render("login", { error: "Patient not found" });
      }

      // ⚠️ If patients don’t have password, skip bcrypt
      if (patient.password) {
        const isMatch = await bcrypt.compare(password, patient.password);
        if (!isMatch) {
          return res.render("login", { error: "Invalid credentials" });
        }
      }

      req.session.user = {
        id: patient._id,
        name: patient.name,
        role: "patient"
      };

      return res.redirect(`/patient/${patient.name}`);
    }

    return res.render("login", { error: "Invalid role selected" });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("Server error during login");
  }
});

// ✅ Logout
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

module.exports = router;

