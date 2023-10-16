import { useFormik } from "formik";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/profile.png";
// import styles
import styles from "../styles/Username.module.css";
// import helpers
import { setUsername } from "./helper/credentials";
import { usernameValidate } from "./helper/validate";

export default function Username() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values, { resetForm }) => {
      setUsername.value = values.username;
      // console.log(loguser);
      resetForm({ values: "" });
      navigate("/password");
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
              Explore more by connecting with us
            </span>
          </div>

          <form onSubmit={formik.handleSubmit} className="py-1">
            <div className="profile flex justify-center py-4">
              <img src={avatar} alt="avatar" className={styles.profile_img} />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("username")}
                type="text"
                placeholder="Username"
                className={styles.textbox}
              />
              <button className={styles.btn} type="submit">
                Let's go
              </button>
            </div>

            <div className="text-center py-4">
              <span>
                Not a member?{" "}
                <Link className="text-red-500" to="/register">
                  Register now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
