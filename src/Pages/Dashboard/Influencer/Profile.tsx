import React, {  useEffect, useState } from "react";
import {
  InputField1,
  SocialField1,
  TagsField1,
  UploadButton1,
} from "../../../Components/Fields";
import { Button1 } from "../../../Components/Buttons";
import { Slider } from "@material-tailwind/react";
import ProfileDemo from "../../../Components/Preview/ProfileDemo";
import { useStaticData } from "../../../Providers/Data";
import { useInfluencer } from "../../../Providers/Influencer";

interface dataOneProps{
  name:string
  tagline:string
  linkedinLink:string
  twitterLink:string
  instaLink:string
  fbLink:string
  telegramLink:string
  coverPhoto:string
  profile:string
}

interface FormOneProps{
data:dataOneProps,
setData:React.Dispatch<React.SetStateAction<dataOneProps>>
}

const FormOne: React.FC<FormOneProps> = ({data,setData}) => {

  const handleChange = (e) =>{
    setData({...data,[e.target.name]:e.target.value})
  }

  return (
    <div className="w-full p-5 box-border bg-white rounded-lg flex flex-col gap-5">
      <div className="w-full bg-[#212121] h-0 pb-[25%] relative rounded overflow-hidden">
        <img
          src="https://media.licdn.com/dms/image/D4D16AQFNr-3cglU5Bg/profile-displaybackgroundimage-shrink_350_1400/0/1688457033608?e=1710979200&v=beta&t=ITGsfR-omOFUxGBp7h0CQAoUygvxpSi-3ofvntvfTyA"
          alt=""
          className="absolute top-0 left-0 w-full h-full"
        />
        <button>Add Cover Photo</button>
      </div>

      <section className="mx-auto flex flex-col items-center gap-3 -mt-14 z-10">
        <img
          src="https://media.licdn.com/dms/image/D4D03AQH8pvAJxs3kEQ/profile-displayphoto-shrink_400_400/0/1700772247045?e=1710979200&v=beta&t=tR3Qd9RfPV80B9GaxgZdWpQKe8mxDb2tXErmH-jOYH8"
          alt=""
          className="w-20 h-20 rounded-full"
        />
        <UploadButton1 text="Add Profile Photo" />
      </section>

      <InputField1 placeholder="Your Full Name" value={data.name} onChange={handleChange} name="name" id="name"/>
      <InputField1 placeholder="Your Tagline" value={data.tagline} onChange={handleChange} name="tagline" id="tagline"/>
    </div>
  );
};

const FormTwo: React.FC = () => {
  return (
    <div className="w-full p-5 box-border bg-white rounded-lg flex flex-col gap-5">
      <h1>Add Your Social link </h1>

      <SocialField1 placeholder="Paste Your LinkedIn Link" />
      <SocialField1 placeholder="Paste Your LinkedIn Link" />
      <SocialField1 placeholder="Paste Your LinkedIn Link" />
      <SocialField1 placeholder="Paste Your LinkedIn Link" />
    </div>
  );
};

const FormThree: React.FC = () => {

  const staticData = useStaticData()

  const [data, setdata] = useState<[] | undefined>()

  useEffect(() => {
    staticData?.getDataFromType("Goal / KPI").then((e)=>{
      setdata(e)
    })
  }, [])

  return (
    <div
      className="w-full p-5 box-border bg-white rounded-lg flex flex-col gap-5"
      style={{ boxShadow: "0px 0px 8px 0px rgba(33, 33, 33, 0.08)" }}
    >
      <div className="w-full rounded border border-[#E0E0E0] p-5 box-border flex flex-col gap-5">
        <section className="flex items-start gap-5">
          <div className="flex flex-col items-center gap-1">
            <img src="" alt="" className="w-16 h-16 rounded-full" />
            <span className="font-inter text-[#757575] font-medium">Logo</span>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <InputField1 placeholder="Enter Your Name" />
            <InputField1 placeholder="Enter Your Designation" />
          </div>
        </section>

        <h3 className="text-[#757575] font-inter text-xs font-bold">
          Select the goals that applied to this collaboration?{" "}
          <span className="font-normal">(Select all that apply)</span>
        </h3>
        <TagsField1
          data={data ?? []}
        />
      </div>
    </div>
  );
};

