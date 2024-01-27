import React from "react";
import "./shareProfile.css";
import { CiGlobe } from "react-icons/ci";
import { MdContentCopy } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

export const ShareProfile = () => {

    const handleCopy = ()=>{
        let textToCopy = "You Copied me!"
        navigator.clipboard.writeText(textToCopy);
        // toast.success(
        //       "Link Copied",
        //       {
        //         position: "top-center",
        //         autoClose: 1000,
        //       }
        //     );
    }
  return (
    <>
    <ToastContainer limit={1} />
    <div className="infulencr_shareprofile_container">
        
      <div className="influencer_shareprofile_wrapper">
        <div className="influencer_left_shareprofile_container">
            <div className="left_successfull_tick_container">
                <img src="\src\assets\Images\tick_circle.svg" alt="" />
            </div>
          <h1>Congratulations! <br /> You have Setup your profile</h1>
          <div className="influencer_left_container_link_container">
            <h1>Your Public for collab</h1>
            <div className="left_container_link_div">
              <CiGlobe />
              <h3>collab.anchors.in/raviahirwar</h3>
              <div onClick={handleCopy} style={{cursor:'pointer'}}><MdContentCopy color="#424242"/></div>
              
            </div>
          </div>
          <h2>
            Add this link in to your linkedin profile, So brands can also
            reachout to you through your linkedin
          </h2>
        </div>
        <div className="influencer_right_shareprofile_container">
          <img
            className="right_link_direction_vector"
            src="\src\assets\Images\Vector 1.svg"
            alt=""
          />
          <h3>Paste Link in <br /> your LinkedIn here</h3>
          <img src="\src\assets\Images\image 2.png" alt="" />
        </div>
      </div>
    </div>
    </>
  );
};
