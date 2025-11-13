import React, { useContext, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";
import useAxiosInstance from "../Hooks/useAxiosInstance";

const Login = () => {
  const axiosInstance = useAxiosInstance();
  const { loginFunc, setUser, googleSignIn } = useContext(AuthContext);
  const [show, setShow] = useState(false);

  const location = useLocation();
  // console.log(location);

  const from = location.state || "/";
  const navigate = useNavigate();


  const handleLogIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    loginFunc(email, password)
      .then((result) => {
        toast.success("SignIn Successful");
        setUser(result.user);
        navigate(from);
      })
      .catch((error) => {
        const errorCode = error.code;

        if (errorCode === "auth/invalid-email") {
          toast.error("Invalid email format. Please check and try again.");
        } else if (errorCode === "auth/user-disabled") {
          toast.error(
            "This account has been disabled. Contact support for help."
          );
        } else if (errorCode === "auth/user-not-found") {
          toast.error("No account found with this email.");
        } else if (errorCode === "auth/wrong-password") {
          toast.error("Incorrect password. Please try again.");
        } else if (errorCode === "auth/too-many-requests") {
          toast.error("Too many attempts. Please wait and try again later.");
        } else if (errorCode === "auth/network-request-failed") {
          toast.error("Network error. Please check your connection.");
        } else {
          toast.error("Sign-in failed. Please try again.");
        }
        console.log(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const newUser = {
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
        };
        setUser(result.user);
        navigate(from);
        axiosInstance.post(`/add-user`, newUser).then((res) => {
          console.log("after insert:", res.data);
          toast.success("Google SignIn Successful!");
        });
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/popup-closed-by-user") {
          toast.error("Sign-in popup was closed before completion.");
        } else if (error.code === "auth/network-request-failed") {
          toast.error("Network error. Please check your connection.");
        } else {
          toast.error("Google Sign-in failed. Please try again.");
        }
      });
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-base-100 rounded-2xl shadow-2xl border border-neutral overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="font-primary text-3xl font-bold mb-2 text-primary">
              Login to Your Account
            </h2>
          </div>

          <form onSubmit={handleLogIn}>
            {/* Email */}
            <div>
              <label className="label">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input w-full  focus:outline-none focus:ring-0"
                autoComplete="email"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="input w-full  focus:outline-none focus:ring-0"
                  autoComplete="current-password"
                  required
                />
                <span
                  
                  onClick={() => setShow(!show)}
                  className="hover:cursor-pointer absolute right-3 top-3  z-10"
                >
                  {show ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </span>
              </div>
            </div>

            <div className="text-right">
              <button
                type="button"
                className="text-sm text-primary hover:text-primary-focus transition-colors hover:underline"
              >
                Forgot your password?
              </button>
            </div>

            <button
              type="submit"
              className="btn btn-primary text-white w-full text-lg py-3 hover:bg-primary-focus transition-colors border-primary mt-3"
            >
              Login
            </button>
          </form>

          <div className="divider">OR</div>

          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline w-full border-neutral hover:border-primary hover:bg-base-200 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          <div className="text-center mt-2 text-sm">
            <span>Don't have an account? </span>
            <Link
              to="/register"
              className="text-primary font-semibold hover:text-primary-focus transition-colors hover:underline"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
