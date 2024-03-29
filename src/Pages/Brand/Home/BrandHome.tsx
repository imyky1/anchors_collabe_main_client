import React from "react";
import Sidebar from "../../../Components/Brand/Sidebar/Sidebar";
import { Navbar3 } from "../../../Components/Brand/Navbar/Navbar";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAuth } from "../../../Providers/Auth";
import { DashBoard } from "../DashBoard/DashBoard";
import { ScreenAlert } from "../../SmallScreenAlert/ScreenAlert";
import { useBrand } from "../../../Providers/Brand";

import mixpanel from "mixpanel-browser";
import { CreditHistory } from "../DashBoard/CreditsHistory/CreditHistory";
import { PurchaseCredits } from "../DashBoard/PurchaseCredits/PurchaseCredits";
import { UnlockedCreators } from "../DashBoard/UnlockedCreators/UnlockedCreators";
import { UnlockedCreatorFull } from "../DashBoard/UnlockedCreators/UnlockedCreatorFull";
import { PurchaseCreditsSucess } from "../DashBoard/PurchaseCredits/PurchaseCreditsSucess";

const BrandHome: React.FC = () => {
  const authState = useAuth();
  const brandState = useBrand();
  const navigate = useNavigate();

  return (
    <>
      {authState?.loggedBrand?.status === 0 ? (
        <Routes>
          {/* <Route path="/" element={<ProtectedRoute navigateCondition={!authState?.loggedUser?.is_verified} toUrl={"/influencer/userinfo"}><Waitlist /></ProtectedRoute>} /> */}
          {/* <Route
            path="*"
            element={
              <ProtectedRoute
                navigateCondition={authState?.loggedUser?.is_verified}
                toUrl={"/Dashboard"}
              >
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/otp-verify"
            element={
              <ProtectedRoute
                navigateCondition={authState?.loggedUser?.is_verified}
                toUrl={"/influencer"}
              >
                <OtpVerify />
              </ProtectedRoute>
            }
          /> */}
        </Routes>
      ) : window.screen.width > 600 ? (
        <div className="w-screen h-screen flex flex-col items-start overflow-hidden">
          <section className="w-full h-full flex items-start overflow-hidden">
            <Sidebar />

            <section className="w-full max-w-[85%] h-full flex flex-col items-center ">
              <Navbar3
                profile={authState?.loggedBrand?.profile}
                credits={authState?.loggedBrand?.credits || 0}
              />

              <div className="bg-[#EEE] w-full h-screen overflow-x-hidden overflow-y-auto">
                <Routes>
                  <Route path="*" element={<DashBoard />} />
                  <Route path="/DashBoard" element={<DashBoard />} />
                  <Route path="/DashBoard/CreditsHistory" element={<CreditHistory />}/>
                  <Route path="/DashBoard/PurchaseCredits" element={<PurchaseCredits/>}/>
                  <Route path="/DashBoard/PurchaseCredits/Success" element={<PurchaseCreditsSucess/>}/>
                  <Route path="/DashBoard/UnlockedInfluencer" element={<UnlockedCreators />} />
                  <Route path="/DashBoard/UnlockedInfluencer/Details" element={<UnlockedCreatorFull />} />
                </Routes>
              </div>
            </section>
          </section>
        </div>
      ) : (
        <Routes>
          <Route path="*" element={<ScreenAlert />} />
        </Routes>
      )}
    </>
  );
};

export default BrandHome;
