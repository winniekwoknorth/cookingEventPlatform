const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const API_BASE_URL = 'https://www.eventbriteapi.com/v3';

// Function to get organization ID (define this function as it's used in the /events route)
const getOrganizationId = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/me/organizations`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_EVENTBRITE_TOKEN}`
      }
    });

    return response.data.organizations[0].id;
  } catch (error) {
    console.error('Error fetching organization ID:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to list events
const listEvents = async (organizationId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/organizations/${organizationId}/events/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_EVENTBRITE_TOKEN}`
      }
    });
    return response.data.events;
  } catch (error) {
    console.error('Error fetching events:', error.message);
    throw error;
  }
};

router.get('/organizationId', async (req, res) => {
  try {
    const organizationId = await getOrganizationId();
    res.json({ organizationId });
  } catch (error) {
    console.error('Error in /organizationId route:', error);
    res.status(500).json({ error: 'Failed to fetch organization ID' });
  }
})

// Route to list events
router.get('/events', async (req, res) => {
  try {
    const organizationId = await getOrganizationId();
    const events = await listEvents(organizationId);
    res.json({ events });
  } catch (error) {
    console.error('Error in /events route:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Route to list organizations
router.get('/listOrganizations', async (req, res) => {
  try {
    if (!process.env.REACT_APP_EVENTBRITE_TOKEN) {
      throw new Error('Eventbrite token is not set in environment variables.');
    }
    const response = await axios.get(`${API_BASE_URL}/users/me/organizations`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_EVENTBRITE_TOKEN}`
      }
    });
    console.log('Organizations response:', response.data);
    return res.json(response.data);
  } catch (error) {
    console.error('Error fetching organizations:', error.message, error.stack);
    res.status(500).json({ error: error.response ? error.response.data : error.message });
  }
});

// Route to get event details
router.get('/events/:eventId', async (req, res) => {
  const { eventId } = req.params;
  try {
    const response = await axios.get(`${API_BASE_URL}/events/${eventId}/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_EVENTBRITE_TOKEN}`
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching event details:', error.message);
    res.status(500).json({ error: 'Failed to fetch event details' });
  }
});
// Route to create an event
router.post('/create', async (req, res) => {
  const {eventName, startDate, endDate, capacity, summary} = req.body;

  try {
    const organizationId = await getOrganizationId(); // Fetch the organization ID
    console.log('Using Organization ID:', organizationId); // Log the organization ID
    
    const eventPayload = {
      event: {
        name: { html: eventName },
        start: { utc: startDate, timezone: 'UTC' },
        end: { utc: endDate, timezone: 'UTC' },
        online_event: true,
        capacity: capacity,
        summary: summary,
        currency: 'USD'
      }
    };
    console.log('Event payload:', eventPayload);
    const response = await axios.post(`${API_BASE_URL}/organizations/${organizationId}/events/`, eventPayload, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_EVENTBRITE_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error creating event:', error.message, error.stack);
    res.status(500).json({ error: error.response ? error.response.data : error.message });
  }
});

module.exports = router;
