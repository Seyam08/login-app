import axios from "axios";
import jwt_decode from "jwt-decode";

// base url
axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_SERVER_URL;
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
// get username
export async function getUsername() {
  const token = localStorage.getItem("token");
  if (!token) {
    return Promise.reject("couldn't find the token");
  }
  let decodedToken = jwt_decode(token);
  return decodedToken;
}