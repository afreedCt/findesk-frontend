import axios from "axios";
const commonAPI = async (httpMethod, url, data) => {
  // const reqConfig = {
  //   method: httpMethod,
  //   url
  // };
  //  if (data) {
  //   reqConfig.data = data;
  // }
  try {
    // const res= await axios(reqConfig)
    // return res
    let response;

    if (httpMethod.toLowerCase() === 'delete') {
      response = await axios.delete(url, { data });
    } else {
      response = await axios({
        method: httpMethod,
        url,
        data
      });
    }

    return response;

    
  } catch (error) {
    console.log("error coming",error);
    return error
  }
};

export default commonAPI;
