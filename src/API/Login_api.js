import axios from 'axios';

export const WalletLogin = payload => {
  const URL = `${process.env.REACT_APP_BACKEND_URL}/user/wallet-login`;
  return axios(URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json', // whatever you want
      "Access-Control-Allow-Origin": "*"
    },
    data: payload,
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};