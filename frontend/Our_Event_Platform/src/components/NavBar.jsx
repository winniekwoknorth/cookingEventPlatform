import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../App';

const NavBar = () => {

    const { user } = useContext(AppContext)
    return (
        <nav>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/events">List of Events</NavLink></li>
                {!!user && !!user.isStaff && <li><NavLink to="/createevent">Add Event</NavLink></li>}
               
            </ul>
        </nav>
    );
};

export default NavBar;
