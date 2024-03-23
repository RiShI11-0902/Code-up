import axios from "axios";

export const questionApi = async (data) => {
  try {
    const res = await axios.post("http://localhost:8000/question", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
