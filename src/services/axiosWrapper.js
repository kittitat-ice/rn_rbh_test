import axios from 'axios';
import {getTimeForDebug} from '../utils/util';

// class Response {
//   constructor(statusCode, data, message) {
//     this.statusCode = statusCode;
//     this.data = data;
//     this.message = message;
//   }
// }

// Response Wrapper
// {data, status, message}
// cuz it slow redux, we dont need entire AxiosResponse obj.
// we just need data and status code
/**
 * 
 * @param {string} url full url to server
 * @param {string} method GET,POST,PATCH etc.
 * @param {object} headers ex. {Authorization: Bearer $token}
 * @param {object} body body of POST request
 * @param {object} otherConfig other axios config
 * @param {boolean} useAxiosResponse true to return full axios response
 * @param {number} retry number of retries. default 2 retries
 * @returns {object} {data, status, message} OR axios response object
 */
export const apiRequest = async (
  url,
  method,
  headers = null,
  body = null,
  otherConfig = {},
  useAxiosResponse = false,
  retry = 2,
) => {
  const axiosConfig = {
    url: url,
    method: method,
    headers: headers,
    data: body,
    ...otherConfig,
  };
  console.log(' [API] axios config', axiosConfig);
  console.log(' [API] calling API...', getTimeForDebug());
  try {
    const res = await axios(axiosConfig);
    console.log(' [API] - done', getTimeForDebug());
    console.log(' [API] - response', res);
    const newResObj = {
      data: res.data,
      status: res.status,
      message: res.statusText ?? '',
    };
    return useAxiosResponse ? res : newResObj;
  } catch (error) {
    console.log(' [API] - error', getTimeForDebug());
    console.log(' [API] - response', error);

    // RETRY
    // timeout 1 sec to delay api calling too fast
    if (retry > 0) {
      return new Promise(async resolve => {
        setTimeout(() => {
          console.log(' [API] - retrying ', retry);
          resolve(
            apiRequest(
              url,
              method,
              headers,
              body,
              otherConfig,
              useAxiosResponse,
              retry - 1,
            ),
          );
        }, 1000);
      });
    }
    const newResObj = {
      data: error.response.data,
      status: error.response.status ?? null,
      message: error.message ?? '',
    };
    return useAxiosResponse ? error : newResObj;
  }
};
