import {apiRequest} from './axiosWrapper';

const baseUrl = 'https://todo-list-api-mfchjooefq-as.a.run.app/todo-list';

/**
 * 
 * @param {string} status - TODO, DOING, DONE
 * @param {int} offset
 * @param {int} limit 
 * @param {string} sortBy 
 * @param {boolean} isAsc 
 * @returns 
 */
export const GET_tasks = (
  status,
  offset,
  limit,
  sortBy,
  isAsc,
  // token
) => {
  return new Promise(resolve => {
    // const headers = {
    //   Authorization: 'Bearer ' + token,
    // };
    const query = `?status=${encodeURIComponent(
      status,
    )}&offset=${encodeURIComponent(offset)}&limit=${encodeURIComponent(
      limit,
    )}&sortBy=${encodeURIComponent(sortBy)}&isAsc=${encodeURIComponent(isAsc)}`;
    const url = baseUrl + query;
    const res = apiRequest(url, 'GET');
    resolve(res);
  });
};
