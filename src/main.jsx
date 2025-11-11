import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { router } from "./Router/Routes";
import AuthProvider from "./Provider/AuthProvider";
import "./index.css";
import { Toaster } from "react-hot-toast";
import "aos/dist/aos.css";
import AOS from "aos";

AOS.init({ duration: 700, once: true, easing: "ease-out-cubic" });

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Toaster></Toaster>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>
);
