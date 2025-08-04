const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const contactRoutes = require('./routes/contactRoutes');

dotenv.config();
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(bodyParser.json());

// ✅ Serve frontend static files from ../client
app.use(express.static(path.join(__dirname, '../client')));

// ✅ Route to serve index.html on root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// ✅ API route
app.use('/api/contact', contactRoutes);

// (Optional fallback for SPAs)
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/index.html'));
// });

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
