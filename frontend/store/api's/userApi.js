import  axios  from "axios"

export const createUser = async (data)=>{
    try {
        const response = await axios.post("http://localhost:8000/user/createuser", data)
        return response   
    } catch (error) {
        console.log(error);
    }
}