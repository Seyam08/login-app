import { Navigate } from "react-router-dom";
import { setUsername } from "./credentials";

// password component protect
export function ProtectRoute({ chilldren }) {
  const username = setUsername.value;
  // console.log(username);
  if (!username) {
    return <Navigate to={"/"} replace={true}></Navigate>;
  }
  return chilldren;
}

// profile component protect
export function AuthorizeUser({ chilldren }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to={"/"} replace={true}></Navigate>;
  }
  return chilldren;
}
// recovery component protect
export function RecoveryProtect({ chilldren }) {
  if (setUsername.v === undefined) {
    return <Navigate to={"/"} replace={true}></Navigate>;
  }
  return chilldren;
}
// register protect
export function RegisterProtect({ chilldren }) {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to={"/profile"} replace={true}></Navigate>;
  }
  return chilldren;
}
