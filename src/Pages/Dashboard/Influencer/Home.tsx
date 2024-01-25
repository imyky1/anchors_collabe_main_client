import React from "react";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import { Navbar3 } from "../../../Components/Navbar/Navbar";
import Profile from "./Profile";
import { Dashboard } from "./Dashboard";
import { ShareProfile } from "./ShareProfile";
import { Company_list } from "./CompanyList";
import { Show_Company_List } from "./ShowCompanyList";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "../../../Providers/Auth";

const Home: React.FC = () => {

  const authState = useAuth()

  return (
      <div className="w-screen h-screen flex items-start overflow-hidden">
        <Sidebar />

        <section className="w-full h-screen flex flex-col items-center ">
          <Navbar3 profile={authState?.loggedUser?.profile}/>

          <div className="bg-[#F5F5F5] w-full h-screen overflow-x-hidden overflow-y-auto">
            <Routes>
              {/* <Route path="*" element={<Profile />} /> */}
              {<Route path="/share_profile" element={<ShareProfile />} />}
              {<Route path="/Dashboard" element={<Dashboard />} />}
              {<Route path="/Preferred_Companies_List_edit" element={<Company_list />} />}
              {<Route path="/Preferred_Companies_List_view" element={<Show_Company_List />} />}
            </Routes>
          </div>
        </section>
      </div>
  );
};

export default Home;
