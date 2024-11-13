import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import usernameIcon from '../assets/username-icon.png'; // Import username icon
import passwordIcon from '../assets/password-icon.png'; // Import password icon

const Login = ({ onLoginSuccess }) => {
  const { setUser } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');

  const storeUserData = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3001/users?username=${username}&password=${password}`);
      
      if (response.data.length > 0) {
        const userData = response.data[0];
        setUser(userData);
        storeUserData(userData);
        onLoginSuccess();
      } else {
        setError('Login failed. Incorrect username or password.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const checkUser = await axios.get(`http://localhost:3001/users?username=${username}`);
      
      if (checkUser.data.length > 0) {
        setError('User already exists. Please login.');
      } else {
        const newUser = { username, password };
        const response = await axios.post('http://localhost:3001/users', newUser);
        
        setUser(response.data);
        storeUserData(response.data);
        onLoginSuccess();
      }
    } catch (err) {
      setError('Sign-up failed. Please try again.');
    }
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setError('');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{isSignUp ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={isSignUp ? handleSignUp : handleLogin} style={styles.form}>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Username:</label>
          <div style={styles.inputWithIcon}>
            <img src={usernameIcon} alt="Username Icon" style={styles.icon} />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={styles.input}
            />
          </div>
        </div>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Password:</label>
          <div style={styles.inputWithIcon}>
            <img src={passwordIcon} alt="Password Icon" style={styles.icon} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
        </div>
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>
          {isSignUp ? 'Sign Up' : 'Login'}
        </button>
      </form>

      <p style={styles.toggleText}>
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}
        <span style={styles.toggleLink} onClick={toggleForm}>
          {isSignUp ? ' Login here' : ' Sign up here'}
        </span>
      </p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.2)',
    backgroundImage: 'url("https://png.pngtree.com/background/20221205/original/pngtree-realistic-film-strip-with-popcorn-and-movie-ticket-picture-image_1981841.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  title: {
    marginBottom: '0.5px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputContainer: {
    marginBottom: '10px',
    width: '300px',
  },
  label: {
    fontSize: '20px',
    marginBottom: '10px',
  },
  inputWithIcon: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    width: '20px',
    height: '20px',
    marginRight: '10px', // Space between icon and input
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    width: '100%',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    backgroundColor: 'rgba(0,0,0,0.7)',
    color: 'white',
    cursor: 'pointer',
  },
  toggleText: {
    marginTop: '10px',
    color: '#fff',
  },
  toggleLink: {
    color: '#00f',
    cursor: 'pointer',
    marginLeft: '5px',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
};

export default Login;
