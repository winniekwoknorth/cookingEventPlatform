console.log('server.js is running'); 

require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const eventsRouter = require('./routes/events');
const signupRouter = require('./routes/signup');
const staffRouter = require('./routes/staff');
const app = express();
const bodyParser = require('body-parser')

const port = process.env.PORT || 5000;

if (!process.env.REACT_APP_EVENTBRITE_TOKEN) {
  console.error('ERROR: REACT_APP_EVENTBRITE_TOKEN is not set in the environment variables.');
  process.exit(1);
} else {
  console.log('Eventbrite Token:', process.env.REACT_APP_EVENTBRITE_TOKEN);
}
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Eventbrite Event Creator API');
});

// Use the events route for /api/events
app.use('/api', eventsRouter);

// Use the events route for /api/signup
app.use('/api', signupRouter)

// Use the events route for /api/staff
app.use('/api', staffRouter)

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
