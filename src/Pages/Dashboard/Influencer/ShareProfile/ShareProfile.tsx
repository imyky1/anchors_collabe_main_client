import React from "react";
import "./ShareProfile.css";
import { CiGlobe } from "react-icons/ci";
import { MdContentCopy } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { useAuth } from "../../../../Providers/Auth";

export const ShareProfile = () => {
  const authState = useAuth();

  const handleCopy = () => {
    let textToCopy =`collab.anchors.in/${authState?.loggedUser?.slug}`;
    navigator.clipboard.writeText(textToCopy);
    toast.success("Your profile Link Copied", {
      autoClose: 1000,
    });
  };
  return (
    <>
      <div className="infulencr_shareprofile_container">
        <div className="influencer_shareprofile_wrapper">
          <div className="influencer_left_shareprofile_container">
            <div className="left_successfull_tick_container">
              <img
                src="/successTick.png"
                className="animate-pulse"
                alt=""
                style={{
                  width: "100px",
                  height: "100px",
                }}
              />
            </div>
            <h1>
              Congratulations! <br />
              Your Profile Is All Set
            </h1>
            <div className="influencer_left_container_link_container">
              <h1>Your public profile link</h1>
              <div className="left_container_link_div">
                <CiGlobe />
                <h3>collab.anchors.in/{authState?.loggedUser?.slug}</h3>
                <div onClick={handleCopy} style={{ cursor: "pointer" }}>
                  <MdContentCopy color="#424242" />
                </div>
              </div>
            </div>
            <h2>
              Add your Public Profile to your LinkedIn. Make it easy for brands
              to find & connect with you!
            </h2>
          </div>
          <div className="influencer_right_shareprofile_container">
            <img
              className="right_link_direction_vector animate-bounce"
              src="/Vector 1.svg"
              alt=""
            />
            <h3>Add Link Here</h3>
            <img
              src="/image 2.png"
              alt=""
              style={{
                width: "330px",
                height: "545px",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
