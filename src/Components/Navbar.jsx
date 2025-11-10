import React, { useContext } from "react";
import MyLink from "./MyLink";
import { Link } from "react-router";
import logo from "../assets/logo.png";
import { AuthContext } from "../Context/AuthContext";
import {
  IoLogInOutline,
  IoLogOutOutline,
  IoPersonAddOutline,
} from "react-icons/io5";
import toast from "react-hot-toast";

const Navbar = () => {
  const { theme, handleTheme, user, setUser, signOutFunc } =
    useContext(AuthContext);
  const handleSignOut = () => {
    signOutFunc()
      .then(() => {
        toast.success("SignOut Successful");
        setUser(null);
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error.message);
      });
  };
  return (
    <div className="navbar  shadow-sm px-2 md:px-12 lg:px-22">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
          >
            <li>
              <MyLink to="/">Home</MyLink>
            </li>
            <li>
              <MyLink to="/all-movies">All Movies</MyLink>
            </li>
            <li>
              <MyLink to="/my-collection">My Collection</MyLink>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-1">
          <img className="w-7  md:w-10" src={logo} alt="" />
          <button className="font-primary text-lg md:text-2xl">
            Movie<span className="text-primary font-primary ">Master</span>
          </button>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <MyLink to="/">Home</MyLink>
          </li>
          <li>
            <MyLink to="/all-movies">All Movies</MyLink>
          </li>
          <li>
            <MyLink to="/my-collection">My Collection</MyLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="flex justify-center items-center gap-3 text-center">
            <div className="dropdown dropdown-center text-center z-50">
              <div tabIndex={0} role="button" className="m-1">
                <img
                  className="w-12 rounded-full border-primary border-2"
                  src={user?.photoURL}
                  alt="user"
                />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-60 w-52 p-2 shadow-sm space-y-3"
              >
                <h1>{user.displayName}</h1>
                <h1>{user.email}</h1>
                <label className="flex justify-center items-center cursor-pointer gap-2 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                  </svg>
                  <input
                    checked={theme === "dark"}
                    onChange={handleTheme}
                    type="checkbox"
                    className="toggle theme-controller"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                </label>
                <button
                  onClick={handleSignOut}
                  className="btn btn-primary w-full flex justify-center items-center"
                >
                  <IoLogOutOutline />
                  Log out
                </button>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="flex items-center gap-1 text-sm md:text-md py-1 md:py-2 px-2 md:px-4  border md:border-2 border-primary text-primary rounded-md font-semibold hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105 transform"
            >
              <IoLogInOutline />
              Login
            </Link>
            <Link
              to="/register"
              className="flex items-center gap-1 text-sm md:text-md py-1 md:py-2 px-2 md:px-4   bg-primary text-white rounded-md font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl"
            >
              <IoPersonAddOutline />
              SignUp
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
