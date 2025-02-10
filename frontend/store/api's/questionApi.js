import axios from "axios";

export const questionApi = async (data) => {
  try {
    const res = await axios.post("/question", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
