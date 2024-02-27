import axios from "axios";

export const questionApi = async (data) => {
  try {
    const res = await axios.get("http://localhost:8000/question");
    return res;
  } catch (error) {
    console.log(error);
  }
};
