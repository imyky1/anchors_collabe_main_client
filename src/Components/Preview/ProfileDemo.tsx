import React, { useEffect } from "react";
import screen from "/screen.png";
import logo from "/collabLogo.png";

import { FaFacebook, FaGlobe, FaInstagram, FaLinkedinIn, FaTelegram } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { CgLockUnlock } from "react-icons/cg";
import {
  BrandCard,
  GeneralCard,
  PlatformCard,
  SocialCard,
} from "../../Pages/Profile/Component";
import { FaXTwitter } from "react-icons/fa6";

const NavArray = [
  {
    title: "Collab Portfolio",
    id: "collabportfolio",
  },
  {
    title: "Monetization Avenues",
    id: "monetization",
  },
  {
    title: "Content Category",
    id: "contentCategory",
  },
  {
    title: "Audience Types",
    id: "audienceTypes",
  },
  {
    title: "Content Formats",
    id: "contentFormats",
  },
  {
    title: "Platform Presence",
    id: "audiencePresence",
  }
];


interface ProfileDemoProps {
  data:{
    coverPhoto:string,
    profile:string,
    name:string,
    tagline:string,
    collab:[],
    money:[],
    categories:[],
    types:[],
    formats:[],
    platforms:[]
  },
  uploadedImages:["",""],
  uploadedImages2:["",""],
  gotToSection:string
}



