
import { useNavigate } from "react-router-dom";
import "./rankPage.css";
import { useAuth } from "../../Providers/Auth";
import Navbar from "../../Components/Navbar/Navbar";

export const RankPage = () => {
  const navigate = useNavigate();
  const authState = useAuth();
  console.log(authState)

  return (
    <>
      {/* {isLoading && <LoaderOne />} */}

      <div style={{maxWidth:'100%'}} className="container">
        <Navbar />

        <div className="backgroundImage"></div>
        <div className="rank_page_content">
          <h1>{`Congrats ${authState?.loggedUser?.name}!`}</h1>
          <h2>{`You ranked #${23}`}</h2>
          <h3>
            As promised, 100% off & Early Access awaits... <br /> Don't miss
            out! Grab this golden opportunity.
          </h3>

          <div className="rank_page_referral_code">
            Coupon Code : <b> REFERRALVIP100 </b>
          </div>
          <h4>Expires on Jan 31, 2024</h4>
          <button onClick={()=>{navigate("/influencer/activate")}}>Claim Your Reward →</button>
        </div>
      </div>
    </>
  );
};
