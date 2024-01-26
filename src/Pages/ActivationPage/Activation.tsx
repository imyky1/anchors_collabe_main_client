import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./success.css";
import "./ActivationPage.css";
import { LuBadgeCheck } from "react-icons/lu";
import Navbar from "../../Components/Navbar/Navbar";

const AcitvationPage = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 767);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 767);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="success_container">
      <Navbar/>

        <div className="activation_page_left_content">
          <div className="activaton_page_text">
            <LuBadgeCheck size={48} />
            <h1>1-year membership activated!</h1>
            <h2>Your journey to brand partnerships starts now.</h2>

            {isSmallScreen? '' : <button onClick={()=>{navigate("/influencer/")}}>Let’s Build Your Profile →</button>}
            <h3>
            {isSmallScreen ? <div style={{marginTop:'10px'}}>Profile editing not supported on mobile yet. Please switch to desktop!</div>: ''}
            </h3>
          </div>

          <div >
            {/* <EventCountDown /> */}
            <div  className="activation_page_leaderboard">
              <h1>3 Things to Remember</h1>
              <ol>
                <li>
                  {" "}
                  <b>Build Your Profile:</b> Showcase your skills & passion. The
                  more you share, the higher your chance of landing dream deals.
                </li>
                <li>
                  <b>Be Honest & Accurate:</b> Brands value authenticity. Fill in your
                  details truthfully to stand out from the crowd.
                </li>
                <li>
                  <b>LinkedIn link up:</b> Add your Collab profile to your LinkedIn
                  bio. Connect with brands directly!
                </li>
              </ol>
            </div>
          </div>
        </div>
    </div>
  );
};
export default AcitvationPage;
