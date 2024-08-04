import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { singleEvent, getEventCapacity } from '../api/eventbriteApi'; // Consolidated API imports

import { gapi } from 'gapi-script'
import { displayDate } from '../utils/dateUtils';
import { AppContext } from '../App';
import '../App.css'

const SingleEvent = () => {

  const { signups, user, toggleSignup } = useContext(AppContext)

  const { eventId } = useParams(); // Use useParams to get eventId from the URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [signupFeedback, setSignupFeedback] = useState(''); // Fixed state variable name
  const [calendarFeedback, setCalendarFeedback] = useState(''); 
  const [capacity, setCapacity] = useState(null); // State for capacity details

  const isSignedUp = signups.find(s => s.eventId === eventId)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await singleEvent(eventId);
        setEvent(eventData);

        const capacityData = await getEventCapacity(eventId);
        setCapacity(capacityData);
      } catch (error) {
        setError('Error fetching event details or capacity');
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);



  const handleSignup = async () => {
    setSignupFeedback('Signing up...');
    try {
      await toggleSignup({ eventId, email: user.email });
      setSignupFeedback('Signup successful!');
    } catch (error) {
      console.error('Error signing up:', error.message);
      setSignupFeedback('Signup failed. Please try again.');
    }
  }

  const handleCancel = async () => {
    setSignupFeedback('Cancelling sign up...');
    try {
      await toggleSignup({ eventId, email: user.email, remove: true });
      setSignupFeedback('Cancelled signup Successful!');
    } catch (error) {
      console.error('Error cancelling:', error.message);
      setSignupFeedback('Cancellation failed. Please try again.');
    }
  }

  const handleAddToCalendar = async () => {
    if (!event) return;
    const eventDetails = {
      id: eventId,
      summary: event.name.text,
      location: 'London',
      description: "Four Season Cooking",
      start: {
        dateTime: event.start.utc,
        timeZone: 'Europe/London',
      },
      end: {
        dateTime: event.end.utc,
        timeZone: 'Europe/London',
      },
      attendees: [
      {email: user.email},
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 10 },
        ],
      },
    };

    setCalendarFeedback('Adding to your calendar...');
    try {
      const response = await gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: eventDetails,
      });
      console.log('Event created: ', response);
      setCalendarFeedback('Added successfully!');
    } catch (error) {
      console.error('Error creating event: ', error);

      

      setCalendarFeedback('Unable to add. Event may already exist');
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
      {event.logo && event.logo.url && (
      <div className="image-container">
      <img
        alt={event.logo.altText || 'Event logo'}
        src={event.logo.url}
        width="400" // Set a default width
        height="300" // Set a default height
        role="img"
        aria-label={event.logo.altText || 'Event logo'}
      />
    </div>
      )}
      <h1>{event.name.text}</h1>
      <p>{event.description.text}</p>
      <p>Start time: {displayDate(event.start.utc)}</p>
      <p>End Time: {displayDate(event.end.utc)}</p>
      <p>Summary: {event.summary}</p>
      <br /><br />
      {isSignedUp ? (
        <p>You are signed up to this event!</p>
      ) : (
        <p>You are NOT signed up to this event</p>
      )}
      <br /><br />
      {user && !isSignedUp && (
        <button
          onClick={handleSignup}
          aria-live="assertive"
          aria-label="Sign up for this event"
        >
          Sign Up
        </button>
      )}
      {user && isSignedUp && (
        <button
          onClick={handleCancel}
          aria-live="assertive"
          aria-label="Cancel your signup for this event"
        >
          Cancel event
        </button>
      )}
      {!user && <p>Sign in above to sign up for this event</p>}
      {user && isSignedUp && (
        <button
          onClick={handleAddToCalendar}
          aria-live="assertive"
          aria-label="Add this event to your Google Calendar"
        >
          Add Event to Google Calendar
        </button>
      )}
      <br /><br />
      {signupFeedback && (
        <p aria-live="polite">{signupFeedback}</p>
      )}
      {calendarFeedback && (
        <p aria-live="polite">{calendarFeedback}</p>
      )}
    </div>
  );
};

export default SingleEvent;
