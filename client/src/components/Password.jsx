import { useFormik } from "formik";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
// import styles
import styles from "../styles/Username.module.css";
// import helpers
import { passwordValidate } from "./helper/validate";

export default function Password() {
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: passwordValidate,
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
            <h4 className="text-3xl font-bold">Hello Again</h4>
            <span className="py-3 text-1xl w-2/3 text-center text-gray-500">
              Enter your password
            </span>
          </div>

          <form onSubmit={formik.handleSubmit} className="py-1">
            {/* <div className="profile flex justify-center py-4">
              <img src={avatar} alt="avatar" className={styles.profile_img} />
            </div> */}

            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("password")}
                type="text"
                placeholder="Password"
                className={styles.textbox}
              />
              <button className={styles.btn} type="submit">
                Sign in
              </button>
            </div>

            <div className="text-center py-4">
              <span>
                Forget password?{" "}
                <Link className="text-red-500" to="/recovery">
                  Recover now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
