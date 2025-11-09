import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router";
import fb from '../assets/facebook.png'
import yt from "../assets/youtube.png"
import x from "../assets/twitter.png"

const Footer = () => {
  return (
    <div className="bg-secondary">
      <footer className="footer flex flex-col lg:flex-row  justify-around    p-10 py-16  md:px-42">
        <div>
          <div className="flex  items-center gap-2">
            <img className="h-10 w-10" src={logo} alt="" />
            <p className="font-primary text-3xl font-lg">
              Movie<span className="text-primary font-primary ">Master</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a href="" target="_blank">
              <img src={fb} alt="" />
            </a>
            <a href="" target="_blank">
              <img src={yt} alt="" />
            </a>
            <a href="" target="_blank">
              <img className="w-9" src={x} alt="" />
            </a>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-primary text-xl mb-2">Quick Links</h3>
          <ul className="space-y-1  text-base">
            <li>
              <Link className="link link-hover" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="link link-hover" to="/all-movies">
                All Movies
              </Link>
            </li>
            <li>
              <Link className="link link-hover" to="/my-collection">
                My Collection
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h6 className="font-bold mb-2 text-primary text-xl">Legal</h6>
          <div className="flex flex-col space-y-1  text-base">
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </div>
        </div>
        <div className=" ">
          <div className=" mt-3">
            <div className="flex ">
              <input
                type="email"
                className="input bg-white  border-none  rounded-l-full  text-lg focus:outline-none focus:ring-0  px-3 py-3"
                placeholder="email"
              />
              <button className="btn   text-white font-primary rounded-none rounded-r-full btn-primary hover:opacity-90 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </footer>
      <p className="text-center text-primary pb-3">
        © WarmPaws All Right Deserved 2025
      </p>
    </div>
  );
};

export default Footer;

{
  /* <div className="flex">
              <img
                src="https://script.viserlab.com/playlab/demo/assets/images/frontend/footer/6573fe075e8581702100487.png"
                alt="image"
              />
              <img
                src="https://script.viserlab.com/playlab/demo/assets/images/frontend/footer/6573fe075e8581702100487.png"
                alt="image"
              />
            </div> */
}
