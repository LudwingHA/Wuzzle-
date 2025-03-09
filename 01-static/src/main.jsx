import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/RoutesConfig";
import "./assets/styles/styles.css";
import { AuthProvider } from "./auth/AuthProvider";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>
);
