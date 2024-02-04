import { Button1 } from "../../../Components/Buttons";
import { InputField2 } from "../../../Components/Fields";
import { BrandHeader } from "../SignUp/BrandSignUp";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { BsFillKeyFill } from "react-icons/bs";
import { useAuth } from "../../../Providers/Auth";

export const BrandOtpVerify = () => {
  const [Otp, SetOtp] = useState(null);
  const navigate = useNavigate();
  const authState = useAuth();
  console.log(authState);

  const [searchParams, setSearchParams] = useSearchParams();
  const email = searchParams.get("email");
  const type = searchParams.get("type")
  // console.log(email,type)

  const handleChange = (e: { target: { value: any } }) => {
    SetOtp(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (!Otp) {
        return alert("Please Enter Your Email");
      }
      await authState.verfiyOTP(Otp,email,type);
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
                  navigate("/Brand/Login");
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
            <div style={{ color: "#FF5C5C", cursor: "pointer" }}>
              Click here to resend.
            </div>
          </h5>
        </div>
      </div>
    </div>
  );
};
