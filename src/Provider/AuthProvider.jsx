import React, { useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { auth } from "../Firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [genreMovies,setGenreMovies] = useState([])
  const [user, setUser] = useState(null);
  console.log(user);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [apiLoading,setApiLoading]  = useState(false)
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (e) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  const createUserFunc = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).finally(() =>
      setLoading(false)
    );
  };

  const loginFunc = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password).finally(() =>
      setLoading(false)
    );
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider).finally(() =>
      setLoading(false)
    );
  };

  const signOutFunc = () => {
    setLoading(true);
    return signOut(auth).finally(() => setLoading(false));
  };

  const updateProfileFunc = (displayName, photoURL) => {
    setLoading(true);
    return updateProfile(auth.currentUser, { displayName, photoURL }).finally(
      () => setLoading(false)
    );
  };

  const resetPasswordFunc = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email).finally(() => setLoading(false));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authData = {
    user,
    setUser,
    // email,
    // setEmail,
    error,
    setError,
    theme,
    handleTheme,
    loading,
    setLoading,
    createUserFunc,
    loginFunc,
    googleSignIn,
    signOutFunc,
    updateProfileFunc,
    resetPasswordFunc,
    apiLoading,
    setApiLoading,
    genreMovies,
    setGenreMovies,
  };

  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
