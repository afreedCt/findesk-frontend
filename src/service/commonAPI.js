import axios from "axios";
const commonAPI = async (httpMethod, url, data) => {
  const reqConfig = {
    method: httpMethod,
    url,
    data,
  };
  return await axios(reqConfig)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export default commonAPI;
