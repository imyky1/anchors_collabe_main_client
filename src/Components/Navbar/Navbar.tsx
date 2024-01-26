import React from "react";
import logo from "/collabLogo.png";
import { useAuth } from "../../Providers/Auth";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  profile: string;
}

// main page navbar ----------------
const Navbar: React.FC = () => {
  const navigate = useNavigate()

  const authState = useAuth()

  return (
    <div className="w-screen box-border px-[4%] md:px-[10%] py-3 flex items-center justify-between fixed top-0 left-0">
      <img src={logo} alt="" className="w-20 md:w-32 cursor-pointer" onClick={()=>{navigate("/")}}/>

      <section className="flex items-center gap-3 ">
        <span className="font-public text-sm md:text-xl font-medium text-[#12121280]">
          {authState?.loggedUser?.name}
        </span>
        <img
          src={authState?.loggedUser?.profile}
          alt=""
          className="rounded-full md:w-10 md:h-10 w-6 h-6"
        />
      </section>
    </div>
  );
};

// user pages navbar -----------
export const Navbar2: React.FC = () => {
  return (
    <div className="w-screen box-border px-4 py-3 flex items-center justify-between bg-white">
      <img src={logo} alt="" className="w-20 md:w-32 cursor-pointer" />

      <img
        src="https://i.pinimg.com/736x/ab/b8/8f/abb88fe4cc8e13fe7d49f1c56be8eccd.jpg"
        alt=""
        className="rounded-full w-10 h-10"
      />
    </div>
  );
};

// dashboard navbar
export const Navbar3: React.FC<NavbarProps> = ({ profile }) => {
  return (
    <div className="w-full box-border px-5 py-3 flex items-center flex-row-reverse justify-between bg-white">
      <img
        src={profile}
        alt=""
        className="rounded-full w-10 h-10"
      />
    </div>
  );
};

export default Navbar;
