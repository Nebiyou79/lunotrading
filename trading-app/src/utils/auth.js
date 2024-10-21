import axios from 'axios';

const API_URL = 'https://116.203.108.180:5000/api/auth/'; // Adjust based on your backend URL

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}login`, { email, password });
  
  if (response.data.token && response.data.userId) { // Assuming userId is in the response
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId); // Save userId to localStorage
      console.log('Token and UserID saved to localStorage:', response.data.token, response.data.userId);
  }

  return response.data;
};

export const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirect to login page
};

export const register = async (email, password) => {
    return await axios.post(`${API_URL}register`, { email, password });
};

export const getUserRole = () => {
    if (typeof window !== 'undefined') { // Check if window is defined (i.e., in browser)
        const token = localStorage.getItem('token');
        if (token) {
            const userData = JSON.parse(atob(token.split('.')[1])); // Decode JWT token
            return userData.role; // Assuming the role is stored in the token
        }
    }
    return null; // Return null during SSR
};
export const isAuthenticated = () => {
    if (typeof window !== 'undefined') { // Check if we're running in the browser
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken = JSON.parse(atob(token.split('.')[1]));
          const currentTime = Date.now() / 1000; // Current time in seconds
          if (decodedToken.exp > currentTime) {
            return { loggedIn: true, role: decodedToken.role }; // Return loggedIn and role
          }
        } catch (error) {
          console.error('Invalid token format:', error);
        }
      }
    }
    return { loggedIn: false, role: null }; // Return false and null role if no valid token
  };
  
  

