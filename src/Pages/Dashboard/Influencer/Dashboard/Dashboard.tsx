import React from "react";
import { CiGlobe } from "react-icons/ci";
import { MdContentCopy } from "react-icons/md";
import { toast } from "react-toastify";
import { GiAlliedStar } from "react-icons/gi";
import "./Dashboard.css";
import { useAuth } from "../../../../Providers/Auth";

export const Dashboard = () => {

  const authState = useAuth()

  const handleCopy = (textToCopy) => {
    navigator.clipboard.writeText(textToCopy);
    toast.info(
          "Link Copied",
          {
            position: "top-center",
            autoClose: 1000,
          }
        );
  };

  return (
    <>
      <div className="influnecer_dashboard_contianer">
        <div className="influencer_dashboard_wrapper">
          {/* first card */}
          <div className="influncer_dashboard_featured_wrapaper">
            <div className="dashboard_left_featured_container">
              <h1>Refer & Get Featured!</h1>
              <h3>Top 5 Referrers grab the spotlight! Visible to ALL Brands on Discovery Dashboard</h3>
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
                      src={authState?.loggedUser?.profile}
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
                      <h1>{authState?.loggedUser?.name}</h1>
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
                      <h2>Worked with 6+ companies</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* second card */}
          <div className="influncer_dashboard_featured_wrapaper">
            <div className="dashboard_left_featured_container">
              <h1>Share Your Profile on LinkedIn</h1>
              <h3>
              More visibility, more deals. Add your public profile to LinkedIn & get seen by brands.
              </h3>
              <div className="dashboard_referral_link_container">
                <h2>Public Profile Link</h2>
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
                  Add Link Here
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
