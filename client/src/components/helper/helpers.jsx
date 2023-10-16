import axios from "axios";

// base url
axios.defaults.baseURL = "http://localhost:8000/";
// register function
export async function registerUser(credential) {
  try {
    const {
      data: { msg },
    } = await axios.post("api/register", credential);
    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject(error.response.data.error);
  }
}
// login function
export async function loginUser({ username, password }) {
  try {
    if (username) {
      const { data } = await axios.post("api//login", { username, password });
      return Promise.resolve({ data });
    }
  } catch (error) {
    return Promise.reject(error.response.data.error);
  }
}
