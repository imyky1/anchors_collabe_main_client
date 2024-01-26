import React from "react";
import { CiGlobe } from "react-icons/ci";
import { MdContentCopy } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import { GiAlliedStar } from "react-icons/gi";
import "./Dashboard.css";
import { useAuth } from "../../../../Providers/Auth";

export const Dashboard = () => {

  const authState = useAuth()

  const handleCopy = (textToCopy) => {
    navigator.clipboard.writeText(textToCopy);
    // toast.success(
    //       "Link Copied",
    //       {
    //         position: "top-center",
    //         autoClose: 1000,
    //       }
    //     );
  };

  return (
    <>
      <ToastContainer />
      <div className="influnecer_dashboard_contianer">
        <div className="influencer_dashboard_wrapper">
          {/* first card */}
          <div className="influncer_dashboard_featured_wrapaper">
            <div className="dashboard_left_featured_container">
              <h1>Get Featured on Brands Discovery Dashboard</h1>
              <h3>Only Top 5 Creators will be featured</h3>
              <div className="dashboard_referral_link_container">
                <h2>Referral Link</h2>
                <div className="dashboard_referral_link">
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <CiGlobe size={24} color="#757575" />
                    <h3>collab.anchors.in?refer={authState?.loggedUser?.referralCode}</h3>
                  </div>
                  <div onClick={()=>handleCopy(`https://collab.anchors.in?refer=${authState?.loggedUser?.referralCode}`)} style={{ cursor: "pointer" }}>
                    <MdContentCopy size={24} color="#757575" />
                  </div>
                </div>
              </div>
            </div>
            <div className="dashboard_right_featured_container">
              <div className="right_featured_demo_containrer">
                <div className="right_featured_label">
                  <h4>
                    <GiAlliedStar size={16} /> Featured
                  </h4>
                </div>
                <div className="right_featured_content">
                  <div className="right_featured_main_content">
                    <img
                      src="/image 2.png"
                      alt=""
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <h1>Your Name</h1>
                      <h2>56K+ Followers</h2>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "2px",
                      height: "40px",
                      background: "#C6A700",
                    }}
                  ></div>
                  <div className="right_featured_main_content">
                    <div>
                      <h1>Collab Portfolio</h1>
                      <h2>Collaborated with 6+ company</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* second card */}
          <div className="influncer_dashboard_featured_wrapaper">
            <div className="dashboard_left_featured_container">
              <h1>Let your audience & Brands knows about you</h1>
              <h3>
                By adding on LinkedIn increase chances of brand collaboartion
              </h3>
              <div className="dashboard_referral_link_container">
                <h2>Collaboration Public Profile</h2>
                <div className="dashboard_referral_link">
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <CiGlobe size={24} color="#757575" />
                    <h3>collab.anchors.in/{authState?.loggedUser?.slug}</h3>
                  </div>
                  <div onClick={()=>handleCopy(`https://collab.anchors.in/${authState?.loggedUser?.slug}`)} style={{ cursor: "pointer" }}>
                    <MdContentCopy size={24} color="#757575" />
                  </div>
                </div>
              </div>
            </div>
            <div className="dashboard_right_featured_container">
              <div
                style={{
                  position: "relative",
                  background: "transparent",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "400px",
                  marginRight: "60px",
                }}
                className="right_featured_demo_containrer"
              >
                <div className="right_featured_main_content_2">
                  <h3>
                    Paste Link in <br /> your LinkedIn here
                  </h3>
                  <img
                    className="right_featured_arrow_vector"
                    src="/Vector 1.svg"
                    alt=""
                  />
                </div>

                <img src="/image 3.png" alt="" style={{ width: "200px", height: "220.606px" }}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
