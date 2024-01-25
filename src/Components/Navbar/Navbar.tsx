import React from "react";
import logo from "/collabLogo.png";
import { useAuth } from "../../Providers/Auth";

interface NavbarProps {
  profile: string;
}

// main page navbar ----------------
const Navbar: React.FC = () => {

  const authState = useAuth()

  return (
    <div className="w-screen box-border px-[10%] py-3 flex items-center justify-between fixed top-0 left-0">
      <img src={logo} alt="" className="w-32 mb-5 cursor-pointer" />

      <section className="flex items-center gap-3 ">
        <span className="font-public text-xl font-medium text-[#12121280]">
          {authState?.loggedUser?.name}
        </span>
        <img
          src={authState?.loggedUser?.profile}
          alt=""
          className="rounded-full w-10 h-10"
        />
      </section>
    </div>
  );
};

// user pages navbar -----------
export const Navbar2: React.FC = () => {
  return (
    <div className="w-screen box-border px-4 py-3 flex items-center justify-between bg-white">
      <img src={logo} alt="" className="md:w-48 w-28 cursor-pointer" />

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
