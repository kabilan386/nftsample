import axios from 'axios';

export const WalletLogin = payload => {
  const URL = `http://localhost:6006/user/wallet-login`;
  return axios(URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json', // whatever you want
    },
    data: payload,
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};