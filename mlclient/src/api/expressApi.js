/* eslint-disable no-console,no-undef */
import axios from 'axios';

let url = 'http://localhost:4002'
const instance = axios.create({
  baseURL: url

})

/** 
 *  it is more of a checkpoint for every http action. Every api call that has been made, is passed through this interceptor.
 */
// Add a request interceptor
instance.interceptors.request.use(
  async config => {
    const user = localStorage.getItem('user');
    if (user) {
      const _userObj = JSON.parse(user)  // convert into javascript object
      // console.log('_userObj...', _userObj);
      config.headers.Authorization = `Bearer ${_userObj.token}`;
      // console.info("config : ", config);
      return config;
    }
    else {
      // console.log('There is not token yet...');
      return config;
    }
  },
  err => {
    // Do something with request error
    return Promise.reject(err);
  }
);

export default instance;