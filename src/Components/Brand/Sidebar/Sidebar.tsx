import React, { useEffect, useState } from "react";
import logo from "/collabLogo.png";
import { PiSquaresFourLight } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "../../../Providers/Auth";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MdOutlineContentCopy,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { useGeneralSettings } from "../../../Providers/General";
import { GiTwoCoins } from "react-icons/gi";
import { TbCrown, TbMoodSad } from "react-icons/tb";
import { toast } from "react-toastify";
import { useBrand } from "../../../Providers/Brand";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const brandState = useBrand();
  const [brand,SetBrand] = useState();
  useEffect(()=>{
    async function getBrand() {
        const brand = await brandState?.getBrandInfo()
        SetBrand(brand)
    }
    getBrand() 
  },[])
  

  const [openProfileOptions, setOpenProfileOptions] = useState(true);

  const authState = useAuth();
  const generalState = useGeneralSettings();

  return (
    <div
      className="flex flex-col w-[15%] min-w-[15%] p-5 box-border gap-5 font-inter h-full z-10 bg-[#F5F5F5]"
      style={{ boxShadow: "4px 0px 8px 0px rgba(33, 33, 33, 0.08)" }}
    >
      <img
        src={logo}
        alt=""
        className="w-32 mb-5 cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      />

      <div className="flex items-center gap-2">
        <img
          src={"/successTick.png"}
          alt=""
          className="w-10 h-10 rounded-full"
        />

        <section className="flex flex-col gap-1">
          <span className="text-[16px] font-bold text-[#424242]">
            {brand?.data1?.CompanyName}
          </span>
          <p className="text-[10px] text-[#757575]">
            {authState?.loggedBrand?.email}
          </p>
        </section>
      </div>



      <section className="flex flex-col items-start gap-2 mt-[70px]">
        <span
          className={`text-sm font-medium ${
            location.pathname === "/Brand/dashboard" ||
            location.pathname === "/Brand"
              ? "text-[#FAFAFA] bg-[#FF5C5C]"
              : "text-[#424242] bg-transparent"
          }  w-full py-[6px] px-3 hover:bg-[#FF5C5C] hover:text-[#FAFAFA] rounded-md cursor-pointer flex items-center gap-2`}
        //   onClick={() => {
        //     navigate("/influencer/dashboard");
        //   }}
        >
          <PiSquaresFourLight size={18} /> Dashboard
        </span>
        <span
          className={`text-sm font-medium ${
            location.pathname === "/influencer/build_profile"
              ? "text-[#FAFAFA] bg-[#FF5C5C]"
              : "text-[#424242] bg-transparent"
          } w-full py-[6px] relative px-3 hover:bg-[#FF5C5C] hover:text-[#FAFAFA] rounded-md cursor-pointer flex items-center gap-2`}
        //   onClick={() => {
        //     navigate("/influencer/build_profile");
        //   }}
        >
          <CgProfile size={18} /> Unlocked Creators
          
        </span>


        <span
          className={`text-sm font-medium ${
            location.pathname === "/influencer/brands_wishlist" ||
            location.pathname === "/influencer/view_brands_list"
              ? "text-[#FAFAFA] bg-[#FF5C5C]"
              : "text-[#424242] bg-transparent"
          } w-full py-[6px] px-3 hover:bg-[#FF5C5C] hover:text-[#FAFAFA] rounded-md cursor-pointer flex items-center gap-2`}
        //   onClick={() => {
        //     navigate("/influencer/brands_wishlist");
        //   }}
        >
          <PiSquaresFourLight size={18} /> Credits History
        </span>
      </section>
    </div>
  );
};

export default Sidebar;
