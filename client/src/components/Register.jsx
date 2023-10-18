import { useFormik } from "formik";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import avatar from "../assets/profile.png";
// import styles
import styles from "../styles/Username.module.css";
// import helpers
import convertToBase64 from "../helper/converter";
import { registerUser } from "../helper/helpers";
import { registrationValidate } from "../helper/validate";

export default function Register() {
  const [file, setFile] = useState();

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validate: registrationValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values, { resetForm }) => {
      values = Object.assign(values, { profile: file || "" });
      let registerPromise = registerUser(values);
      // console.log(registerPromise);
      toast.promise(registerPromise, {
        success: <b>Registration successful</b>,
        error: (err) => {
          return err;
        },
        loading: "creating",
      });
      resetForm({ values: "" });
    },
  });

  // formik doesn't support file upload so created this handler
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  return (
    <div className="container mx-auto">
      <Toaster position="top-right" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-3xl font-bold">Register now</h4>
            <span className="py-3 text-1xl w-2/3 text-center text-gray-500">
              Join with us
            </span>
          </div>

          <form onSubmit={formik.handleSubmit} className="py-1">
            <div className="profile flex justify-center py-2">
              <label htmlFor="profile-img">
                <img
                  src={file || avatar}
                  alt="avatar"
                  className={styles.profile_img}
                />
              </label>
              <input
                onChange={onUpload}
                className="hidden"
                type="file"
                name="profile-img"
                id="profile-img"
              />
            </div>

            <div className="textbox flex flex-col items-center gap-3">
              <input
                {...formik.getFieldProps("email")}
                type="text"
                placeholder="Email"
                className={styles.textbox}
              />
              <input
                {...formik.getFieldProps("username")}
                type="text"
                placeholder="Username"
                className={styles.textbox}
              />
              <input
                {...formik.getFieldProps("password")}
                type="password"
                placeholder="Password"
                className={styles.textbox}
              />
              <button className={styles.btn} type="submit">
                Register
              </button>
            </div>

            <div className="text-center py-4">
              <span>
                already registered?{" "}
                <Link className="text-red-500" to="/">
                  Login now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