const FormFour: React.FC = () => {

  const staticData = useStaticData()

  const [data, setdata] = useState<[] | undefined>()

  useEffect(() => {
    staticData?.getDataFromType("Services list").then((e)=>{
      setdata(e)
    })
  }, [])

  return (
    <div
      className="w-full p-5 box-border bg-white rounded-lg flex flex-col gap-5"
      style={{ boxShadow: "0px 0px 8px 0px rgba(33, 33, 33, 0.08)" }}
    >
      <div className="w-full rounded border border-[#E0E0E0] p-5 box-border flex flex-col gap-5">
        <div className="flex flex-col gap-3 w-full">
          <InputField1 placeholder="Enter Your Name" />
          <InputField1 placeholder="Enter Your Designation" />
        </div>

        <h3 className="text-[#757575] font-inter text-xs font-bold">
          Which Monetization Methods do you utilize?{" "}
          <span className="font-normal">(Select all that apply)</span>
        </h3>
        <TagsField1
          data={data ?? []}
        />
      </div>
    </div>
  );
};

const FormFive: React.FC = () => {
  const staticData = useStaticData()

  const [data, setdata] = useState<[] | undefined>()

  useEffect(() => {
    staticData?.getDataFromType("Content Type").then((e)=>{
      setdata(e)
    })
  }, [])

  return (
    <div
      className="w-full p-5 box-border bg-white rounded-lg flex flex-col gap-5"
      style={{ boxShadow: "0px 0px 8px 0px rgba(33, 33, 33, 0.08)" }}
    >
      <div>
        <h3 className="text-[16px] text-[#424242] font-medium">
          Content Categories:{" "}
          <span className="font-light">(Select up to 6)</span>
        </h3>
        <p className="text-xs text-[#757575]">
          (Click "Other" if your category isn't listed)
        </p>
      </div>

      <div className="w-full rounded border border-[#E0E0E0] p-5 box-border flex flex-col gap-5">
        <TagsField1
           data={data ?? []}
        />
      </div>
    </div>
  );
};

const FormSix: React.FC = () => {

  const staticData = useStaticData()

  const [data, setdata] = useState<[] | undefined>()

  useEffect(() => {
    staticData?.getDataFromType("Content Format").then((e)=>{
      setdata(e)
    })
  }, [])

  return (
    <div
      className="w-full p-5 box-border bg-white rounded-lg flex flex-col gap-5"
      style={{ boxShadow: "0px 0px 8px 0px rgba(33, 33, 33, 0.08)" }}
    >
      <div>
        <h3 className="text-[16px] text-[#424242] font-medium">
          Content Formats:{" "}
          <span className="font-light">(Select all that apply)</span>
        </h3>
        <p className="text-xs text-[#757575]">
          Give brands a glimpse into your style
        </p>
      </div>

      <div className="w-full rounded border border-[#E0E0E0] p-5 box-border flex flex-col gap-5">
        <TagsField1
           data={data ?? []}
        />
      </div>
    </div>
  );
};

const FormSeven: React.FC = () => {
  const staticData = useStaticData()

  const [data, setdata] = useState<[] | undefined>()

  useEffect(() => {
    staticData?.getDataFromType("Audience Category").then((e)=>{
      setdata(e)
    })
  }, [])

  return (
    <div
      className="w-full p-5 box-border bg-white rounded-lg flex flex-col gap-5"
      style={{ boxShadow: "0px 0px 8px 0px rgba(33, 33, 33, 0.08)" }}
    >
      <div>
        <h3 className="text-[16px] text-[#424242] font-medium">
          Who is your audiences/followers?
        </h3>
      </div>

      <div className="w-full rounded border border-[#E0E0E0] p-5 box-border flex flex-col gap-5">
      <TagsField1
           data={data ?? []}
        />
      </div>
    </div>
  );
};

const FormEight: React.FC = () => {
  const staticData = useStaticData()

  useEffect(() => {
    staticData?.getDataFromType("Audience Platform").then((e)=>{
      setdata(e)
    })
  }, [])

  return (
    <div
      className="w-full p-5 box-border bg-white rounded-lg flex flex-col gap-5"
      style={{ boxShadow: "0px 0px 8px 0px rgba(33, 33, 33, 0.08)" }}
    >
        <h3 className="text-[16px] text-[#424242] font-medium">
        Where is your audience?
        </h3>

        <div className="bg-[#FEE2E2] rounded w-full p-5 flex flex-col gap-5 font-inter text-[#424242]">
          <h4 className="text-sm  font-medium">Sample Information</h4>
            <section className="flex flex-col gap-3 text-xs ">
            <p>Platform - <span className="text-[#757575]">WhatsApp</span></p>
            <p>Audience Size - <span className="text-[#757575]">64547</span></p>
            <p>Link - <span className="text-[#757575]">https://chat.whatsapp.com/FhXJTEeVti48y59eech6U8</span></p>
          </section>
        </div>


      <div className="w-full rounded border border-[#E0E0E0] p-5 box-border flex flex-col gap-5">
        <section className="w-full grid grid-cols-2 gap-5">
        <InputField1 placeholder="Select Platform" />
        <InputField1 placeholder="Audience Size" />
        </section>
        <InputField1 placeholder="Enter Link here" />

      </div>
    </div>
  );
};

const Profile: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const influencerState = useInfluencer()

  const [dataOne, setdataOne] = useState<dataOneProps>({
    name:"",
    tagline:"",
    linkedinLink:"",
    twitterLink:"",
    instaLink:"",
    fbLink:"",
    telegramLink:"",
    coverPhoto:"",
    profile:""
  })


  const [dataTwo, setdataTwo] = useState([
    {
      companyName:"",
      companyUrl:"",
      companyProfile:"",
      goals:[]
    }
  ])


  useEffect(() => {
    influencerState?.getPersonalInfo().then((e)=>{
      if(e?.success){
        setdataOne({...dataOne,...e?.data})
      }
    })
    
  }, [])

  

  return (
    <div className="w-full px-10 py-5 box-border flex items-center justify-between  ">
      <section className="flex flex-col gap-5 w-[40vw] relative" id="profileData">
        {currentPage === 1 && (
          <>
            <h1 className="text-[16px] font-inter font-medium">
              Add Personal Information
            </h1>
            <FormOne data={dataOne} setData={setdataOne}/>
            <FormTwo />
          </>
        )}

        {currentPage === 2 && (
          <>
            <div>
              <h1 className="text-[16px] font-inter font-medium">
                Collab Portfolio
              </h1>
              <span className="text-[#757575] font-inter text-xs -mt-1">
                Very Important Section, Add all the collab to get more collab
              </span>
            </div>
            <FormThree />
          </>
        )}

        {currentPage === 3 && (
          <>
            <div>
              <h1 className="text-[16px] font-inter font-medium">
                Showcase your Monetization Expertise
              </h1>
              <span className="text-[#757575] font-inter text-xs -mt-1">
                Demonstrate your ability to connect with and convert your
                followers, making you a valuable brand partner
              </span>
            </div>
            <FormFour />
          </>
        )}

        {currentPage === 4 && (
          <>
            <div>
              <h1 className="text-[16px] font-inter font-medium">
                Showcase Your Content Expertise and Style
              </h1>
              <span className="text-[#757575] font-inter text-xs -mt-1">
                Help us understand your voice, format, and niche to match you
                with ideal collaborations
              </span>
            </div>
            <FormFive />
            <FormSix />
          </>
        )}

        {currentPage === 5 && (
          <>
            <div>
              <h1 className="text-[16px] font-inter font-medium">
                About your Audiences
              </h1>
              <span className="text-[#757575] font-inter text-xs -mt-1">
                We want to know more about your audiences & Platform, which will
                be shown to brands to choose
              </span>
            </div>
            <FormSeven />
            <FormEight/>
          </>
        )}

        <div className="w-full flex flex-row-reverse">
          <Button1
            text="Continue"
            onClick={() => {
              setCurrentPage((now) => now + 1);
            }}
          />
        </div>
      </section>

      <section className="flex flex-col gap-3 h-screen items-start fixed top-[82px] right-20 w-[329px]">
        <h1 className="text-[16px] font-inter font-medium">
          Profile Completion Status
        </h1>

        <Slider
          size="lg"
          color="deep-purple"
          defaultValue={50}
          placeholder="as"
          className="h-5"
          thumbClassName="[&::-moz-range-thumb]:-mt-[4px] [&::-webkit-slider-thumb]:-mt-[4px] [&::-webkit-slider-thumb]:hidden"
        />

        <ProfileDemo />
      </section>
    </div>
  );
};

export default Profile;
