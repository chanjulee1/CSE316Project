// Name: Ulukbek Aitmatov
// email: ulukbek.aitmatov@stonybrook.edu
// Name: Chanju Lee
// email: chanju.lee@stonybrook.edu

import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import bgImg from "../../assets/img/bg.jpg";

const Layout = () => {
  const divStyle = {
    backgroundImage: `url(${bgImg})`,
    backgroundPosition: "center center",
    backgroundSize: "cover",
  };

  return (
    <div style={divStyle} className="h-screen px-3">
      <Header />
      <Outlet />
    </div>
  );
};
export default Layout;
