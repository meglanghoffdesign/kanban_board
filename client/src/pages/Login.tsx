import { useState, FormEvent, ChangeEvent } from "react";
import Auth from '../utils/auth';
import { login } from "../api/authAPI";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  
  const [error, setError] = useState(''); // For handling error messages

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(''); // Clear any existing error before submitting
  
    try {
      const data = await login(loginData);
      console.log('Received data:', data);  // Log the response from the backend
  
      // Now directly use the data (since it's the token)
      const token = data;
      console.log('Token from response:', token);  // Log the token
  
      if (token) {
        Auth.login(token);  // Pass the token to the Auth helper
      } else {
        console.log('No token received from the backend');
      }
    } catch (err) {
      console.error('Failed to login', err);
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label >Username</label>
        <input 
          type='text'
          name='username'
          value={loginData.username || ''}
          onChange={handleChange}
        />
      <label>Password</label>
        <input 
          type='password'
          name='password'
          value={loginData.password || ''}
          onChange={handleChange}
        />
        {error && <div className='error-message'>{error}</div>} {/* Display error message if any */}
        <button type='submit'>Submit Form</button>
      </form>
    </div>
    
  )
};

export default Login;
