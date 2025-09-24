// const axios = require('axios');

// // Replace with your backend URL if running on cloud
// const API_URL = "http://localhost:3000/data";

// async function sendDummyData() {
//   try {
//     const dummyData = {
//       patientName: "Cristiano",
//       heartRate: Math.floor(Math.random() * (100 - 60 + 1)) + 60, // random between 60–100 bpm
//       spo2: Math.floor(Math.random() * (99 - 95 + 1)) + 95       // random between 95–99 %
//     };

//     const response = await axios.post(API_URL, dummyData);
//     console.log(" Dummy data sent:", dummyData);
//     console.log(" Server response:", response.data);

//   } catch (err) {
//     console.error(" Error sending data:", err.message);
//   }
// }

// // Send dummy data every 5 seconds
// setInterval(sendDummyData, 5000);
// const axios = require("axios");

// const API_URL = "http://localhost:3000/data";
// const CRISTIANO_ID = "68ce4e18ddb691efa5d089f7"; // Cristiano’s _id

// async function sendDummyData() {
//   try {
//     const dummyData = {
//       patient: CRISTIANO_ID,   // 🔑 send ObjectId, not name
//       heartRate: Math.floor(Math.random() * (100 - 60 + 1)) + 60,
//       spo2: Math.floor(Math.random() * (99 - 95 + 1)) + 95,
//       weight: Math.floor(Math.random() * (80 - 60 + 1)) + 60
//     };

//     const response = await axios.post(API_URL, dummyData);
//     console.log("✅ Dummy data sent:", dummyData);
//     console.log("📩 Server response:", response.data);

//   } catch (err) {
//     console.error("❌ Error sending data:", err.message);
//   }
// }

// setInterval(sendDummyData, 10000);


//Last Updated Here


// const axios = require("axios");

// const API_URL = "http://localhost:3000/data";
// const CRISTIANO_ID = "68ce4e18ddb691efa5d089f7"; // Cristiano’s _id

// function getRandomInt(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// async function sendDummyData() {
//   try {
//     let heartRate, spo2, weight;

//     // 🎲 Randomly decide normal vs abnormal (20% abnormal chance)
//     const scenario = Math.random();

//     if (scenario < 0.15) {
//       // 🔴 Critical scenario
//       heartRate = getRandomInt(160, 190); // dangerously high HR
//       spo2 = getRandomInt(80, 88);        // low SpO₂
//       weight = getRandomInt(50, 55);      // underweight for variety
//       console.log("⚠️ Sending CRITICAL data...");
//     } else if (scenario < 0.35) {
//       // 🟠 Warning scenario
//       heartRate = getRandomInt(110, 130); // elevated HR
//       spo2 = getRandomInt(90, 93);        // borderline SpO₂
//       weight = getRandomInt(85, 95);      // overweight
//       console.log("⚠️ Sending WARNING data...");
//     } else {
//       // 🟢 Normal/stable scenario
//       heartRate = getRandomInt(65, 100);
//       spo2 = getRandomInt(95, 99);
//       weight = getRandomInt(60, 80);
//       console.log("✅ Sending STABLE data...");
//     }

//     const dummyData = {
//       patient: CRISTIANO_ID,
//       heartRate,
//       spo2,
//       weight
//     };

//     const response = await axios.post(API_URL, dummyData);
//     console.log("📩 Server response:", response.data);

//   } catch (err) {
//     console.error("❌ Error sending data:", err.message);
//   }
// }


// setInterval(sendDummyData, 10000);





