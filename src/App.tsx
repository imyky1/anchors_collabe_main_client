import React, { useEffect } from "react";
import Landing from "./Pages/Landing/Landing";
import { CouponProvider } from "./Providers/Coupon";
import { Navigate, Route, Routes } from "react-router-dom";
import Profile from "./Pages/Profile/Profile";
import Home from "./Pages/Dashboard/Influencer/Home";
import { ThemeProvider } from "@material-tailwind/react";
import { StaticDataProvider } from "./Providers/Data";
import { PaymentProvider } from "./Providers/Payment";
import Main from "./Pages/Main Page/Main";
import Check from "./Pages/Check";
import { useAuth } from "./Providers/Auth";
import Logout from "./Pages/Logout";
import ProtectedRoute from "./Helpers/ProtectedRoute";
import { InfluencerProvider } from "./Providers/Influencer";
import { BrandProvider } from "./Providers/Brand";
import LoaderOne from "./Components/Loader";
import { useGeneralSettings } from "./Providers/General";
import { RankPage } from "./Pages/RankPage/RankPage";
import { BrandSignUp } from "./Pages/Brand/SignUp/BrandSignUp";
import { BrandLogin } from "./Pages/Brand/Login/BrandLogin";
import { BrandOtpVerify } from "./Pages/Brand/OtpVerification/BrandOtpVerify";
import { BrandWelcome } from "./Pages/Brand/Welcome/BrandWelcome";
import { BrandProfile2 } from "./Pages/Brand/Profile2/BrandProfile2";
import AcitvationPage from "./Pages/ActivationPage/Activation";
import mixpanel from "mixpanel-browser";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Declare the EasebuzzCheckout property on the window object
declare global {
  interface Window {
    EasebuzzCheckout: any; // Replace 'any' with the actual type if known
  }
}

const App: React.FC = () => {
  mixpanel.init(import.meta.env.VITE_MIXPANELTOKEN, { debug: true });

  // Function to load Easebuzz
  function loadEasebuzz() {
    // Create a script element
    const script = document.createElement("script");
    script.src =
      "https://ebz-static.s3.ap-south-1.amazonaws.com/easecheckout/easebuzz-checkout.js";

    // Append the script to the document's head
    const head = document.getElementsByTagName("head")[0];
    head.appendChild(script);
  }

  useEffect(() => {
    window.onload = function () {
      loadEasebuzz();
    };
  }, []);

  const authState = useAuth();
  const generalState = useGeneralSettings();

  useEffect(() => {
    if (localStorage.getItem("jwtToken") && localStorage.getItem("UserType")==="Influencer") {
      authState?.getUserData();
    }
    else if(localStorage.getItem("jwtToken") && localStorage.getItem("UserType")==="Brand") {
      // authState?.getUserData();
      // console.log("brand")
    }
  }, [location]);

  return (
    <>
      {generalState?.Loading && <LoaderOne />}
      <ThemeProvider>
        <PaymentProvider>
          <CouponProvider>
            <StaticDataProvider>
              <InfluencerProvider>
                <BrandProvider>
                  <Routes>
                    <Route path="*" element={<Main />} />
                    <Route
                      path="/influencer/activate"
                      element={
                        <ProtectedRoute
                          navigateCondition={
                            !localStorage.getItem("jwtToken") ||
                            authState?.loggedUser?.activePlan
                          }
                          toUrl={
                            authState?.loggedUser?.activePlan
                              ? "/influencer"
                              : "/"
                          }
                        >
                          <Landing />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/influencer/rank_page"
                      element={<RankPage />}
                    />
                    <Route
                      path="/influencer/activation_page"
                      element={<AcitvationPage />}
                    />
                    <Route path="/check" element={<Check />} />
                    <Route path="/:slug" element={<Profile />} />
                    <Route
                      path="/dashboard"
                      element={<Navigate to={"/influencer"} />}
                    />
                    <Route
                      path="/influencer/*"
                      element={
                        <ProtectedRoute
                          navigateCondition={!localStorage.getItem("jwtToken")}
                          toUrl={"/"}
                        >
                          <Home />
                        </ProtectedRoute>
                      }
                    />

                    {/* Brand routes .............................................. */}
                    <Route path="/Brand/SignUp" element={<BrandSignUp />} />
                    <Route path="/Brand/Login" element={<BrandLogin />} />
                    <Route
                      path="/Brand/Otp-verify"
                      element={<BrandOtpVerify />}
                    />
                    <Route path="/Brand/Welcome" element={<BrandWelcome />} />
                    <Route path="/Brand/profile2" element={<BrandProfile2 />} />
                    <Route
                      path="/logout"
                      element={
                        <ProtectedRoute
                          navigateCondition={!localStorage.getItem("jwtToken")}
                          toUrl={"/"}
                        >
                          <Logout />
                        </ProtectedRoute>
                      }
                    />
                  </Routes>
                </BrandProvider>
              </InfluencerProvider>
            </StaticDataProvider>
          </CouponProvider>
        </PaymentProvider>
      </ThemeProvider>

      <ToastContainer position="top-center" limit={1} />
    </>
  );
};

export default App;
