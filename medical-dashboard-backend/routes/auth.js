router.get('/signup', (req, res) => {
  res.render('signup'); // signup.ejs form
});

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const doctor = new Doctor({ name, email, password: hashedPassword });
    await doctor.save();

    req.session.doctorId = doctor._id; // auto login
    res.redirect('/dashboard');
  } catch (err) {
    res.status(400).send("Error creating doctor: " + err.message);
  }
});

module.exports = router;