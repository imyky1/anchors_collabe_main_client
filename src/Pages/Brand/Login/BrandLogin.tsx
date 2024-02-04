import { IoMail } from "react-icons/io5";
import { Button1 } from "../../../Components/Buttons";
import { InputField2 } from "../../../Components/Fields";
import { BrandHeader } from "../SignUp/BrandSignUp";
import "./BrandLogin.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Providers/Auth";

export const BrandLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const authState = useAuth()

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
        navigate(`/Brand/Otp-verify?email=${email}&type=Login`)
      }
    }catch(e){
      alert(e)
    }
    
  };
  return (
    <>
      <div style={{ maxWidth: "100%" }} className="container">
        <BrandHeader text={"Sign Up →"}  onClick={()=>{navigate('/Brand/Signup')}} visible={true}/>
        <div className="BrandSignUpContent">
          <img src="/BrandLoginIcon.png" alt="" />
          <div className="BrandSignUpMainContent">
            <h1>Welcome Back!</h1>
            <h4>
              Please enter your credentials to <br /> log in to your account.
            </h4>

            <div style={{marginTop:'20px'}} className="BrandSignUpInputField">
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

            <h5 style={{display:'flex',marginTop:'20px',fontSize:'16px'}}>Don’t have an account?  <div onClick={()=>{navigate('/Brand/Signup')}}  style={{color:'#FF5C5C',cursor:'pointer'}}>Sign up</div></h5>
          </div>
        </div>
      </div>
    </>
  );
};
