import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserInfo.css";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import mixpanel from "mixpanel-browser";
import { MdCelebration } from "react-icons/md";
import { useAuth } from "../../../Providers/Auth";
import Navbar from "../../../Components/Navbar/Navbar";
import { useInfluencer } from "../../../Providers/Influencer";
import { useGeneralSettings } from "../../../Providers/General";
import { FaLinkedinIn } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { MdOutlineOpenInNew } from "react-icons/md";
import { HiUsers } from "react-icons/hi";


const UserInfo = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies();

  const authState = useAuth();
  const influencerState = useInfluencer();
  const generalState = useGeneralSettings();

  const referCode = localStorage.getItem("anchors_collab_refer");
  const [value, setValue] = useState(authState?.loggedUser?.mobile);
  const [data, setdata] = useState({
    linkedinLink: authState?.loggedUser?.linkedinLink,
    mobile: value,
    refered_code: referCode,
  });

  useEffect(() => {
    mixpanel.track("Page visited Anchors Collab");
  }, []);

  useEffect(() => {
    if (authState?.loggedUser?.is_verified) {
      navigate("/dashboard");
    }
  }, [authState?.loggedUser]);

  const handleChnage = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const saveDetails = async () => {
    generalState?.setLoading(true);
    mixpanel.track("Save Details anchors collab");
    const linkedinProfileRegex =
      /^https:\/\/(www\.|in\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?.*$/;

    try {
      data.mobile = value;

      if (!data?.linkedinLink || !data?.mobile) {
        generalState?.setLoading(false);
        toast.error("Please fill in both LinkedIn profile and Mobile number.", {
          autoClose: 1500,
        });
        return;
      } else if (!linkedinProfileRegex.test(data?.linkedinLink)) {
        generalState?.setLoading(false);
        toast.error("Enter your linkedin profile link", {
          autoClose: 1500,
        });
        return;
      } else if (value.length < 8) {
        generalState?.setLoading(false);
        toast.error("Enter a proper mobile number", {
          autoClose: 1500,
        });
        return;
      }

      const result = await influencerState?.SaveUserInfo(data);
      if (result.success) {
        authState?.setReFetchUserData((prev) => {
          !prev;
        });
        generalState?.setLoading(false);
        navigate(`/influencer/otp-verify?number=${data?.mobile}`);
        sendOTP();
      } else {
        generalState?.setLoading(false);
        toast.error(result?.error, {
          autoClose: 1500,
        });
      }
    } catch (e) {
      generalState?.setLoading(true);
      console.log(e);
    }
  };

  const sendOTP = async () => {
    if (data?.mobile > 4) {
      const json = await influencerState?.SentMessageFromSNS(
        data?.mobile ?? ""
      );

      if (json?.MessageID) {
        toast.success("OTP sent successfully", {
          autoClose: 1500,
        });

        let otpcode = parseInt(json?.code - 145626) * 562002;
        setCookie("ccoondfe", otpcode, { maxAge: 120 }); // valid for one minute
      }
    } else {
      toast.error("Enter a proper mobile number", {
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      {/* {isLoading && <LoaderOne />} */}
      <div className="info_container">
        <Navbar />

        <div className="content mt-5">
          {/* <span
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
          </span> */}

          <div className="text mb-10">
            <h1>Welcome, {authState?.loggedUser?.name?.split(" ")[0]}</h1>
            <p>
              {" "}
              Fill the Details to Unlock your Referral Code
              <br />
              Be a <b>Top Referrer</b>: Avail perks!
            </p>
          </div>
          <form className="userform" action="">
            <div>
            <div className="input_field">
              <div style={{marginLeft:'10px'}}><FaLinkedinIn size={16} color="#757575"/></div>
              <input
                type="text"
                name="linkedinLink"
                value={data?.linkedinLink}
                onChange={handleChnage}
                placeholder="https://www.linkedin.com/in/ravi-ahirwar/"
              />
            </div>
            <div style={{
              cursor:'pointer',
              display:'flex',
              alignItems:'center',
              gap:'5px',
              fontFamily:'Public Sans',
              fontWeight:'400',
              fontSize:'12px',
              color:'#FF5C5C'
            }} onClick={()=>{window.open("https://www.linkedin.com/in/")}}>Get LinkedIn Profile link <MdOutlineOpenInNew /></div>
            </div>
            <div className="input_field">
              {/* <img src="/call.svg" alt="" /> */}
              <div style={{marginLeft:'10px'}}><IoCall size={16} color="#757575"/></div>
              <PhoneInput
                style={{ width: "100%" }}
                name="mobile"
                value={value}
                onChange={setValue}
                placeholder="8799710137"
                defaultCountry="IN"
              />
            </div>
            <div className="input_field">
              {/* <img src="/referal.svg" alt="" /> */}
              <div style={{marginLeft:'10px'}}><HiUsers size={16} color="#757575"/></div>
              <input
                type="text"
                name="refered_code"
                value={data?.refered_code}
                onChange={handleChnage}
                placeholder="Enter your referral code"
              />
            </div>
          </form>
        </div>
        <footer className="footer">
          <button onClick={saveDetails}>Continue →</button>
        </footer>
      </div>
    </>
  );
};
export default UserInfo;