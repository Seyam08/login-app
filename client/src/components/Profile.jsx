import { useFormik } from "formik";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/profile.png";
// import styles
import extend from "../styles/Profile.module.css";
import styles from "../styles/Username.module.css";
// import helpers
import convertToBase64 from "../helper/converter";
import { profileValidation } from "../helper/validate";
// hooks import
import { userUpdate } from "../helper/helpers";
import useFetch from "../hooks/useFetch";

export default function Profile() {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [{ loading, apiRes, serverError }] = useFetch();
  // console.log(apiRes);
  // console.log("component");
  const formik = useFormik({
    initialValues: {
      firstName: apiRes?.firstName || "",
      lastName: apiRes?.lastName || "",
      email: apiRes?.email || "",
      mobile: apiRes?.mobile || "",
      address: apiRes?.address || "",
    },
    enableReinitialize: true,
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = Object.assign(values, {
        profile: file || apiRes?.profile || "",
      });
      // console.log(values);
      let updateUserPromise = userUpdate(values);
      toast.promise(updateUserPromise, {
        success: <b>User Updated</b>,
        error: (err) => {
          return err;
        },
        loading: "Updating...",
      });
    },
  });

  /** formik doensn't support file upload so we need to create this handler */
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };
  // logout handler function
  function userLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

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
        <div className={`${styles.glass} ${extend.glass}`}>
          <div className="title flex flex-col items-center">
            <h4 className="text-3xl font-bold">Profile</h4>
            <span className="py-3 text-1xl w-2/3 text-center text-gray-500">
              You can update the details.
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-2">
              <label htmlFor="profile-img">
                <img
                  src={apiRes?.profile || file || avatar}
                  className={`${styles.profile_img} ${extend.profile_img}`}
                  alt="avatar"
                />
              </label>

              <input
                onChange={onUpload}
                type="file"
                id="profile-img"
                name="profile-img"
                className="hidden"
              />
            </div>

            <div className="textbox flex flex-col items-center gap-3">
              <div className="name flex w-full gap-10">
                <input
                  {...formik.getFieldProps("firstName")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="FirstName"
                />
                <input
                  {...formik.getFieldProps("lastName")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="LastName"
                />
              </div>

              <div className="name flex w-full gap-10">
                <input
                  {...formik.getFieldProps("mobile")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="Mobile No."
                />
                <input
                  {...formik.getFieldProps("email")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="Email*"
                />
              </div>

              <input
                {...formik.getFieldProps("address")}
                className={`${styles.textbox} ${extend.addressbox}`}
                type="text"
                placeholder="Address"
              />
              <button className={styles.btn} type="submit">
                Update
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                come back later?{" "}
                <button onClick={userLogout} className="text-red-500">
                  Logout
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
