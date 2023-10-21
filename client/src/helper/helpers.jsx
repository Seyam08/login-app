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
      const { data } = await axios.post("api/login", { username, password });
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
// update user profile
export async function userUpdate(updatedData) {
  try {
    const token = localStorage.getItem("token");
    const data = await axios.put("api/updateuser", updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject(error);
  }
}
// generate otp
export async function generateOTP(username) {
  try {
    const {
      data: { code },
    } = await axios.get("/api/generateOTP", { params: { username } });

    return Promise.resolve(code);
  } catch (error) {
    return Promise.reject({ error });
  }
}
/** verify OTP */
export async function verifyOTP({ username, code }) {
  try {
    const { data } = await axios.get("/api/verifyOTP", {
      params: { username, code },
    });
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error.response.data.error);
  }
}
