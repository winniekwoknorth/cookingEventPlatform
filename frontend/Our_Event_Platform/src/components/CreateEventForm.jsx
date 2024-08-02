import React, { useState, useEffect } from 'react';
import { createEvent } from '../api/eventbriteApi';
import { formatDate } from '../utils/dateUtils';
import { fetchOrganizationId } from '../api/eventbriteApi';

const CreateEventForm = () => {
  const [organizationId, setOrganizationId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect(() => {
    const getOrganizationId = async () => {
      try {
        const id = await fetchOrganizationId();
        setOrganizationId(id);
      } catch (error) {
        setError('Error fetching organization ID');
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getOrganizationId();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const eventName = formData.get('eventName');
    const startDate = formData.get('startDate');
    const endDate = formData.get('endDate');
    const capacity = formData.get('capacity')
    const summary = formData.get('summary')

    const eventData = {
      organizationId,
      eventName,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      capacity,
      summary
    };

    try {
      const response = await createEvent(eventData);
      setFeedbackMessage('Event created successfully!');
    } catch (error) {
      setFeedbackMessage('Error creating event: ' + error.message);
      console.error('Error creating event:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {feedbackMessage && <div>{feedbackMessage}</div>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="eventName" placeholder="Event Name" required />
        <input type="datetime-local" name="startDate" required />
        <input type="datetime-local" name="endDate" required />
        <input type="number" name="capacity" placeholder="Capacity" required />
        <input type="text" name="summary" placeholder="Summary" required />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEventForm;
