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

// password validation
export async function passwordValidate(values) {
  const error = {};
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (!values.password) {
    error.password = toast.error("Password Required...!");
  } else if (values.password.includes(" ")) {
    error.password = toast.error("Wrong Password...!");
  } else if (values.password.length < 4) {
    error.password = toast.error(
      "Password must be more than 4 characters long"
    );
  } else if (!specialChars.test(values.password)) {
    error.password = toast.error("Password must have special character");
  }

  return error;
}

// reset password validation
export async function confirmPasswordValidate(values) {
  const error = {};
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (!values.password) {
    error.password = toast.error("Password Required...!");
  } else if (values.password.includes(" ")) {
    error.password = toast.error("Wrong Password...!");
  } else if (values.password.length < 4) {
    error.password = toast.error(
      "Password must be more than 4 characters long"
    );
  } else if (!specialChars.test(values.password)) {
    error.password = toast.error("Password must have special character");
  }

  if (values.password !== values.confirm_password) {
    error.exist = toast.error("Password does not match...!");
  }

  return error;
}

// registration validation
export async function registrationValidate(values) {
  const error = {};

  // username
  if (!values.username) {
    error.username = toast.error("Username Required...!");
  } else if (values.username.includes(" ")) {
    error.username = toast.error("Invalid Username...!");
  }

  // password
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (!values.password) {
    error.password = toast.error("Password Required...!");
  } else if (values.password.includes(" ")) {
    error.password = toast.error("Wrong Password...!");
  } else if (values.password.length < 4) {
    error.password = toast.error(
      "Password must be more than 4 characters long"
    );
  } else if (!specialChars.test(values.password)) {
    error.password = toast.error("Password must have special character");
  }

  // email
  if (!values.email) {
    error.email = toast.error("Email Required...!");
  } else if (values.email.includes(" ")) {
    error.email = toast.error("Wrong Email...!");
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    error.email = toast.error("Invalid email address...!");
  }

  return error;
}
