import { Navigate } from "react-router-dom";
import { setUsername } from "./credentials";

export function ProtectRoute({ chilldren }) {
  const username = setUsername.value;
  console.log(username);
  if (!username) {
    return <Navigate to={"/"} replace={true}></Navigate>;
  }
  return chilldren;
}
