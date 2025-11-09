import React from "react";
import MyLink from "./MyLink";
import { Link } from "react-router";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <div className="navbar shadow-sm px-2 md:px-12 lg:px-22">
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
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
          <img className="h-10 w-10  md:w-10" src={logo} alt="" />
          <button className="font-primary text-xl font-lg">
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
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm md:text-md py-2 px-2 md:px-4  border-2 border-primary text-primary rounded-md font-semibold hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105 transform"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-sm md:text-md py-2 px-2 md:px-3   bg-primary text-white rounded-md font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl"
          >
            SignUp
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
