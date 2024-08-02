import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './components/Home';
import ListEvents from './components/ListEvents';
import SignIn from './components/SignIn';
import CreateEventForm from './components/CreateEventForm';
import SingleEvent from './components/SingleEvent';
import './styles.css';
import { checkStaffList } from './api/staffApi';
import { gapi } from 'gapi-script';
import { getSignups } from './api/signupApi';
import { signupEvent } from './api/eventbriteApi';


export const AppContext = createContext({});



const App = () => {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([])
  const [signups, setSignups] = useState([])

  useEffect(() => {
    // when the App mounts...
    
    // check if the user exists in localstorage and save to context
    const userString = localStorage.getItem('google_user')
    if (userString) {
      const user = JSON.parse(userString)
      setUser(user)

      updateSignups(user.email)
    }


    // initialise the google client
    const initClient = () => {
      gapi.client.init({
        apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
        clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: 'https://www.googleapis.com/auth/calendar profile',
      });
    };

    gapi.load('client:auth2', initClient);

  }, [])




  const signIn = async () => {

    try {
        const auth2 = gapi.auth2.getAuthInstance();
  
        const user = await auth2.signIn();
        const profile = user.getBasicProfile();
        // check if user's email is in staff list
        const status = await checkStaffList({email: profile.getEmail()})
  
        const userToStore = { 
            id: profile.getId(),
            email: profile.getEmail(),
            name: profile.getName(), 
            imageUrl: profile.getImageUrl(),
            isStaff: status.isStaff 
        }
  
        setUser(userToStore);
        localStorage.setItem('google_user', JSON.stringify(userToStore))
        
        // get signups
        updateSignups(profile.getEmail())
    }
    catch (e) {
        console.error('Sign in error', e)
    }
  
  }

  const updateSignups = async (email) => {
    const response = await getSignups({email})
    setSignups(response.signups)
  }
  
  const signOut = async () => {
    const auth2 = gapi.auth2.getAuthInstance();
  
    await auth2.signOut();
    setUser(null);
    localStorage.setItem('google_user', null)
  }

  const toggleSignup = async (data) => {
    try {
      
        signupEvent(data)
        if (data.remove) {
          const newSignups = signups.filter(s => !(s.eventId === data.eventId && s.email === data.email))
          setSignups(newSignups)
        } else {
          const newSignups = [...signups, data]
          setSignups(newSignups)
        }
        
        

    }
    catch (e) {
      console.error(e)
    }
  }
  

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('google_access_token'); // Clear stored token
    localStorage.removeItem('google_user');
  };

  return (
      <Router>
        <AppContext.Provider value={{
          user,
          events,
          signups,
          setEvents,
          signIn,
          signOut,
          toggleSignup,
        }}>
        <div>
          <Header />
          <NavBar user={user} handleSignOut={handleSignOut}/>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<ListEvents />} />
              <Route 
                path="/events/:eventId" 
                element={<SingleEvent  />} 
              />
              <Route path="/createevent" element={<CreateEventForm />} />
            </Routes>
          </main>
          <Footer />
        </div>
        </AppContext.Provider>
      </Router>
 
  );
};

export default App;