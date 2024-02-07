import { IoMail } from "react-icons/io5";
import { Button1 } from "../../../Components/Buttons";
import { InputField2 } from "../../../Components/Fields";
import { BrandHeader } from "../SignUp/BrandSignUp";
import "./BrandLogin.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Providers/Auth";
import { toast } from "react-toastify";
import mixpanel from "mixpanel-browser";

export const BrandLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const authState = useAuth()

  if(localStorage.getItem("jwtToken") && localStorage.getItem("UserType")==="Brand"){
    navigate('/Brand/Welcome')
  }
  useEffect(() => {
    mixpanel.track("Page visited Anchors Collab Brand SignIn");
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
      if (mailexist.success) {
        const result = await authState.sendingOTPFeature(email);
        if (result.success) {
          mixpanel.track("Requested Otp for Login");
          toast.info("Otp Sent Succesfully to your MailBox", {
            position: "top-center",
            autoClose: 2000,
          });
          navigate(`/Brand/Otp-verify?email=${email}&type=Login`);
        } else {
          return toast.error(result.Error, {
            position: "top-center",
            autoClose: 2000,
          });
        }
      }else{
        return toast.error("This Mail Does Not Exist", {
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
