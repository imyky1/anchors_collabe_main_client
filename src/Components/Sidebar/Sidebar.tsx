import React, { useState } from "react";
import logo from "/collabLogo.png";
import { PiSquaresFourLight } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "../../Providers/Auth";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [openProfileOptions, setOpenProfileOptions] = useState(true);

  const authState = useAuth();

  return (
    <div
      className="flex flex-col w-[260px] min-w-[260px] p-5 box-border gap-5 font-inter h-screen z-10"
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
          src={authState?.loggedUser?.profile}
          alt=""
          className="w-10 h-10 rounded-full"
        />

        <section className="flex flex-col gap-1">
          <span className="text-[16px] font-bold text-[#424242]">
            {authState?.loggedUser?.name}
          </span>
          <p className="text-[10px] text-[#757575]">
            {authState?.loggedUser?.email}
          </p>
        </section>
      </div>

      {authState?.loggedUser?.slug && (
        <span
          className="w-full py-2 px-3 text-[#3460DC] text-xs border border-[#3460DC] rounded-[100px] cursor-pointer"
          onClick={() => {
            window.open(
              `https://collab.anchors.in/${authState?.loggedUser?.slug}`
            );
          }}
        >
          collab.anchors.in/{authState?.loggedUser?.slug}
        </span>
      )}

      <section className="flex flex-col items-start gap-2">
        <span
          className={`text-sm font-medium ${
            location.pathname === "/influencer/dashboard" ||
            location.pathname === "/influencer"
              ? "text-[#FAFAFA] bg-[#FF5C5C]"
              : "text-[#424242] bg-transparent"
          }  w-full py-[6px] px-3 hover:bg-[#FF5C5C] hover:text-[#FAFAFA] rounded-md cursor-pointer flex items-center gap-2`}
          onClick={() => {
            navigate("/influencer/dashboard");
          }}
        >
          <PiSquaresFourLight size={18} /> Dashboard
        </span>
        <span
          className={`text-sm font-medium ${
            location.pathname === "/influencer/build_profile"
              ? "text-[#FAFAFA] bg-[#FF5C5C]"
              : "text-[#424242] bg-transparent"
          } w-full py-[6px] relative px-3 hover:bg-[#FF5C5C] hover:text-[#FAFAFA] rounded-md cursor-pointer flex items-center gap-2`}
          onClick={() => {
            navigate("/influencer/build_profile");
          }}
        >
          <CgProfile size={18} /> Profile Building
          {!openProfileOptions ? (
            <MdOutlineKeyboardArrowDown
              className="absolute right-3"
              onClick={() => {
                setOpenProfileOptions(!openProfileOptions);
              }}
            />
          ) : (
            <MdOutlineKeyboardArrowUp
              className="absolute right-3"
              onClick={() => {
                setOpenProfileOptions(!openProfileOptions);
              }}
            />
          )}
        </span>

        {openProfileOptions && (
          <section className="flex flex-col items-center gap-4 text-sm w-full px-3 box-border mb-3 mt-1">
            <span
              className={`cursor-pointer ${
                location.search === "?page=1" &&
                location.pathname === "/influencer/build_profile"
                  ? "text-[#FF5C5C]"
                  : "text-[#757575]"
              } hover:text-[#FF5C5C] flex items-center justify-between w-full`}
              onClick={() => {
                navigate("/influencer/build_profile?page=1");
              }}
            >
              Personal Information
              {/* <span className="text-[#10B981]">80%</span> */}
            </span>
            <span
              className={`cursor-pointer ${
                location.search === "?page=2" &&
                location.pathname === "/influencer/build_profile"
                  ? "text-[#FF5C5C]"
                  : "text-[#757575]"
              } hover:text-[#FF5C5C] flex items-center justify-between w-full`}
              onClick={() => {
                navigate("/influencer/build_profile?page=2");
              }}
            >
              Collab Portfolio
              {/* <span>60%</span> */}
            </span>
            <span
              className={`cursor-pointer ${
                location.search === "?page=3" &&
                location.pathname === "/influencer/build_profile"
                  ? "text-[#FF5C5C]"
                  : "text-[#757575]"
              } hover:text-[#FF5C5C] flex items-center justify-between w-full`}
              onClick={() => {
                navigate("/influencer/build_profile?page=3");
              }}
            >
              Monetization Expertise
              {/* <span>30%</span> */}
            </span>
            <span
              className={`cursor-pointer ${
                location.search === "?page=4" &&
                location.pathname === "/influencer/build_profile"
                  ? "text-[#FF5C5C]"
                  : "text-[#757575]"
              } hover:text-[#FF5C5C] flex items-center justify-between w-full`}
              onClick={() => {
                navigate("/influencer/build_profile?page=4");
              }}
            >
              Content Expertise
              {/* <span>30%</span> */}
            </span>
            <span
              className={`cursor-pointer ${
                location.search === "?page=5" &&
                location.pathname === "/influencer/build_profile"
                  ? "text-[#FF5C5C]"
                  : "text-[#757575]"
              } hover:text-[#FF5C5C] flex items-center justify-between w-full`}
              onClick={() => {
                navigate("/influencer/build_profile?page=5");
              }}
            >
              Audience info
              {/* <span>30%</span> */}
            </span>
          </section>
        )}

        <span
          className={`text-sm font-medium ${
            location.pathname === "/influencer/brands_wishlist" ||
            location.pathname === "/influencer/view_brands_list"
              ? "text-[#FAFAFA] bg-[#FF5C5C]"
              : "text-[#424242] bg-transparent"
          } w-full py-[6px] px-3 hover:bg-[#FF5C5C] hover:text-[#FAFAFA] rounded-md cursor-pointer flex items-center gap-2`}
          onClick={() => {
            navigate("/influencer/brands_wishlist");
          }}
        >
          <PiSquaresFourLight size={18} /> Brand Wishlist
        </span>
      </section>
    </div>
  );
};

export default Sidebar;
