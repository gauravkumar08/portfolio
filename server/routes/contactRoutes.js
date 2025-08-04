const express = require('express');
const Contact = require('../models/Contact');
const router = express.Router();

// POST route for submitting contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(200).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting form' });
  }
});

module.exports = router;
