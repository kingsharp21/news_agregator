import { createBrowserRouter } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup"
import Feed from "./Feed";
import App from './App'
import NotFound from "./NotFounded";

import {getSources} from './api/sources'

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <App sourceList={getSources()}/>,
  },
  {
    path: "*",
    element: <NotFound/>,
  },
]);


export default router