import React from "react";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import { Navbar3 } from "../../../Components/Navbar/Navbar";
import Profile from "./Profile";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../../../Providers/Auth";
import { ShareProfile } from "./ShareProfile/ShareProfile";
import { Dashboard } from "./Dashboard/Dashboard";
import { Company_list } from "./CompanyList/CompanyList";
import { Show_Company_List } from "./CompanyList/ShowCompany";
import { ScreenAlert } from "../../SmallScreenAlert/ScreenAlert";
import Waitlist from "../Success/Waitlist";
import UserInfo from "../UserInfo/UserInfo";
import OtpVerify from "../OtpVerify";
import ProtectedRoute from "../../../Helpers/ProtectedRoute";

const Home: React.FC = () => {
  const authState = useAuth();

  return (
    <>
      {!authState?.loggedUser?.earlyAccess || !authState.loggedUser.is_verified ? (
          <Routes>
            <Route path="/" element={<ProtectedRoute navigateCondition={!authState?.loggedUser?.is_verified} toUrl={"/influencer/userinfo"}><Waitlist /></ProtectedRoute>} />
            <Route path="/userinfo" element={<ProtectedRoute navigateCondition={authState?.loggedUser?.is_verified} toUrl={"/influencer"}><UserInfo /></ProtectedRoute>} />
            <Route path="/otp-verify" element={<ProtectedRoute navigateCondition={authState?.loggedUser?.is_verified} toUrl={"/influencer"}><OtpVerify /></ProtectedRoute>} />
          </Routes>
        ) : 
          !authState.loggedUser.activePlan ? <Navigate to="/influencer/rank_page"/> :
          window.screen.width > 600 ? (
          <div className="w-screen h-screen flex items-start overflow-hidden">
            <Sidebar />

            <section className="w-full h-screen flex flex-col items-center ">
              <Navbar3 profile={authState?.loggedUser?.profile} />

              <div className="bg-[#F5F5F5] w-full h-screen overflow-x-hidden overflow-y-auto">
                <Routes>
                  {!authState?.loggedUser?.slug ? (
                    <Route path="*" element={<Profile />} />
                  ) : (
                    <>
                      <Route path="*" element={<Dashboard />} />
                      <Route path="/build_profile" element={<Profile />} />
                      <Route path="/share_profile" element={<ShareProfile />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route
                        path="/brands_wishlist"
                        element={<Company_list />}
                      />
                      <Route
                        path="/view_brands_list"
                        element={<Show_Company_List />}
                      />
                    </>
                  )}
                </Routes>
              </div>
            </section>
          </div>
        )
       : (
        <Routes>
          <Route path="*" element={<ScreenAlert />} />
        </Routes>
      )}
    </>
  );
};

export default Home;
