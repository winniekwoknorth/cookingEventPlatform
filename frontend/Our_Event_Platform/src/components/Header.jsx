import React, { useContext } from 'react';
import { AppContext } from '../App';
import { gapi } from 'gapi-script';
import { checkStaffList } from '../api/staffApi';

const Header = () => {

    const { user, setUser, signIn, signOut } = useContext(AppContext)


    
    return (
        <header>
            <h1>Four Season Cooking</h1>

            <div className='auth'>
                
                {user && <div className='user'>
                        <div><img alt="profile pic" src={user.imageUrl}/></div>
                        <div>{user.email}<br/><b>{user.isStaff ? 'STAFF MEMBER' : ''}</b></div></div>}

                {user && <button onClick={signOut}>Sign out</button>}
                {!user && <button onClick={signIn}>Sign in</button>}
            </div>

            
        </header>
    );
};

export default Header;
