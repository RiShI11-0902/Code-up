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
  }
};

export const loginUser = async (data) => {
  try {
    const response =  axios.post("http://localhost:8000/user/loginuser", data);
    // return response
    // console.log(response);
    if (response.ok) {
      const res = await response;
      console.log(res);
      return res;
    } else {
      const err = await response;
      return err;
    }
  } catch (error) {
    console.log(error);
  }
};


export const checkuser = async (data) =>{
  try {
    const res = axios.get("http://localhost:8000/checkuser", data)
    if (res.ok) {
      const response = await res
      return response;
    }
  } catch (error) {
    const err = await res;
      return err;
  }
}