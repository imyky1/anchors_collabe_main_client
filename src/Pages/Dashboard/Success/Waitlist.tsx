import React, { useContext, useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./success.css";
import axios from "axios";
import { toast } from "react-toastify";
import mixpanel from "mixpanel-browser"
import { MdCelebration } from "react-icons/md";
import { SlLockOpen } from "react-icons/sl";
import { useAuth } from "../../../Providers/Auth";
import Navbar from "../../../Components/Navbar/Navbar";
import { IoCopyOutline } from "react-icons/io5";


const Waitlist = () => {
  const authState = useAuth();
  const navigate = useNavigate();
  const [code, setCode] = useState();
  const [currentUser, setCurrentUser] = useState("");
  const [leaderboard, setLeaderboard] = useState({});


  useEffect(() => {
    mixpanel.track("Page visited Anchors Collab");
    setCurrentUser(authState?.loggedUser?.name);
    setCode(authState?.loggedUser?.referralCode);
  }, [authState?.loggedUser]);

  useEffect(() => {
    const getData = async () => {
      try {
        const host = import.meta.env.VITE_BACKEND_SERVER_URL;
        const response = await axios.get(`${host}/influencer/getAll`,{
          headers: {
            jwtToken: localStorage.getItem("jwtToken"),
          },
        });
        console.log(response)

        if (response.data) {
          // const list = response.data.all_users.map((item) => ({
          //   name: item.name,
          //   count: item.refered_to?.length,
          // }));
          console.log(response.data);
          setLeaderboard({
            data: response.data.sortedLeaderboard,
            currentUserRank: response.data.currentUserIndex,
            userIndex: response.data?.userIndex,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

 

  const WA_content = [
    {
      content: `Hey, 
just signed up for the waitlist on *anchors | Collab*!   
It's a platform where creators connect with brands for awesome collaborations. 
Let's be the first to know and join using ${window.location.origin}?refer=${code} !`,
    },
    {
      content: `Hey,
Quick update – I'm on the waitlist for *anchors | Collab*, the space where creators unlock brand collaborations. 
🚀 Join me and be in the loop using ${window.location.origin}?refer=${code} !`,
    },
    {
      content: `Hey, *Exciting news*! 
I'm on the waitlist for *anchors | Collab*, the go-to for content creators eyeing brand deals.   
🎉 Be one of the first to know by joining me using ${window.location.origin}?refer=${code} !`,
    },
    {
      content: `Hey,
Just joined the waitlist for *anchors | Collab*!  It's where creators like us gear up for fantastic brand collaborations. 
Let's be in the loop together using ${window.location.origin}?refer=${code} !`,
    },
  ];

  const handleSendMessage = async () => {
    mixpanel.track("Share Message anchors collab");
    const randomIndex = Math.floor(Math.random() * WA_content.length); // Generate random index
    const selectedContent = WA_content[randomIndex].content; // Get the content using the random index
    const message = encodeURIComponent(selectedContent); // Encoding message for URL

    // The URL to open WhatsApp with the provided message
    const whatsappURL = `https://api.whatsapp.com/send?text=${message}`;

    // Open the URL in a new window
    window.open(whatsappURL, "_blank");
  };

  const copyContent = () => {
    mixpanel.track("Copy Referral link anchors collab");

    const contentToCopy = `${window.location.origin}?refer=${code}`; // Replace with your content

    navigator.clipboard
      .writeText(contentToCopy)
      .then(() => {
        toast.info("referral link copied to clipboard", {
          position: "top-center",
          autoClose: 2000,
        });
      })
      .catch((error) => {
        console.error("Error copying content: ", error);
      });
  };

  console.log(leaderboard)
  return (
    <div className="success_container">
        <Navbar/>
      <div className="content">
        <span
          style={{
            display: "flex",
            gap: "10px",
            border:'none',
            color: "#059669",
            fontWeight:'700',
            fontFamily:'Public Sans',
            marginBottom: "40px",
            cursor: "default",
          }}
          className="button_type_01"
        >
          <SlLockOpen />  Top 67 Granted Early Access
        </span>

        <div>
          <div className="text ">
            {leaderboard?.currentUserRank !== -1 ? (
              <section style={{display:'flex',gap:'10px',marginBottom:'10px'}}>
                <img src="/medals.svg" alt="" />
                Your Rank : <b>{leaderboard?.currentUserRank + 1}</b>
              </section>
            ) : (
              <section style={{marginBottom:'10px',display:'flex',gap:'10px'}}>
                <img src="/medals.svg" alt="" />
                Waitlist Number : <b>{leaderboard?.userIndex}</b>
              </section>
            )}
            <h1>
              {leaderboard?.currentUserRank + 1 > 0 &&
              leaderboard?.currentUserRank + 1 < 50 
                ? "Congratulations! "
                : "Almost there!"}
            </h1>
            <span>
              {leaderboard?.currentUserRank + 1 > 0 &&
              leaderboard?.currentUserRank + 1 < 50 ? (
                <>
                  You're Top 50!
                  <br /> Share more & secure your spot for Extra perks!
                </>
              ) : (
                <>
                  Share now !<br /> Minimum 1 referral required to be in the Top 50!
                </>
              )}
            </span>
            <div className="input_field">
              <img src="/internet.svg" alt="" />
              {`${window.location.origin}?refer=${code}`}
              <img
                onClick={copyContent}
                src="/copy.svg"
                alt=""
                className="copy"
              />
            </div>
            {/* <p>Share this link with your network to climb the leaderboard and <b>EARN Referral Rewards.</b> </p> */}
            <button onClick={handleSendMessage} className="WhatsApp">
            <FaWhatsapp />
              Share on WhatsApp
            </button>
          </div>

          <div>
            {/* <EventCountDown /> */}
            <div className="leaderboard">
              <h1>Referral Leaderboard</h1>
              <span>Joining Fee : ₹999/-</span>
              {/* <p>
                Top 200 Referrers :{" "}
                <b style={{ color: "#212121" }}>Early & FREE Access</b>
              </p> */}
              <p>
                Top 50 Referrers : <b style={{ color: "#212121" }}>50% off </b>
              </p>
              <table>
                <thead>
                  <tr style={{ background: "#F5F5F5" }}>
                    <th className="index">Rank</th>
                    <th className="name">Name</th>
                    <th className="count">Referral Count</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard?.currentUserRank !== -1 ? (
                    <tr className="current">
                      <td className="index">
                        {leaderboard?.currentUserRank + 1}
                      </td>
                      <td className="name">You</td>
                      <td className="count">
                        {leaderboard?.data &&
                          leaderboard?.data[leaderboard?.currentUserRank]
                            ?.count}
                      </td>
                    </tr>
                  ) : (
                    <tr className="current">
                      <td className="index">NA</td>
                      <td className="name">You</td>
                      <td className="count">0</td>
                    </tr>
                  )}
                  {leaderboard?.data?.map(
                    (item, index) =>
                      item.name !== currentUser && (
                        <tr key={index}>
                          <td className="index">{index + 1}</td>{" "}
                          {/* Index starts from 0, so add 1 */}
                          <td className="name">{item.name.split(" ")[0]}</td>
                          <td className="count">{item.count}</td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Waitlist;
