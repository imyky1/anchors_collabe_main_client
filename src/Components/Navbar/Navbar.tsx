import React, { useState } from "react";
import logo from "/collabLogo.png";
import { useAuth } from "../../Providers/Auth";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import mixpanel from "mixpanel-browser";
import { useGeneralSettings } from "../../Providers/General";
import { PiCoins } from "react-icons/pi";

interface NavbarProps {
  profile: string;
  chips?: number;
  topCreatorChips?: number;
}

// main page navbar ----------------
const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const authState = useAuth();

  return (
    <div className="w-screen box-border px-[4%] md:px-[10%] py-3 flex items-center justify-between fixed top-0 left-0">
      <img
        src={logo}
        alt=""
        className="w-20 md:w-32 cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      />

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
    <div className="w-full box-border px-4 py-3 flex items-center justify-between bg-white">
      <img src={logo} alt="" className="w-20 md:w-32 cursor-pointer" />

      {/* <img
        src="https://i.pinimg.com/736x/ab/b8/8f/abb88fe4cc8e13fe7d49f1c56be8eccd.jpg"
        alt=""
        className="rounded-full w-10 h-10"
      /> */}
    </div>
  );
};

// dashboard navbar
export const Navbar3: React.FC<NavbarProps> = ({
  profile,
  chips,
  topCreatorChips,
}) => {
  const generalState = useGeneralSettings();

  const [openChipsInfo, setOpenChipsInfo] = useState(false);
  const [MostChipsInfo, OpenMostChipsInfo] = useState(false);

  return (
    <>
      {openChipsInfo && (
        <div className="w-screen h-screen fixed top-0 left-0 z-40 flex items-center justify-center bg-[#12121280]">
          <div className="flex flex-col p-5 gap-5 items-center justify-center text-center w-[400px] bg-[#F5F5F5] rounded-lg font-inter text-[#757575] text-[16px]">
            <h1 className="text-xl font-bold text-[#424242]">What is Chips</h1>

            <p>
              Chips are your currency to attract brands. Aim for 300+ chips for
              maximum visibility.
            </p>
            <p className="w-[full] flex gap-1 flex-col text-start justify-start">
              <b>To earn chips:</b>
              <div>
                <b>Complete your profile:</b> Accuracy matters! Every detail
                unlocks more chips. <br />
              </div>
              <div>
                <b>Share the love:</b> Invite friends & score 20 chips each!
              </div>
            </p>
            <p>
              Top 5 Chip earners get "Featured" for brands to see, so aim high!
            </p>

            <button
              className="px-5 py-3 rounded bg-[#FF5C5C] text-sm text-[#FAFAFA]"
              onClick={() => {
                setOpenChipsInfo(false);
              }}
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {MostChipsInfo && (
        <div className="w-screen h-screen fixed top-0 left-0 z-40 flex items-center justify-center bg-[#12121280]">
          <div className="flex flex-col p-5 gap-5 items-center justify-center text-center w-[400px] bg-[#F5F5F5] rounded-lg font-inter text-[#757575] text-[16px]">
            <h1 className="text-xl font-bold text-[#424242]">What is Chips</h1>

            <p>Chips are your currency to attract brands.</p>
            <p>
              This is the highest chips collected yet by your fellow creators.
              Can you beat it?
            </p>
            <p className="flex gap-1 flex-col text-start justify-start">
              <b>Collect more chips:</b>
              <div>
                <b>Build your profile (accuracy matters!)</b>
              </div>
              <div>
                <b>Refer friends (both earn 20 chips!)</b>
              </div>
            </p>
            <p>
              Top 5 Chip earners get "Featured" for brands to see, so aim high!
            </p>

            <button
              className="px-5 py-3 rounded bg-[#FF5C5C] text-sm text-[#FAFAFA]"
              onClick={() => {
                OpenMostChipsInfo(false);
              }}
            >
              Got it
            </button>
          </div>
        </div>
      )}

      <div className="w-full box-border px-5 py-3 flex items-center flex-row-reverse gap-8 bg-[#F5F5F5] relative">
        <img src={profile} alt="" className="rounded-full w-10 h-10" />

        <button
          className="text-[#757575] items-center flex gap-1 hover:text-[#FF5C5C] p-2 z-10"
          onClick={() => {
            window.open(
              `https://api.whatsapp.com/send?phone=918799710137&text=Hey,%20I%20would%20like%20to%20connect%20with%20anchors%20Team`
            );
            mixpanel.track("Help clicked on Navbar Collab Dashboard");
          }}
        >
          <FaWhatsapp /> Help
        </button>

        <div className="absolute left-[28%] flex items-center justify-center text-xs font-inter gap-5">
          {/* <b>Note</b> - Currently you are using&nbsp;<b>Early Access</b> */}

          <span
            className="bg-[#FFF] py-2 px-3 border-none rounded-lg text-[#121212] flex items-center gap-2 cursor-pointer"
            onClick={() => {
              setOpenChipsInfo(true);
              mixpanel.track("Clicked the chips on Navbar in Collab");
            }}
          >
            <PiCoins size={16} color="#FFD700" /> Your Chips Collected -{" "}
            {generalState.SidebarChipsCount.one +
              generalState.SidebarChipsCount.two +
              generalState.SidebarChipsCount.three +
              generalState.SidebarChipsCount.four +
              generalState.SidebarChipsCount.five >
            chips
              ? generalState.SidebarChipsCount.one +
                generalState.SidebarChipsCount.two +
                generalState.SidebarChipsCount.three +
                generalState.SidebarChipsCount.four +
                generalState.SidebarChipsCount.five
              : chips}
          </span>

          <span
            className="bg-[#ACFFE74D] py-2 px-3 border-none rounded-md text-[#047857] flex items-center gap-2 cursor-pointer"
            onClick={() => {
              OpenMostChipsInfo(true);
              mixpanel.track("Clicked the chips on Navbar in Collab");
            }}
          >
            <PiCoins size={16} color="#FFD700" /> Most Chips Collected -{" "}
            {topCreatorChips <
            generalState.SidebarChipsCount.one +
              generalState.SidebarChipsCount.two +
              generalState.SidebarChipsCount.three +
              generalState.SidebarChipsCount.four +
              generalState.SidebarChipsCount.five
              ? generalState.SidebarChipsCount.one +
                generalState.SidebarChipsCount.two +
                generalState.SidebarChipsCount.three +
                generalState.SidebarChipsCount.four +
                generalState.SidebarChipsCount.five +
                50
              : topCreatorChips}
          </span>
        </div>
      </div>
    </>
  );
};

export default Navbar;
