import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
// import styles
import { useNavigate } from "react-router-dom";
import { setUsername } from "../helper/credentials";
import { generateOTP, verifyOTP } from "../helper/helpers";
import styles from "../styles/Username.module.css";
// import helpers

export default function Recover() {
  const { username } = setUsername.v;
  const [OTP, setOTP] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    generateOTP(username)
      .then((generatedOTP) => {
        console.log(generatedOTP);
        if (generatedOTP) {
          return toast.success("OTP printed on your console");
        }
        return toast.error("Problem while generating OTP!");
      })
      .catch((error) => {
        return { error: "can't generate OTP" };
      });
  }, [username]);
  async function onSubmit(e) {
    e.preventDefault();
    try {
      let OTPPromise = verifyOTP({ username, code: OTP });
      toast.promise(OTPPromise, {
        success: (data) => {
          return data.msg;
        },
        error: (err) => {
          return err;
        },
        loading: "verifing...",
      });
      OTPPromise.then(function () {
        navigate("/reset");
      });
    } catch (error) {
      return toast.error(error);
    }
  }
  // handler of resend OTP
  function resendOTP(e) {
    e.preventDefault();
    let sentPromise = generateOTP(username);

    toast.promise(sentPromise, {
      loading: "Sending...",
      success: <b>OTP re-printed on your console</b>,
      error: <b>Could not print it!</b>,
    });

    sentPromise.then((OTP) => {
      console.log(OTP);
    });
  }
  return (
    <div className="container mx-auto">
      <Toaster position="top-right" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-3xl font-bold">Recovery</h4>
            <span className="py-3 text-1xl w-2/3 text-center text-gray-500">
              Enter your OTP to recover password
            </span>
          </div>

          <form className="py-1" onSubmit={onSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
              <span className="py-1 text-sm text-left text-gray-500">
                Enter 6 digit OTP sent to your email address.
              </span>
              <input
                onChange={(e) => setOTP(e.target.value)}
                type="text"
                placeholder="OTP"
                className={styles.textbox}
              />
              <button className={styles.btn} type="submit">
                Recover
              </button>
            </div>

            <div className="text-center py-4">
              <span>
                Didn't get any code?{" "}
                <button onClick={resendOTP} className="text-red-500">
                  Resend OTP
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
