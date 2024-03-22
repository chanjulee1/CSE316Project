// Name: Ulukbek Aitmatov
// email: ulukbek.aitmatov@stonybrook.edu
// Name: Chanju Lee
// email: chanju.lee@stonybrook.edu

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Home from "../pages/Home/Home";
import Instructions from "../pages/Instructions/Instructions";
import Login from "../pages/Login/Login";
import PreviousCourses from "../pages/PreviousCourses/PreviousCourses";
import SelectCourses from "../pages/SelectCourses/SelectCourses";
import { PrivateRoute } from "../components/PrivateRoute";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="instructions" element={<Instructions />} />
      <Route path="Login" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path="previous-courses" element={<PreviousCourses />} />
        <Route path="select-courses" element={<SelectCourses />} />
      </Route>
    </Route>
  )
);
