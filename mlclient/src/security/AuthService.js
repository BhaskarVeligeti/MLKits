/* eslint-disable no-undef */
export default class AuthService {
  getProfile = () => {
    let user = localStorage.getItem('user');
    // console.log('user:', user);
    return user;
  };
  loggedIn = () => {
    let user = localStorage.getItem('user');
    // console.log('loggedIn :',user)
    if (user === null || user === '') {
      return false;
    } else {
      return true;
    }
  };

  logout = () => {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('user');
  };
}
