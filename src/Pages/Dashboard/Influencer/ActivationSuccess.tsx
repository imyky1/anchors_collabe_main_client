import React from "react";
import { CiGlobe } from "react-icons/ci";
import { MdOutlineContentCopy } from "react-icons/md";
import { useAuth } from "../../../Providers/Auth";
import { toast } from "react-toastify";

const ActivationSuccess: React.FC = () => {
  const authState = useAuth()
  const handleCopy = () => {
    let textToCopy =`collab.anchors.in/${authState?.loggedUser?.slug}`;
    navigator.clipboard.writeText(textToCopy);
    toast.success("Your profile Link Copied", {
      autoClose: 1000,
    });
  };
  return (
    <div className="w-full h-full flex flex-col gap-3 items-center justify-center font-public">
      <img
        src="/successTick.png"
        alt=""
        className="w-28 h-28 mb-6 animate-pulse"
      />
      <h1 className="text-[#10B981] text-3xl font-bold">
        1-Year Membership Activated!
      </h1>
      <p className="text-[#757575] text-xl">
        You’re all set for exciting collaborations
      </p>

      <div className="py-2 px-3 bg-[#ffffff6c] rounded-lg flex items-center gap-2 text-[#9C9C9C] text-sm mt-5">
        <CiGlobe /> collab.anchors.in/{authState?.loggedUser?.slug}....
        <MdOutlineContentCopy onClick={handleCopy} className="cursor-pointer" />
      </div>

      <p className="text-[#757575] text-[16px] text-center mt-7">
        <b>Tip:</b> Showcase your Collab profile in your bio to attract
        <br />
        more brands
      </p>
    </div>
  );
};

export default ActivationSuccess;
