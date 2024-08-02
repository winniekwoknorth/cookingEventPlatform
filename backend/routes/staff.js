const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Path to staff list
const dataDir = path.join(__dirname, '..', 'data');
const staffFilePath = path.join(dataDir, 'staff.json');

// Ensure the data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Function to read the current signups from the file
const readStaff = () => {
  if (!fs.existsSync(staffFilePath)) {
    return [];
  }
  const staffData = fs.readFileSync(staffFilePath);
  return JSON.parse(staffData);
};

// Function to write the signups to the file
const writeSignups = (signups) => {
  fs.writeFileSync(signupsFilePath, JSON.stringify(signups, null, 2));
};

// Check if staff member
router.post('/staff', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Missing email' });
  }

  const staff = readStaff();
  
  const found = staff.find(s => s.email === email)

  res.json({ isStaff: !!found });
});

module.exports = router;
