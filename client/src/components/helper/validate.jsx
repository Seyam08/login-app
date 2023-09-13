import toast from "react-hot-toast";

// username validation
export async function usernameValidate(values) {
  const error = {};

  if (!values.username) {
    error.username = toast.error("Username Required...!");
  } else if (values.username.includes(" ")) {
    error.username = toast.error("Invalid Username...!");
  }

  return error;
}
