import axios from "axios";

export const createUser = async (data) => {
  try {
    const response = await axios.post(
      "/user/createuser", //http://localhost:8000/
      data
    );
    return response;
  } catch (error) {
    console.log(error);
    if (error.response.data.flashMessages) {
      // const err = response;
      console.log(error.response.data.flashMessages);
      return error.response.data.flashMessages[0];
    }
  }
};

export const loginUser = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/user/loginuser",
      data
    ); //http://localhost:8000
    // return response
    // console.log(response);
    if (response.status == 200) {
      const res = response;
      console.log(res);
      return res.data;
    } else {
      console.log("errorrrr");
    }
  } catch (error) {
    console.log(error.response.data.flashMessages);
    if (error.response.data.flashMessages) {
      // const err = response;
      console.log(error.response.data.flashMessages);
      return error.response.data.flashMessages;
    }
  }
};

export const checkAuth = async ()=>{
  const response =  axios.get("http://localhost:8000/user/checkuser")
  console.log(response);
}

export const logout = async (data) => {
  try {
    const res = axios.get("/user/logout"); //http://localhost:8000
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const checkUser = async (id) => {
  
  const response = await axios.post(
    "http://localhost:8000/user/checkuser", {id:id}
  ); //http://localhost:8000
  // return response
  // console.log(response);
  if (response.status == 200) {
    const res = response;
    console.log(res);
    return res.data;
  } else {
    console.log("errorrrr");
  }
   
};
