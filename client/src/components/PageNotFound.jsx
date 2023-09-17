import React from "react";
import { Link } from "react-router-dom";
// import styles
import styles from "../styles/Username.module.css";
// import helpers

export default function PageNotFound() {
  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-3xl font-bold">Page Not found!!!</h4>
            <Link
              to={"/"}
              className="py-3 text-1xl w-2/3 text-center text-red-500"
            >
              Back to home page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
