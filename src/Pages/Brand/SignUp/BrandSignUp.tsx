import { useNavigate } from "react-router-dom";
import { Button1, Button2 } from "../../../Components/Buttons";
import "./BrandSignUp.css";
import { InputField2 } from "../../../Components/Fields";
import { useState } from "react";
import { IoMail } from "react-icons/io5";
import { useAuth } from "../../../Providers/Auth";

export const BrandHeader = (props) => {
  const navigate = useNavigate();
  

 
  return (
    <>
      <header style={{...props?.style, width: "100%" }} className="BrandHeader">
        <div  className="BrandHeaderLogo">
          <img
            onClick={() => {
              navigate("/");
            }}
            src="/collabLogo.png"
            alt=""
            className="my-auto w-20 md:w-32 cursor-pointer"
          />
        </div>
        {props.visible && <Button2 text={props.text} onClick={props.onClick}  />}
      </header>
    </>
  );
};

export const BrandSignUp = () => {
  const navigate = useNavigate();
  const authState = useAuth()
  const [email, setEmail] = useState(null);

  const handleChange = (e: { target: { value: any } }) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async() => {
    try{
      if(!email){
        return alert("Please Enter Your Email")
      }
      const result = await authState.sendingOTPFeature(email)
      console.log(result)
      if(result){
        navigate(`/Brand/Otp-verify?email=${email}&type=SignUp`)
      }

    }catch(e){
      console.log(e)
    }
  }
  return (
    <>
      <div style={{ maxWidth: "100%" }} className="container">
        <BrandHeader text={"Login →"} onClick={()=>{navigate('/Brand/Login')}} visible={true}/>
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
