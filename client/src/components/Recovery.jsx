import React from "react";
import { Toaster } from "react-hot-toast";
// import styles
import styles from "../styles/Username.module.css";
// import helpers

export default function Recover() {
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

          <form className="py-1">
            <div className="textbox flex flex-col items-center gap-6">
              <span className="py-1 text-sm text-left text-gray-500">
                Enter 6 digit OTP sent to your email address.
              </span>
              <input type="text" placeholder="OTP" className={styles.textbox} />
              <button className={styles.btn} type="submit">
                Recover
              </button>
            </div>

            <div className="text-center py-4">
              <span>
                Didn't get any code?{" "}
                <button className="text-red-500" to="/recovery">
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