const ProfileDemo: React.FC<ProfileDemoProps> = ({data,uploadedImages,uploadedImages2,gotToSection}) => {
  const handleNavigationOnPage = (id: string) => {
    if (id) {
      const section = document.querySelector(`#${id}`);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    if(gotToSection){
      handleNavigationOnPage(gotToSection)
    }
  }, [gotToSection])
  

  return (
    <div className="mt-5 w-full relative h-full">
      <img src={screen} alt="" className="w-full h-full" />

      <section className="absolute w-[305px] top-2 left-3 rounded-3xl overflow-auto h-full">
        {/* header ------------ */}
        <div className="px-2 py-3" id="topdetailsection">
          <img src={logo} alt="" className="w-20" />
        </div>

        {/* rest page */}
        <div className="w-full box-border bg-white h-max relative font-inter">
          <img
            src={(uploadedImages && uploadedImages[0]) ?? data?.coverPhoto ?? "https://cdn.pixabay.com/photo/2018/01/24/18/05/background-3104413_960_720.jpg"}
            alt=""
            className="w-full"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src =
              "https://cdn.pixabay.com/photo/2018/01/24/18/05/background-3104413_960_720.jpg";
            }}
          />

          <section className="flex items-center flex-col w-full -mt-[60px] gap-8">
            <div className="flex flex-col items-center gap-4">
              <img
                src={(uploadedImages && uploadedImages[1]) ?? data?.profile ?? "https://t3.ftcdn.net/jpg/04/85/67/08/360_F_485670840_Ai4Rz09r0DmHlJycECZk23LVaocea4ZI.jpg"}
                alt=""
                className="w-28 h-28 rounded-full"
              />
              <h1 className=" text-xl font-bold text-[#424242] max-w-[250px] text-center break-words">
                {data.name}
              </h1>
              <p className=" text-[16px] text-[#757575] -mt-4 max-w-[250px] text-center break-words">
                {data.tagline}
              </p>
            </div>

            <div className="w-full px-3 box-border">
              <h3 className="text-[16px] font-medium text-[#424242] mb-4">
              Social Media Links
              </h3>

              <section className="grid grid-cols-2 w-full gap-4">
                {data?.linkedinLink?.length > 0 && <button className="px-5 py-3 text-[14px] text-[#424242] bg-[#F5F5F5] rounded-[250px] flex items-center gap-2 justify-center">
                  <FaLinkedinIn /> LinkedIn
                </button>}
                {data?.instaLink?.length > 0 &&<button className="px-5 py-3 text-[14px] text-[#424242] bg-[#F5F5F5] rounded-[250px] flex items-center gap-2 justify-center">
                <FaInstagram /> Instagram
                </button>}
                {data?.telegramLink?.length > 0 &&<button className="px-5 py-3 text-[14px] text-[#424242] bg-[#F5F5F5] rounded-[250px] flex items-center gap-2 justify-center">
                <FaTelegram /> Telegram
                </button>}
                {data?.twitterLink?.length > 0 &&<button className="px-5 py-3 text-[14px] text-[#424242] bg-[#F5F5F5] rounded-[250px] flex items-center gap-2 justify-center">
                <FaXTwitter /> Twitter
                </button>}
                {data?.fbLink?.length > 0 &&<button className="px-5 py-3 text-[14px] text-[#424242] bg-[#F5F5F5] rounded-[250px] flex items-center gap-2 justify-center">
                 <FaFacebook /> Facebook
                </button>}
                {data?.websiteLink?.length > 0 &&<button className="px-5 py-3 text-[14px] text-[#424242] bg-[#F5F5F5] rounded-[250px] flex items-center gap-2 justify-center">
                <FaGlobe /> Website
                </button>}
              </section>
            </div>

            <section className="w-full flex items-center gap-6 overflow-x-auto px-5  py-5 box-border shadow-lg sticky top-0 z-10 bg-white">
              {NavArray.map((e,i) => {
                return (
                  <span
                    className={`text-sm text-[#757575] no-underline text-nowrap cursor-pointer hover:text-[#212121] hover:underline`}
                    key={`Nav${i}`}
                    onClick={() => {
                      handleNavigationOnPage(e.id);
                    }}
                  >
                    {e.title}
                  </span>
                );
              })}
            </section>

            <section className="w-full px-3 box-border flex flex-col gap-10">
              {/* Collaboration History */}
              <div
                className="w-full p-3 box-border flex flex-col gap-5 rounded-lg"
                style={{ boxShadow: "0px 0px 12px 0px rgba(33, 33, 33, 0.08)" }}
                id="collabportfolio"
              >
                <h3 className="text-[16px] font-medium text-[#424242]">
                Collab Portfolio
                </h3>

                <section className="w-full flex flex-col gap-2">
                  {data?.collab?.map((e,index)=>{
                    return <BrandCard key={`brandCard${index}`} newImg={uploadedImages2[index]} {...e}/>
                  })}
                </section>
              </div>

              {/* On Other Platform */}
              <div
                className="w-full p-3 box-border flex flex-col gap-5 rounded-lg"
                style={{ boxShadow: "0px 0px 12px 0px rgba(33, 33, 33, 0.08)" }}
                id="monetization"
              >
                <h3 className="text-[16px] font-medium text-[#424242] mb-4">
                Monetization Avenues
                </h3>

                <section className="w-full flex flex-col gap-5">
                {data?.money?.map((e,index)=>{
                  return <PlatformCard key={`platformCard${index}`} {...e}/>
                })}
                </section>
              </div>

              {/* Other cards ----------- */}
              <GeneralCard
                title="Content Category"
                tags={data?.categories ?? []}
                id="contentCategory"
              />
              <GeneralCard
                title="Audience Types"
                tags={data?.types ?? []}
                id="audienceTypes"
              />
              <GeneralCard
                title="Content Formats"
                tags={data?.formats ?? []}
                id="contentFormats"
              />

              {/* Where is your audience */}
              <div
                className="w-full p-3 box-border flex flex-col gap-5 rounded-lg"
                style={{ boxShadow: "0px 0px 12px 0px rgba(33, 33, 33, 0.08)" }}
                id="audiencePresence"
              >
                <h3 className="text-[16px] font-medium text-[#424242] mb-4">
                Platform Presence
                </h3>

                {
                  data?.platforms?.map((e)=>{
                    const myarr = ["bg-[#10B981]","bg-[#0088CC]","bg-gradient-to-r from-purple-500 to-pink-500"]
                    return <SocialCard
                    icon={<IoLogoWhatsapp size={24} color="#fff" />}
                    bg={myarr[Math.floor(Math.random() * myarr?.length)]}
                    {...e}
                  />
                  })
                }
              </div>

              {/* How do you create content? */}
              {/* <GeneralCard
                title="How do you create content?"
                tags={["Create Content", "Create Content"]}
                id="howcontent"
                textSize="text-sm"
              /> */}

              <div className="p-5 rounded-lg bg-[#FF8A8A] flex items-center gap-3 justify-center flex-col font-inter mb-32">
                <p className="text-[16px] font-medium text-center">
                  Are you looking for to collaborate with me?
                </p>
                <button className="text-[#FF5C5C] py-3 px-5 rounded-[250px] bg-white flex items-center gap-2">
                  <CgLockUnlock /> Unlock My Info
                </button>
              </div>
            </section>
          </section>
        </div>
      </section>
    </div>
  );
};

export default ProfileDemo;
