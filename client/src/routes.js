import { RouterConfig } from "react-router-config";

import App from "./App";
import Login from "./components/Users/Login";
import Signup from "./components/Users/Signup";
import Home from "./Pages/Home";

const routes = [
  {
    component: App,
    routes: [
      {
        path: "/",
        exact: true,
        component: Home,
      },
      {
        path: "/users/login",
        exact: true,
        component: Login,
      },
      {
        path: "/users/signup",
        exact: true,
        component: Signup,
      },
    ],
  },
];

export default routes;
