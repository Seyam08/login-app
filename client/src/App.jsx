import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// route components import
import PageNotFound from "./components/PageNotFound";
import Password from "./components/Password";
import Porfile from "./components/Profile";
import Recovery from "./components/Recovery";
import Register from "./components/Register";
import Reset from "./components/Reset";
import Username from "./components/Username";
// authentication import
import { ProtectRoute } from "./components/helper/authentication";

// route declaretion
const router = createBrowserRouter([
  {
    path: "/",
    element: <Username />,
  },
  {
    path: "/password",
    element: <ProtectRoute chilldren={<Password />} />,
  },
  {
    path: "/profile",
    element: <Porfile />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/reset",
    element: <Reset />,
  },
  {
    path: "/recovery",
    element: <Recovery />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
