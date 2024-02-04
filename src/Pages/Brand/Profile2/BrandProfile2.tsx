import { CiCircleCheck } from "react-icons/ci";
import { MdLogout } from "react-icons/md";
import { Button1 } from "../../../Components/Buttons";
import { InputField1 } from "../../../Components/Fields";
import { BrandHeader } from "../SignUp/BrandSignUp";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useBrand } from "../../../Providers/Brand";
import { useAuth } from "../../../Providers/Auth";

export const BrandProfile2 = () => {
  const navigate = useNavigate();
  const BrandState = useBrand()
  const authState = useAuth()
  // console.log(authState?.loggedBrand)


  const [isim, Setisim] = useState("");
  const [isimCredit, setisimCredit] = useState(0);
  const [frequencyofim, Setfrequencyofim] = useState("");
  const [frequencyofimCredit, setfrequencyofimCredit] = useState(0);
  const [expenseofim, Setexpenseofim] = useState("");
  const [expenseofimCredit, setexpenseofimCredit] = useState(0);
  const [credits, setCredits] = useState(0);
  const [filledFields, setFilledFields] = useState([]);

  useEffect(()=>{
    setCredits(authState?.loggedBrand?.credits)
  },[authState])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await BrandState?.getBrandInfo();
  //       if (response && response.success === true) {
  //         // Update state with response data
  //         console.log(response)
  //         Setisim
  //         // Update filledFields based on received data
  //         const filledFieldsFromData = Object.keys(response.data2).filter(
  //           (key) => response.data2[key]
  //         );
  //         setFilledFields(filledFieldsFromData);
  //         if (response.data1.CompanyTeamSize) {
  //           setFilledFields((prev) => {
  //             prev.push("teamSize");
  //             return prev;
  //           });
  //         }
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, [BrandState]);


  const handleisimSelect = (value) => {
    if(value === "No"){
        setCredits(authState?.loggedBrand?.credits + 10)
    }
    if(value === "Yes"){
      if (!isimCredit) {
        setisimCredit(10);
        setCredits(credits+10)
      }
      setCredits(authState?.loggedBrand?.credits+isimCredit+expenseofimCredit+frequencyofimCredit)
    }  

    Setisim(value);
    setFilledFields((prev) => {
      if (!prev.includes("isim")) {
        prev.push("isim");
      }

      return prev;
    });
  };
  const handlefrequencyofimSelect = (value) => {
    if (!frequencyofimCredit) {
      setfrequencyofimCredit(10);
      setCredits(credits + 10);
    }

    Setfrequencyofim(value);
    setFilledFields((prev) => {
      if (!prev.includes("frequencyofim")) {
        prev.push("frequencyofim");
      }

      return prev;
    });
  };
  const handleexpenseofimSelect = (value) => {
    if (!expenseofimCredit) {
      setexpenseofimCredit(10);
      setCredits(credits + 10);
    }

    Setexpenseofim(value);
    setFilledFields((prev) => {
      if (!prev.includes("expenseofim")) {
        prev.push("expenseofim");
      }

      return prev;
    });
  };

  const handleSubmit = async()=> {
    try{
      
      const result = await BrandState.UpdateBrandMarketingInfo({
        isim : isim,
        frequencyofim : frequencyofim,
        expenseofim : expenseofim,
        brandID : authState?.loggedBrand?.BrandId
      })
      if(result){
        console.log(result)
        navigate('/Brand/profile2')
      }
    }catch(e){
      alert(e)
    }
    
  }
  return (
    <>
      <div className="BrandWelcomeConatianer">
        <div style={{ maxWidth: "100%" }} className="container">
          <BrandHeader
            text={""}
            icon={<MdLogout />}
            onClick={() => {
              navigate("/Brand/Login");
            }}
            visible={true}
          />
        </div>
        <div className="BrandFormContent">
          <div className="BrandForm_CreditsWrapper">
            <div className="BrandForm_CreditsInfo">
              <img src="/Coin.svg" alt="" />
              <div>{`${credits} Credits earned`}</div>
            </div>
          </div>

          <h1>Influencer Marketing Details</h1>
          <h2>Maximize results: Share your influencer marketing insights</h2>

          <div className="BrandForm_CompanySize">
            <div>Previous influencer marketing experience?</div>
            <div>
              <button
                className={isim === "Yes" ? "Selected" : ""}
                onClick={() => handleisimSelect("Yes")}
              >
                {isim === "Yes" ? <CiCircleCheck /> : ""}Yes
              </button>
              <button
                className={isim === "No" ? "Selected" : ""}
                onClick={() => handleisimSelect("No")}
              >
                {isim === "No" ? <CiCircleCheck /> : ""}No
              </button>
            </div>
          </div>

          {isim === "Yes" && (
            <div className="BrandForm_CompanySize">
              <div>Average no. of campaigns in a month?</div>
              <div>
                <button
                  className={frequencyofim === "1-5" ? "Selected" : ""}
                  onClick={() => handlefrequencyofimSelect("1-5")}
                >
                  {frequencyofim === "1-5" ? <CiCircleCheck /> : ""}1 - 5 campaigns
                </button>
                <button
                  className={frequencyofim === "5-10" ? "Selected" : ""}
                  onClick={() => handlefrequencyofimSelect("5-10")}
                >
                  {frequencyofim === "5-10" ? <CiCircleCheck /> : ""}5 - 10 campaigns
                </button>
                <button
                  className={frequencyofim === ">10" ? "Selected" : ""}
                  onClick={() => handlefrequencyofimSelect(">10")}
                >
                  {frequencyofim === ">10" ? <CiCircleCheck /> : ""}More than 10
                  campaigns
                </button>
              </div>
            </div>
          )}
          {isim === "Yes" && filledFields.includes("frequencyofim") && (
            <div className="BrandForm_CompanySize">
              <div>Monthly influencer marketing Budget?</div>
              <div>
                <button
                  className={expenseofim === "1-10k" ? "Selected" : ""}
                  onClick={() => handleexpenseofimSelect("1-10k")}
                >
                  {expenseofim === "1-10k" ? <CiCircleCheck /> : ""}1-10K
                </button>
                <button
                  className={expenseofim === "10k-50k" ? "Selected" : ""}
                  onClick={() => handleexpenseofimSelect("10k-50k")}
                >
                  {expenseofim === "10k-50k" ? <CiCircleCheck /> : ""}10K - 50K
                </button>
                <button
                  className={expenseofim === "50k-100k" ? "Selected" : ""}
                  onClick={() => handleexpenseofimSelect("50k-100k")}
                >
                  {expenseofim === "50k-100k" ? <CiCircleCheck /> : ""}50K - 1 Lakh
                </button>
                <button
                  className={expenseofim === ">100k" ? "Selected" : ""}
                  onClick={() => handleexpenseofimSelect(">100k")}
                >
                  {expenseofim === ">100k" ? <CiCircleCheck /> : ""}More than 1 Lakh
                </button>
              </div>
            </div>
          )}

          {((isim === "No" ) ||
            (isim === "Yes" && filledFields.includes("expenseofim"))) && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "40px",
                marginBottom:'100px'
              }}
            >
              <Button1 text="Save & continue →" onClick={handleSubmit}/>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
