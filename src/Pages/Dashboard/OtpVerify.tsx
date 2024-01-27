import React, { useEffect, useState } from "react";
import "./UserInfo/UserInfo.css";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import mixpanel from "mixpanel-browser";
import { MdCelebration } from "react-icons/md";
import { useAuth } from "../../Providers/Auth";
import { useInfluencer } from "../../Providers/Influencer";
import Navbar from "../../Components/Navbar/Navbar";

const OtpVerify = () => {
  const params = new URLSearchParams(window.location.search);
  const navigate = useNavigate();
  const authState = useAuth();
  const [otp, setotp] = useState("");
  const influencerState = useInfluencer();
  const [number, setNumber] = useState(null);
  const [cookies, setCookie] = useCookies();

  useEffect(() => {
    if (authState?.loggedUser?.is_verified) {
      navigate("/dashboard");
    }
  }, [authState?.loggedUser]);

  useEffect(() => {
    if (params.get("number")) {
      setNumber(params.get("number"));
    }
    mixpanel.track("Page visited Anchors Collab");
  }, []);

  const verfiyOTP = async () => {
    mixpanel.track("Verify otp anchors collab");
    if (otp?.length !== 6) {
      toast.info("Enter a proper code", {
        position: "top-center",
        autoClose: 2000,
      });
    } else {
      let code = cookies?.ccoondfe;
      if (!code) {
        toast.error("OTP was valid for 2 minute, Please retry again", {
          position: "top-center",
          autoClose: 2000,
        });
      } else {
        if (parseInt(otp) === parseInt(parseInt(code) / 562002)) {
          // Save the number in user info ----------
          let result = await influencerState?.SaveUserInfo({
            is_verified: true,
          });

          if (result) {
            toast.success("Verification was successfull", {
              position: "top-center",
              autoClose: 2000,
            });

            window.open("/influencer", "_self");
          } else {
            toast.error("Some error occured in verification", {
              position: "top-center",
              autoClose: 2000,
            });
          }
        } else {
          toast.error("Invalid OTP!!!. Try again!!!", {
            position: "top-center",
            autoClose: 2000,
          });
        }
      }
    }
  };

  return (
    <div className="info_container">
      <Navbar />
      <div className="content">
        <span
          style={{
            display: "flex",
            gap: "10px",
            borderRadius: "1000px",
            color: "#059669",
            borderColor: "#059669",
            marginBottom: "40px",
            cursor: "default",
          }}
          className="button_type_01"
        >
          <MdCelebration size={24} /> Doors Open Feb 3rd...
        </span>

        <div className="text">
          <h1>Welcome, {authState?.loggedUser?.name?.split(" ")[0]}</h1>
          <p>
            {" "}
            Fill the Details to Unlock your Referral Code
            <br />
            Be a <b>Top Referrer</b>: Avail perks!
          </p>
        </div>
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "Public sans",
            textAlign: "center",
            fontWeight: "400",
            color: "#757575",
            marginTop: "20px",
          }}
        >
          OTP sent to this number <b>{`+${number}`}</b>{" "}
          <img style={{cursor:'pointer'}} onClick={()=>{navigate('/influencer/userinfo')}} src="/edit.svg" alt="" />{" "}
        </p>
        <p
          style={{
            fontFamily: "Public sans",
            textAlign: "center",
            fontWeight: "400",
            color: "#757575",
          }}
        >
          Please enter OTP to continue
        </p>
        <form className="userform" action="">
          <div className="input_field">
            <img src="/otp.svg" alt="" />
            <input
              type="text"
              value={otp}
              onChange={(e) => setotp(e.target.value)}
              placeholder="OTP"
            />
          </div>
        </form>
      </div>
      <footer className="footer" onClick={verfiyOTP}>
        <button>Continue →</button>
      </footer>
    </div>
  );
};
export default OtpVerify;
