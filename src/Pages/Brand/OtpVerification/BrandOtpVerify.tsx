import { Button1 } from "../../../Components/Buttons";
import { InputField2 } from "../../../Components/Fields";
import { BrandHeader } from "../SignUp/BrandSignUp";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { BsFillKeyFill } from "react-icons/bs";
import { useAuth } from "../../../Providers/Auth";
import { toast } from "react-toastify";
import mixpanel from "mixpanel-browser";

export const BrandOtpVerify = () => {
  const [Otp, SetOtp] = useState(null);
  const navigate = useNavigate();
  const authState = useAuth();


  const [searchParams, setSearchParams] = useSearchParams();
  const email = searchParams.get("email");
  const type = searchParams.get("type")
  // console.log(email,type)

  const handleChange = (e: { target: { value: any } }) => {
    SetOtp(e.target.value);
  };

  const handleResend = async(email)=> {
    const result = await authState.sendingOTPFeature(email)
      if(result.success){
        mixpanel.track("Requested Resend Otp");
        toast.info("Otp Sent Succesfully to your MailBox", {
          position: "top-center",
          autoClose: 2000,
        });
      }else{
        return toast.error(result.Error, {
          position: "top-center",
          autoClose: 2000,
        });
      }
  }

  const handleSubmit = async () => {
    try {
      if (!Otp) {
        return toast.error("Enter a proper code", {
          position: "top-center",
          autoClose: 2000,
        });
      }
      const result = await authState.verfiyOTP(Otp,email,type);
      if(result?.Error){
        return toast.error(result?.Error, {
          position: "top-center",
          autoClose: 2000,
        });
      }else{
        console.log(result)
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div style={{ maxWidth: "100%" }} className="container">
      <BrandHeader
        text={"Login →"}
        onClick={() => {
          navigate("/Brand/Login");
        }}
        visible={false}
        style={{ justifyContent: "flex-start" }}
      />
      <div className="BrandSignUpContent">
        <img src="/BrandOtpIcon.png" alt="" />
        <div className="BrandSignUpMainContent">
          <h1 style={{ fontWeight: "500" }}>OTP Verification</h1>
          <h4>
            A One-Time Password (OTP) has been sent to{" "}
            <div style={{ display: "flex", gap: "4px", fontWeight: "700" }}>
              {email}
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  type === "Login" ?  navigate("/Brand/Login") : navigate("/Brand/SignUp")
                }}
              >
                <FiEdit size={16} />
              </div>
            </div>
          </h4>

          <div style={{ marginTop: "20px" }} className="BrandSignUpInputField">
            <InputField2
              value={Otp}
              placeholder={"Enter OTP to continue"}
              onChange={handleChange}
              icon={<BsFillKeyFill size={16} color="#757575" />}
            />
          </div>

          <h3 style={{ marginBottom: 0, marginTop: "12px" }}>
            OTP is valid for 2 minutes!
          </h3>

          <div style={{ marginTop: "40px" }}>
            <Button1 text={"Verify OTP →"} onClick={handleSubmit} />
          </div>

          <h5 style={{ display: "flex", marginTop: "20px" }}>
            Didn't receive OTP?{" "}
            <div onClick={()=>handleResend(email)} style={{ color: "#FF5C5C", cursor: "pointer" }}>
              Click here to resend.
            </div>
          </h5>
        </div>
      </div>
    </div>
  );
};
