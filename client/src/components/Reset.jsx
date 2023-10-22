import { useFormik } from "formik";
import React from "react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
("react-router-dom");
// import styles
import styles from "../styles/Username.module.css";
// import helpers
import { setUsername } from "../helper/credentials";
import { resetPassword } from "../helper/helpers";
import { confirmPasswordValidate } from "../helper/validate";
import useFetch from "../hooks/useFetch";

export default function Reset() {
  const [{ loading, apiRes, status, serverError }] = useFetch(
    "/createResetSession"
  );
  const navigate = useNavigate();
  const { username } = setUsername.v;

  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validate: confirmPasswordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values, { resetForm }) => {
      // console.log(values);
      let resetPromise = resetPassword({ username, password: values.password });

      toast.promise(resetPromise, {
        loading: "Updating...",
        success: <b>Reset Successfully...!</b>,
        error: <b>Could not Reset!</b>,
      });

      resetPromise.then(function () {
        navigate("/password");
      });
      resetForm({ values: "" });
    },
  });
  if (loading) return <h1 className="text-2xl font-bold">isLoading</h1>;
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;
  if (status && status !== 201)
    return <Navigate to={"/password"} replace={true}></Navigate>;
  return (
    <div className="container mx-auto">
      <Toaster position="top-right" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-3xl font-bold">Reset password</h4>
            <span className="py-3 text-1xl w-2/3 text-center text-gray-500">
              Enter your new password
            </span>
          </div>

          <form onSubmit={formik.handleSubmit} className="py-1">
            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("password")}
                type="text"
                placeholder="New Password"
                className={styles.textbox}
              />
              <input
                {...formik.getFieldProps("confirm_password")}
                type="text"
                placeholder="Confirm password"
                className={styles.textbox}
              />
              <button className={styles.btn} type="submit">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
