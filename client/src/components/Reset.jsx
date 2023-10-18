import { useFormik } from "formik";
import React from "react";
import { Toaster } from "react-hot-toast";
// import styles
import styles from "../styles/Username.module.css";
// import helpers
import { confirmPasswordValidate } from "../helper/validate";

export default function Reset() {
  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validate: confirmPasswordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      resetForm({ values: "" });
    },
  });

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
