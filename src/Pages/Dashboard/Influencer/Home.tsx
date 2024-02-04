import React, { useEffect } from "react";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import { Navbar3 } from "../../../Components/Navbar/Navbar";
import Profile from "./Profile";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useAuth } from "../../../Providers/Auth";
import { ShareProfile } from "./ShareProfile/ShareProfile";
import { Dashboard } from "./Dashboard/Dashboard";
import { Company_list } from "./CompanyList/CompanyList";
import { Show_Company_List } from "./CompanyList/ShowCompany";
import { ScreenAlert } from "../../SmallScreenAlert/ScreenAlert";
import UserInfo from "../UserInfo/UserInfo";
import OtpVerify from "../OtpVerify";
import ProtectedRoute from "../../../Helpers/ProtectedRoute";
import { IoIosArrowRoundForward } from "react-icons/io";
import Payments from "./Payments";
import ActivationSuccess from "./ActivationSuccess";
import mixpanel from "mixpanel-browser"

const Home: React.FC = () => {
  const authState = useAuth();
  const navigate = useNavigate()

  return (
    <>
      {authState?.loggedUser?.status === 0 ? (
          <Routes>
            {/* <Route path="/" element={<ProtectedRoute navigateCondition={!authState?.loggedUser?.is_verified} toUrl={"/influencer/userinfo"}><Waitlist /></ProtectedRoute>} /> */}
            <Route path="*" element={<ProtectedRoute navigateCondition={authState?.loggedUser?.is_verified} toUrl={"/influencer"}><UserInfo /></ProtectedRoute>} />
            <Route path="/otp-verify" element={<ProtectedRoute navigateCondition={authState?.loggedUser?.is_verified} toUrl={"/influencer"}><OtpVerify /></ProtectedRoute>} />
          </Routes>
        ) : 
          window.screen.width > 600 ? (
          <div className="w-screen h-screen flex flex-col items-start overflow-hidden">

            {/* plan top info bar ----- */}
            {!authState?.loggedUser?.activePlan && <div className="w-screen flex items-center justify-center bg-[#000080] text-[#EEEEEE] text-sm py-2 gap-10">
            Your profile is saved but not visible to brands yet . Please publish it to become visible and start getting brand collaborations 

            <span className="flex items-center gap-2 text-[#F5F5F5] px-3 py-1 bg-[#FF5C5C] rounded-[100px] cursor-pointer" onClick={()=>{
              mixpanel.track("Make Me Visible Collab"); navigate("/influencer/payment")
            }}>
            Make Me Visible <IoIosArrowRoundForward />
            </span>
            </div>}

            <section className="w-full h-full flex items-start overflow-hidden">
            <Sidebar />

            <section className="w-full h-full flex flex-col items-center ">
              <Navbar3 profile={authState?.loggedUser?.profile} chips={authState?.loggedUser?.totalChips} topCreatorChips={authState?.loggedUser?.featuredData?.topCreatorChips === authState?.loggedUser?.totalChips ? authState?.loggedUser?.featuredData?.topCreatorChips + 50 + new Date().getHours() : authState?.loggedUser?.featuredData?.topCreatorChips}/>

              <div className="bg-[#EEE] w-full h-screen overflow-x-hidden overflow-y-auto">
                <Routes>
                  {!authState?.loggedUser?.slug ? <>
                    <Route path="*" element={<Profile />} />
                    <Route path="/payment" element={<ProtectedRoute navigateCondition={authState?.loggedUser?.activePlan} toUrl="/influencer"><Payments /></ProtectedRoute>} />
                    <Route path="/share_profile" element={<ProtectedRoute navigateCondition={!authState?.loggedUser?.activePlan} toUrl="/influencer/payment"><ShareProfile /></ProtectedRoute>} />
                    <Route path="/activationSuccess" element={<ActivationSuccess />}/>
                  </>
                   : (
                    <>
                      <Route path="*" element={<Dashboard />} />
                      <Route path="/build_profile" element={<Profile />} />
                      <Route path="/share_profile" element={<ProtectedRoute navigateCondition={!authState?.loggedUser?.activePlan} toUrl="/influencer/payment"><ShareProfile /></ProtectedRoute>} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/payment" element={<ProtectedRoute navigateCondition={authState?.loggedUser?.activePlan} toUrl="/influencer"><Payments /></ProtectedRoute>} />
                      <Route path="/activationSuccess" element={<ActivationSuccess />}/>
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
