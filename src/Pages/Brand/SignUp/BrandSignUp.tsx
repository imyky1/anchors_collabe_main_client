import { useNavigate } from "react-router-dom";
import { Button1, Button2 } from "../../../Components/Buttons";
import { toast } from "react-toastify";
import "./BrandSignUp.css";
import { InputField2 } from "../../../Components/Fields";
import { useEffect, useState } from "react";
import { IoMail } from "react-icons/io5";
import { useAuth } from "../../../Providers/Auth";
import mixpanel from "mixpanel-browser";

export const BrandHeader = (props) => {
  const navigate = useNavigate();

  return (
    <>
      <header
        style={{ ...props?.style, width: "100%" }}
        className="BrandHeader"
      >
        <div className="BrandHeaderLogo">
          <img
            onClick={() => {
              navigate("/");
            }}
            src="/collabLogo.png"
            alt=""
            className="my-auto w-20 md:w-32 cursor-pointer"
          />
        </div>
        {props.visible && (
          <Button2
            text={props.text}
            onClick={props.onClick}
            icon={props.icon}
            textColor={props.textColor}
            borderColor={props.ButtonBorderColor}
          />
        )}
      </header>
    </>
  );
};

export const BrandSignUp = () => {
  const navigate = useNavigate();
  const authState = useAuth();
  const [email, setEmail] = useState(null);

  if (
    localStorage.getItem("jwtToken") &&
    localStorage.getItem("UserType") === "Brand"
  ) {
    navigate("/Brand/Welcome");
  }
  useEffect(() => {
    mixpanel.track("Page visited Anchors Collab Brand SignUp");
  }, []);

  const handleChange = (e: { target: { value: any } }) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async () => {
    try {
      if (!email) {
        return toast.error("Please Enter Your Mail", {
          position: "top-center",
          autoClose: 2000,
        });
      }

      const mailexist = await authState.getBrandByEmail(email);
      if (!mailexist.success) {
        const result = await authState.sendingOTPFeature(email);
        if (result.success) {
          mixpanel.track("Requested Otp for SignUp");
          toast.info("Otp Sent Succesfully to your MailBox", {
            position: "top-center",
            autoClose: 2000,
          });
          navigate(`/Brand/Otp-verify?email=${email}&type=SignUp`);
        } else {
          return toast.error(result.Error, {
            position: "top-center",
            autoClose: 2000,
          });
        }
      } else {
        return toast.error("This Mail Already Exist! Please Login", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (e) {
      return toast.error("Something went Wrong!", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };
  return (
    <>
      <div style={{ maxWidth: "100%" }} className="container">
        <BrandHeader
          text={"Login →"}
          onClick={() => {
            navigate("/Brand/Login");
          }}
          visible={true}
        />
        <div className="BrandSignUpContent">
          <img src="/BrandSignupIcon.png" alt="" />
          <div className="BrandSignUpMainContent">
            <h1>Connect & Collaborate</h1>
            <h4>
              Find your perfect match based on audience data &<br />
              campaign needs. No more guesswork, just results.
            </h4>
            <div className="BrandSignUpMainContentBreaker"></div>
            <h3>Get started for FREE!</h3>
            <div className="BrandSignUpInputField">
              <InputField2
                value={email}
                placeholder={"Enter your official email ID"}
                onChange={handleChange}
                icon={<IoMail size={16} color="#757575" />}
              />
            </div>

            <div style={{ marginTop: "40px" }}>
              <Button1 text={"Continue →"} onClick={handleSubmit} />
            </div>

            <h5>
              By continue, you have agree our <br />
              <b>
                <a style={{ textDecoration: "Underline" }} href="">
                  terms and conditions.
                </a>
              </b>
            </h5>
          </div>
        </div>
      </div>
    </>
  );
};
