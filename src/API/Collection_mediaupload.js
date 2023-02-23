
import axios from 'axios';

export const CollectionMediaUpload = payload => {
  const URL = `${process.env.REACT_APP_BACKEND_URL}/media/collectionlogo`;
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