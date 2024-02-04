import React, { useState } from "react";
import logo from "/collabLogo.png";
import { PiSquaresFourLight } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "../../Providers/Auth";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MdOutlineContentCopy,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { useGeneralSettings } from "../../Providers/General";
import { GiTwoCoins } from "react-icons/gi";
import { TbCrown, TbMoodSad } from "react-icons/tb";
import { toast } from "react-toastify";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [openProfileOptions, setOpenProfileOptions] = useState(true);

  const authState = useAuth();
  const generalState = useGeneralSettings();

  return (
    <div
      className="flex flex-col w-[260px] min-w-[260px] p-5 box-border gap-5 font-inter h-full z-10 bg-[#F5F5F5]"
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
        <div
          className="py-2 px-3 bg-[#ffffff6c] rounded-lg flex items-center justify-between text-[#9C9C9C] text-xs cursor-pointer"
          onClick={() => {
            authState?.loggedUser?.activePlan
              ? window.open(
                  `https://collab.anchors.in/${authState?.loggedUser?.slug}`
                )
              : navigate("/influencer/payment");
          }}
        >
          collab.anchors.in/{authState?.loggedUser?.slug?.slice(0, 5) + "..."}
          <MdOutlineContentCopy
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              navigator.clipboard.writeText(
                `https://collab.anchors.in/${authState?.loggedUser?.slug}`
              );
              toast.info("Link Copied", {
                position: "top-center",
                autoClose: 1000,
              });
            }}
          />
        </div>
      )}

      {/* tags ------------ */}
      {authState?.loggedUser?.featuredData?.value &&
      authState?.loggedUser?.activePlan ? (
        <span className="text-[#047857] w-full px-3 flex items-center justify-center gap-1 text-xs">
          <TbCrown size={16} /> FEATURED
        </span>
      ) : (
        <span className="text-[#FF6767] w-full px-3 flex items-center justify-center gap-1 text-xs">
          <TbMoodSad size={16} /> NOT FEATURED
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
              {window.location.pathname === "/influencer/build_profile" && (
                <span className="flex text-xs items-center gap-2">
                  <GiTwoCoins color="#FFD700" />{" "}
                  {generalState.SidebarChipsCount.one}
                </span>
              )}
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
              {window.location.pathname === "/influencer/build_profile" && (
                <span className="flex text-xs items-center gap-2">
                  <GiTwoCoins color="#FFD700" />{" "}
                  {generalState.SidebarChipsCount.two}
                </span>
              )}
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
              {window.location.pathname === "/influencer/build_profile" && (
                <span className="flex text-xs items-center gap-2">
                  <GiTwoCoins color="#FFD700" />{" "}
                  {generalState.SidebarChipsCount.three}
                </span>
              )}
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
              {window.location.pathname === "/influencer/build_profile" && (
                <span className="flex text-xs items-center gap-2">
                  <GiTwoCoins color="#FFD700" />{" "}
                  {generalState.SidebarChipsCount.four}
                </span>
              )}
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
              {window.location.pathname === "/influencer/build_profile" && (
                <span className="flex text-xs items-center gap-2">
                  <GiTwoCoins color="#FFD700" />{" "}
                  {generalState.SidebarChipsCount.five}
                </span>
              )}
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
