import axios from "axios";

const ApiHandler = (url, method, data = null, headers = null) => {
  return axios({
    url,
    method,
    data,
    headers
  })
};

export default ApiHandler;
