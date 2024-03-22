// Name: Ulukbek Aitmatov
// email: ulukbek.aitmatov@stonybrook.edu
// Name: Chanju Lee
// email: chanju.lee@stonybrook.edu

import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const toggleMenu = () => {
    setMenu(!menu);
  };

  const location = useLocation();
  const isSelectCourses = location.pathname === "/select-courses";

  const hideListItems = isSelectCourses && !isSmallScreen;
  const hideHeaderMenu = isSelectCourses && !isSmallScreen;

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function handleNavLinkClick(e) {
    e.target.style.color = "black";
  }

  function handleNavLinkBlur(e) {
    e.target.style.color = "grey";
  }

  return (
    <>
      <div className="text-center text-white text-3xl">
        {isSelectCourses ? (
          <span
            style={{ color: "black", fontWeight: "bold", display: "block" }}
          >
            <span className="block sm:inline">Course Man =&gt;</span>
            <span> Search/Register</span>
          </span>
        ) : (
          "CourseMan!"
        )}
      </div>
      <button
        onClick={toggleMenu}
        className="bg-sky-300 p-1 sm:hidden border border-gray-500 rounded-md fixed z-40 top-3 right-3"
      >
        {menu ? "Close" : "Menu"}
      </button>
      {!hideHeaderMenu && (
        <ul
          className={`${
            menu
              ? "block fixed right-0 pt-20 w-2/3 text-center h-screen backdrop-blur-lg bg-black/30"
              : "hidden"
          } sm:flex justify-end items-center sm:space-x-8 space-y-6 sm:space-y-0 md:space-x-15 py-4 headerMenu backdrop-filter backdrop-blur-md`}
          style={{ gap: "5%" }}
        >
          {!hideListItems && (
            <>
              <li>
                <NavLink
                  to="/"
                  className=""
                  style={{
                    margin: "0 calc(4% )",
                    color: location.pathname === "/" ? "black" : "dimgray",
                  }}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="instructions"
                  className=""
                  style={{
                    margin: "0 calc(4% )",
                    color:
                      location.pathname === "/instructions"
                        ? "black"
                        : "dimgray",
                  }}
                >
                  Instructions
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="login"
                  className=""
                  style={{
                    margin: "0 calc(4%)",
                    color: location.pathname === "/login" ? "black" : "dimgray",
                  }}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="previous-courses"
                  className=""
                  style={{
                    margin: "0 calc(4%)",
                    color:
                      location.pathname === "/previous-courses"
                        ? "black"
                        : "dimgray",
                  }}
                >
                  PreviousCourses
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="select-courses"
                  className=""
                  style={{
                    margin: "0 calc(4% + 5px)",
                    color:
                      location.pathname === "/select-courses"
                        ? "black"
                        : "dimgray",
                  }}
                >
                  SelectCourses
                </NavLink>
              </li>
            </>
          )}
        </ul>
      )}
    </>
  );
};

export default Header;
