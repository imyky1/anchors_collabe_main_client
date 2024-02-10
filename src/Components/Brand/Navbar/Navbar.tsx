import mixpanel from "mixpanel-browser";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { PiCoins } from "react-icons/pi";
import { useGeneralSettings } from "../../../Providers/General";

interface NavbarProps {
  profile: string;
  credits: Number;
}

export const Navbar3: React.FC<NavbarProps> = ({ profile, credits }) => {
  const generalState = useGeneralSettings();

  const [openChipsInfo, setOpenChipsInfo] = useState(false);

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
            <p>
              The more authentic information you fill, the more chips you will
              earn
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

      <div className="w-full box-border px-5 py-3 flex items-center flex-row-reverse gap-8 bg-[#F5F5F5] relative">
        <img
          src={"/successTick.png"}
          alt=""
          className="rounded-full w-10 h-10"
        />

        <span
          className="bg-[#D1FAE5] py-2 px-3 border-none rounded-lg text-[16px] text-[#121212] font-[Inter] flex items-center gap-2 cursor-pointer"
          onClick={() => {
            setOpenChipsInfo(true);
            mixpanel.track("Clicked the chips on Navbar in Collab");
          }}
        >
          {"Credits Available -"} <PiCoins size={16} color="#FFD700" />{" "}
          <b>{credits}</b>
        </span>

        <div className="absolute left-[28%] flex items-center justify-center text-xs font-inter gap-5">
          {/* <b>Note</b> - Currently you are using&nbsp;<b>Early Access</b> */}

          {/* <span
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
            </span> */}

          {/* <span
              className="bg-[#ACFFE74D] py-2 px-3 border-none rounded-md text-[#047857] flex items-center gap-2 cursor-pointer"
              onClick={() => {
                setOpenChipsInfo(true);
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
            </span> */}
        </div>
      </div>
    </>
  );
};
