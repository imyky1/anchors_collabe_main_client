// BrandRoutes.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import BrandHome from "../Home/BrandHome";
import { BrandLogin } from "../Login/BrandLogin";
import { BrandOtpVerify } from "../OtpVerification/BrandOtpVerify";
import { BrandProfile2 } from "../Profile2/BrandProfile2";
import { BrandSignUp } from "../SignUp/BrandSignUp";
import { BrandWelcome } from "../Welcome/BrandWelcome";
import ProtectedRoute from "../../../Helpers/ProtectedRoute";
import { useAuth } from "../../../Providers/Auth";

const BrandRoutes: React.FC = () => {
  const authSate = useAuth();

  return (
    <Routes>
      <Route path="/SignUp" element={<BrandSignUp />} />
      <Route path="/Login" element={<BrandLogin />} />

      <Route path="/Otp-verify" element={<BrandOtpVerify />} />

      {authSate?.loggedBrand?.firstTime ? (
        <>
          <Route
            path="/*"
            element={
              <ProtectedRoute
                navigateCondition={
                  !localStorage.getItem("jwtToken") ||
                  localStorage.getItem("UserType") === "Influencer"
                }
                toUrl={"/Brand/SignUp"}
              >
                <BrandWelcome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Welcome"
            element={
              <ProtectedRoute
                navigateCondition={!localStorage.getItem("jwtToken")}
                toUrl={"/Brand/SignUp"}
              >
                <BrandWelcome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile2"
            element={
              <ProtectedRoute
                navigateCondition={!localStorage.getItem("jwtToken")}
                toUrl={"/Brand/SignUp"}
              >
                <BrandProfile2 />
              </ProtectedRoute>
            }
          />{" "}
        </>
      ) : (
        <Route
          path="/*"
          element={
            <ProtectedRoute
              navigateCondition={
                !localStorage.getItem("jwtToken") ||
                localStorage.getItem("UserType") !== "Brand"
              }
              toUrl={"/Brand/SignUp"}
            >
              <BrandHome />
            </ProtectedRoute>
          }
        />
      )}
    </Routes>
  );
};

export default BrandRoutes;
