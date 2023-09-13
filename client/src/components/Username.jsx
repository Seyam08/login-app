import React from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/profile.png";

// import styles
import styles from "../styles/Username.module.css";

export default function Username() {
  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-3xl font-bold">Hello Again</h4>
            <span className="py-3 text-1xl w-2/3 text-center text-gray-500">
              Explore more by connecting with us
            </span>
          </div>
          <form action="" className="py-1">
            <div className="profile flex justify-center py-4">
              <img src={avatar} alt="avatar" className={styles.profile_img} />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
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
