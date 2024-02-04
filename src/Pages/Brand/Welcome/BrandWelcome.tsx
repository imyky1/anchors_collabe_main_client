import { MdLogout } from "react-icons/md";
import { BrandHeader } from "../SignUp/BrandSignUp";
import { useNavigate } from "react-router-dom";
import { InputField1 } from "../../../Components/Fields";
import { CiCircleCheck } from "react-icons/ci";
import "./BrandWelcome.css";
import { useEffect, useState } from "react";
import { Button1 } from "../../../Components/Buttons";
import { useBrand } from "../../../Providers/Brand";
import { useAuth } from "../../../Providers/Auth";

const purposeMaterData = {
  Registration: 10,
  CompanyName: 10,
  CompanyWebsite: 10,
  CompanyTeamSize: 10,
  companyLogo: 10,
  isim: 10,
  frequencyofim: 10,
  expenseofim: 20,
  CompanyReferralAvail: 50,
  CompanyReferralShared: 100,
  companyPhoneNumber: 10,
};

export const BrandWelcome = () => {
  const navigate = useNavigate();

  const BrandState = useBrand();
  const authState = useAuth();
  // console.log(authState?.loggedBrand);

  const [data, setData] = useState({
    name: "",
    designation: "",
    CompanyName: "",
    CompanyWebsite: "",
    CompanyTeamSize: "",
  });
  const [teamSize, SetTeamSize] = useState("");
  const [teamSizeCredit, setTeamSizeCredit] = useState(0);
  const [credits, setCredits] = useState(0);
  const [filledFields, setFilledFields] = useState([]);

  useEffect(() => {
    setCredits(authState?.loggedBrand?.credits);
  }, [authState]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await BrandState?.getBrandInfo();
        if (response && response.success === true) {
          // Update state with response data
          setData((prev) => ({
            ...prev,
            name: response?.data1?.name,
            designation: response?.data1?.designation,
            CompanyName: response?.data1?.CompanyName,
            CompanyWebsite: response?.data1?.CompanyWebsite,
            CompanyTeamSize: response?.data1?.CompanyTeamSize,
            // Add other fields here based on your response structure
          }));
          // Set team size separately
          SetTeamSize(response.data1.CompanyTeamSize);

          // Update filledFields based on received data
          const filledFieldsFromData = Object.keys(response.data1).filter(
            (key) => response.data1[key]
          );
          setFilledFields(filledFieldsFromData);
          if (response?.data1?.CompanyTeamSize) {
            setFilledFields((prev) => {
              prev.push("teamSize");
              return prev;
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [BrandState]); 



  const handlechange = (e) => {
    const { name, value } = e.target;

    if (!data[e.target.name] && purposeMaterData[name]) {
      setCredits(credits + purposeMaterData[name]);
    }

    if (data[e.target.name] && !e.target.value && purposeMaterData[name]) {
      setCredits(credits - purposeMaterData[name]);
    }

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setFilledFields((prev) => {
      if (!prev.includes(name)) {
        prev.push(name);
      }
      return prev;
    });
  };

  const handleTeamSelect = (value) => {
    if (!teamSize) {
      setTeamSizeCredit(10);
      setCredits(credits + 10);
    }

    SetTeamSize(value);
    setFilledFields((prev) => {
      if (!prev.includes("teamSize")) {
        prev.push("teamSize");
      }

      return prev;
    });
  };

  const handleSubmit = async () => {
    try {
      if (!data.CompanyName || !data.CompanyWebsite) {
        return alert("Please Enter Company Name and Company Website");
      }
      const result = await BrandState.UpdateBrandInfo({
        ...data,
        CompanyTeamSize: teamSize,
        brandID: authState?.loggedBrand?.BrandId,
      });
      if (result.success) {
        
        navigate("/Brand/profile2");
      }
    } catch (e) {
      alert(e);
    }
  };

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

          <h1>Welcome to anchors|Collab</h1>
          <h2>
            To enhance your experience, please provide the following details:
          </h2>
          <InputField1
            label="Your Full Name"
            placeholder="Ravi Ahirwar"
            onChange={handlechange}
            value={data.name}
            id="name"
            name="name"
          />
          {filledFields.includes("name") && (
            <InputField1
              label="Your Designation"
              placeholder="Marketing Manager"
              onChange={handlechange}
              value={data.designation}
              id="designation"
              name="designation"
            />
          )}
          {filledFields.includes("name") &&
            filledFields.includes("designation") && (
              <InputField1
                label="Company Name*"
                placeholder="Boat"
                onChange={handlechange}
                value={data.CompanyName}
                id="CompanyName"
                name="CompanyName"
              />
            )}
          {filledFields.includes("CompanyName") && (
            <InputField1
              label="Company Website URL*"
              placeholder="www.boatindia.com"
              onChange={handlechange}
              value={data.CompanyWebsite}
              id="CompanyWebsite"
              name="CompanyWebsite"
            />
          )}
          {filledFields.includes("CompanyWebsite") && (
            <div className="BrandForm_CompanySize">
              <div>Company Size</div>
              <div>
                <button
                  className={teamSize === "1-10" ? "Selected" : ""}
                  onClick={() => handleTeamSelect("1-10")}
                >
                  {teamSize === "1-10" ? <CiCircleCheck /> : ""}1-10
                </button>
                <button
                  className={teamSize === "11-50" ? "Selected" : ""}
                  onClick={() => handleTeamSelect("11-50")}
                >
                  {teamSize === "11-50" ? <CiCircleCheck /> : ""}11-50
                </button>
                <button
                  className={teamSize === "51-100" ? "Selected" : ""}
                  onClick={() => handleTeamSelect("51-100")}
                >
                  {teamSize === "51-100" ? <CiCircleCheck /> : ""}51-100
                </button>
                <button
                  className={teamSize === "101-200" ? "Selected" : ""}
                  onClick={() => handleTeamSelect("101-200")}
                >
                  {teamSize === "101-200" ? <CiCircleCheck /> : ""}101-200
                </button>
                <button
                  className={teamSize === ">200" ? "Selected" : ""}
                  onClick={() => handleTeamSelect(">200")}
                >
                  {teamSize === ">200" ? <CiCircleCheck /> : ""}More than 200
                </button>
              </div>
            </div>
          )}

          {filledFields.includes("teamSize") && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "40px",
                marginBottom: "100px",
              }}
            >
              <Button1 text="Save & contiue →" onClick={handleSubmit} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
