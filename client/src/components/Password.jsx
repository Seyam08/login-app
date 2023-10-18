import { useFormik } from "formik";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
// import styles
import styles from "../styles/Username.module.css";
// import helpers
import { setUsername } from "../helper/credentials";
import { loginUser } from "../helper/helpers";
import { passwordValidate } from "../helper/validate";
// hooks import
import useFetch from "../hooks/useFetch";

export default function Password() {
  const navigate = useNavigate();
  const { username } = setUsername.v;
  console.log(username);
  const [{ loading, apiRes, serverError }] = useFetch(`/user/${username}`);

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values, { resetForm }) => {
      let loginUserPromise = loginUser({
        username,
        password: values.password,
      });
      // console.log(loginUserPromise);
      toast.promise(loginUserPromise, {
        success: <b>Login successful.</b>,
        error: (err) => {
          return err;
        },
        loading: "Checking...",
      });
      resetForm({ values: "" });

      loginUserPromise.then((res) => {
        let { token } = res.data;
        localStorage.setItem("token", token);
        navigate("/profile");
      });
    },
  });

  if (loading) {
    return <h1 className="text-2xl font-bold">Loading</h1>;
  }
  if (serverError) {
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;
  }

  return (
    <div className="container mx-auto">
      <Toaster position="top-right" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-3xl font-bold">
              Hello {apiRes?.firstName || apiRes?.username}
            </h4>
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
                type="password"
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
