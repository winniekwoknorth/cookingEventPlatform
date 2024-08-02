// src/components/ListEvents.jsx
import React, { useContext, useEffect, useState } from 'react';
import { listEvents } from '../api/eventbriteApi';
import { Link } from 'react-router-dom'
import { displayDate } from '../utils/dateUtils';
import { AppContext } from '../App';

const ListEvents = () => {

  const { signups } = useContext(AppContext)

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await listEvents();
        setEvents(data.events)
      } catch (error) {
        setError('Error fetching events');
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>List of Events</h1>
      <table>
        <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>From</th>
          <th>To</th>
          <th>Signed Up?</th>
        </tr>
        </thead>
        <tbody>
        {events.map((event) => {
          
          const isSignedUp = signups.find(s => s.eventId === event.id)
          return (
            <tr key={event.id}>
              <td>{event.id}</td>
              <td><Link to={`/events/${event.id}`}>{event.name.text}</Link></td>
              <td>{displayDate(event.start.utc)}</td>
              <td>{displayDate(event.start.utc)}</td>
              <td>{isSignedUp ? 'Yes' : '-'}</td>
            </tr>
          )}
        )}
        </tbody>
      </table>
    </div>
  );
};

export default ListEvents;
