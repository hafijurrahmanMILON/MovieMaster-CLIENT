import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import useAxiosInstance from "../Hooks/useAxiosInstance";

const Register = () => {
  const axiosInstance = useAxiosInstance();
  const {
    setUser,
    createUserFunc,
    googleSignIn,
    error,
    setError,
    updateProfileFunc,
  } = useContext(AuthContext);
  const [show, setShow] = useState(false);

  const location = useLocation()
  const navigate = useNavigate();
const from = location.state || '/'


  const handleCreateUser = (e) => {
    e.preventDefault();
    const displayName = e.target.name.value;
    const photoURL = e.target.photoURL.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const newUser = {
      displayName,
      photoURL,
      email,
    };

    const regExPass = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!regExPass.test(password)) {
      setError(true);
      return;
    }
    createUserFunc(email, password)
      .then((res) => {
        axiosInstance.post(`/add-user`, newUser).then((res) => {
          console.log("after insert:", res.data);
          if (res.data.insertedId) {
            toast.success("Account created Successfully!");
          }
        });
        updateProfileFunc(displayName, photoURL)
          .then(() => {
            const user = res.user;
            setUser({ ...user, displayName, photoURL });
            setError(false);
            navigate(from);
          })
          .catch((error) => {
            console.log(error.message);
            toast.error(error.code);
          });
      })
      .catch((error) => {
        const errorCode = error.code;

        if (errorCode === "auth/email-already-in-use") {
          toast.error(
            "This email is already registered. Try signing in instead."
          );
        } else if (errorCode === "auth/invalid-email") {
          toast.error(
            "The email address is not valid. Please check and try again."
          );
        } else if (errorCode === "auth/weak-password") {
          toast.error(
            "Password is too weak. Use at least 6 characters with uppercase and lowercase letters."
          );
        } else if (errorCode === "auth/invalid-profile-attribute") {
          toast.error("photo URL is too long");
        } else if (errorCode === "auth/operation-not-allowed") {
          toast.error(
            "Email/password signup is currently disabled. Please contact support."
          );
        } else if (errorCode === "auth/network-request-failed") {
          toast.error(
            "Network error. Please check your internet connection and try again."
          );
        } else if (errorCode === "auth/internal-error") {
          toast.error(
            "Something went wrong on our end. Please try again later."
          );
        } else {
          toast.error("Signup failed. Please try again or contact support.");
        }
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
          if (res.data.insertedId) {
            toast.success("Google SignIn Successful!");
          }
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
            <h2 className="font-primary text-3xl font-bold mb-1 text-primary">
              Create Your Account
            </h2>
          </div>

          <form onSubmit={handleCreateUser} className="space-y-2">
            {/* Name */}
            <div>
              <label className="label">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="input w-full  focus:outline-none focus:ring-0"
                autoComplete="name"
              />
            </div>

            {/* Photo URL */}
            <div className="form-control">
              <label className="label">Photo URL</label>
              <input
                type="text"
                name="photoURL"
                placeholder="Enter your photo URL"
                className="input w-full  focus:outline-none focus:ring-0"
                autoComplete="photo"
              />
            </div>

            {/* Email */}
            <div className="form-control">
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
            <div className="form-control">
              <label className="label">Password</label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="input w-full  focus:outline-none focus:ring-0"
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="hover:cursor-pointer absolute right-3 top-3  z-10"
                >
                  {show ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-error text-sm">
                <span>
                  Password must be at least 6 characters long and include both
                  uppercase and lowercase letters.
                </span>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary text-white w-full text-lg py-3 hover:bg-primary-focus transition-colors border-primary mt-3"
            >
              Register
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
            <span>Already have an account? </span>
            <Link
              to="/login"
              className="text-primary font-semibold hover:text-primary-focus transition-colors hover:underline"
            >
              Login here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
