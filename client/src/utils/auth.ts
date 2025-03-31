import { type JwtPayload, jwtDecode } from 'jwt-decode';
import type { UserData } from '../interfaces/UserData';

class AuthService {
  getProfile() {
    const token = this.getToken();
    if (token) {
      return jwtDecode<UserData>(token);  // Decoding the token if it's available
    }
    return null;
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);  // Corrected: returns true if the token exists and is not expired
  }

  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      // Checking if the token is expired by comparing the expiration time with the current time
      if (decoded?.exp && decoded?.exp < Date.now() / 1000) {
        return true;  // Token is expired
      }
    } catch (err) {
      return false;  // If error in decoding, assume it's not expired
    }
    return false;  // Token is valid
  }

  getToken(): string | null {
    const token = localStorage.getItem('id_token');
    console.log('Retrieved Token:', token);  // Log the token to confirm
    return token;
  }

  login(idToken: string) {
    console.log('Received Token:', idToken);  // Log the token received
    if (idToken) {
      console.log('Storing token:', idToken); // Log before storing
      localStorage.setItem('id_token', idToken);
      window.location.href = '/';// Force a full page refresh and redirect
    } else {
      console.log('No token received');
    }
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();
