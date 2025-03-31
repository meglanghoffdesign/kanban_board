import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('User information not retrieved, check network tab!');
    }

    // Check if the token exists in the response and store it in localStorage
    if (data.token) {
      localStorage.setItem('id_token', data.token);
    }

    return data.token;  // Return token for further use if needed
  } catch (err) {
    console.log('Error from user login: ', err);
    return Promise.reject('Could not fetch user info');
  }
};

export { login };