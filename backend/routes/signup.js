const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Path to store signups
const dataDir = path.join(__dirname, '..', 'data');
const signupsFilePath = path.join(dataDir, 'signups.json');

// Ensure the data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Function to read the current signups from the file
const readSignups = () => {
  if (!fs.existsSync(signupsFilePath)) {
    return [];
  }
  const signupsData = fs.readFileSync(signupsFilePath);
  return JSON.parse(signupsData);
};

// Function to write the signups to the file
const writeSignups = (signups) => {
  fs.writeFileSync(signupsFilePath, JSON.stringify(signups, null, 2));
};

// Handle signup
router.post('/signup', (req, res) => {
  const { eventId, email, remove } = req.body;

  if (!eventId || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const signups = readSignups();

  if (remove) {
    const newSignups = signups.filter(s => !(s.eventId === eventId && s.email === email))

    writeSignups(newSignups)
  }
  else {
    const newSignups = [...signups, { eventId, email }];
    writeSignups(newSignups)
  }

  res.json({ message: 'Signup change successful' });
});


router.post('/signups', (req, res) => {
  const { email } = req.body;
  
  if ( !email) {
    return res.status(400).json({ error: 'Missing email' });
  }

  const signups = readSignups();

  const matchingSignups = signups.filter(s => s.email === email)

  res.json({ signups: matchingSignups });
});

module.exports = router;
