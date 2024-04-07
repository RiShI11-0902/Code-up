import axios from "axios";

export const createUser = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/user/createuser",
      data
    );
    return response;
  } catch (error) {
    console.log(error);
    if(error.response.data.flashMessages) {
      // const err = response;
      console.log(error.response.data.flashMessages);
      return error.response.data.flashMessages[0]
    }
  }
};

// export const loginUser = async (data) => {
//   const err = null;
//   try {
//     const response =  axios.post("http://localhost:8000/user/loginuser", data);
//     // return response
//     // console.log(response);
//     if (response.ok) {
//       const res = await response;
//       console.log(res);
//       return res.data;
//     }else {
//       // const err = await response;
//       // console.log(err);
//       // return err;
//       const err = (await response).status
//       return err
//     }
//   } catch (error) {
//     console.log(error);
//     err = error.message
//     return err
//   }
// };

export const loginUser = async (data) => {

  try {
    const response = await axios.post("http://localhost:8000/user/loginuser", data);
    // return response
    // console.log(response);
    if (response.status == 200) {
      const res = response;
      console.log(res);
      return res;
    }  else {
      console.log("errorrrr");
    }
  } catch (error) {
    console.log(error.response.data.flashMessages);
    if(error.response.data.flashMessages) {
      // const err = response;
      console.log(error.response.data.flashMessages);
      return error.response.data.flashMessages
    }
  }
 
    
 
};

export const checkuser = async (data) => {
  try {
    const res = axios.get("http://localhost:8000/checkuser", data);
    if (res.ok) {
      const response = await res;
      return response;
    }
  } catch (error) {
    const err = await res;
    return err;
  }
};

export const logout = async (data) => {
  try {
    const res = axios.get("http://localhost:8000/user/logout");
    return res;
  } catch (err) {
    console.log(err);
  }
};
