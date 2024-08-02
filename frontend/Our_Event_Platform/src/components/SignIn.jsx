import { useContext } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode} from 'jwt-decode'
import { checkStaffList } from '../api/staffApi';
import { AppContext } from '../App';

const SignIn =  () => {

  const { user, setUser, setAccessToken } = useContext(AppContext)

  const handleLoginSuccess = async (response) => {


    // Decode the JWT to get user information
    const decoded = jwtDecode(response.credential);

    // check staff list
    const status = await checkStaffList({email: decoded.email})

    const user = { email: decoded.email, name: decoded.name, isStaff: status.isStaff }
    setUser(user);
    setAccessToken(response.credential);
    // Store the credential (JWT)
    localStorage.setItem('google_access_token', response.credential);
    localStorage.setItem('google_user', JSON.stringify(user))
  };

  const handleLoginFailure = (response) => {
    console.error(response);
  };


  if (user) {

    return (
      <div>
        <h2>You are signed in as {user.name}</h2>
      </div>
    )
  }
  return (
    <div>
      <h2>Sign In with Google</h2>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onFailure={handleLoginFailure}
      />
    </div>
  );
};

export default SignIn;
