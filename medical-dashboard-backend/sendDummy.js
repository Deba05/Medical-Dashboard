

const axios = require("axios");

const API_URL = "http://localhost:3000/data";
const CRISTIANO_ID = "68ce4e18ddb691efa5d089f7"; // patient ID

async function sendDummyData() {
  try {
    const dummyData = {
      patient: CRISTIANO_ID,
      heartRate: Math.floor(Math.random() * (100 - 60 + 1)) + 60,
      spo2: Math.floor(Math.random() * (99 - 90 + 1)) + 90,
      weight: Math.floor(Math.random() * (80 - 60 + 1)) + 60,
      systolicBP: Math.floor(Math.random() * (140 - 100 + 1)) + 100,  // ✅ systolic 100–140
      diastolicBP: Math.floor(Math.random() * (90 - 60 + 1)) + 60     // ✅ diastolic 60–90
    };

    const response = await axios.post(API_URL, dummyData);
    console.log("✅ Dummy data sent:", dummyData);
    console.log("📩 Server response:", response.data);

  } catch (err) {
    console.error("❌ Error sending data:", err.message);
  }
}

setInterval(sendDummyData, 10000);






