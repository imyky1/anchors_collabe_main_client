import React, { useEffect, useState } from "react";
import { FaLinkedinIn, FaTelegram } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { AiFillInstagram } from "react-icons/ai";
import { CgLockUnlock } from "react-icons/cg";
import { BrandCard, GeneralCard, PlatformCard, SocialCard } from "./Component";
import { Navbar2 } from "../../Components/Navbar/Navbar";


const NavArray = [
  {
    title:"Collab Portfolio",
    id:"collabhistory"
  },
  {
    title:"Monetising Platform",
    id:"otherplatform"
  },
  {
    title:"Content Info",
    id:"contentInfo"
  },
  {
    title:"Audience info",
    id:"audience"
  }
];

const Profile: React.FC = () => {

  const [currentNavSelection, setCurrentNavSelection] = useState("")

  // controlls the nav under and movemnet --------------
  useEffect(() => {
    const targetElement1 = document.getElementById('collabhistory');
    const targetElement2 = document.getElementById('otherplatform');
    const targetElement3 = document.getElementById('contentInfo');
    const targetElement4 = document.getElementById('audience');

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting){
          setCurrentNavSelection(entry.target.id)
        }
      });
    };

    const options = {
      root: null, // Use the viewport as the root
      rootMargin: '0px', // No margin
      threshold: 0.5, // Trigger when 50% of the target is visible
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (targetElement1) {
      observer.observe(targetElement1);
    }
    if (targetElement2) {
      observer.observe(targetElement2);
    }
    if (targetElement3) {
      observer.observe(targetElement3);
    }
    if (targetElement4) {
      observer.observe(targetElement4);
    }

    return () => {
      if (targetElement1) {
        observer.unobserve(targetElement1);
      }
      if (targetElement2) {
        observer.unobserve(targetElement2);
      }
      if (targetElement3) {
        observer.unobserve(targetElement3);
      }
      if (targetElement4) {
        observer.unobserve(targetElement4);
      }
    };
  }, []); 


  const handleNavigationOnPage = (id:string) =>{
    if (id) {
      const section = document.querySelector(`#${id}`);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } 

  }

  return (
    <div className="w-screen bg-[#ada9a94f] flex flex-col items-center justify-center">
        <Navbar2/> 
      <div className="w-full md:w-1/2 box-border bg-white h-max relative font-inter">
        <img
          src="https://media.licdn.com/dms/image/D4D16AQFNr-3cglU5Bg/profile-displaybackgroundimage-shrink_350_1400/0/1688457033608?e=1710979200&v=beta&t=ITGsfR-omOFUxGBp7h0CQAoUygvxpSi-3ofvntvfTyA"
          alt=""
          className="w-full"
        />

        <section className="flex items-center flex-col w-full -mt-[60px] gap-8">
          <div className="flex flex-col items-center gap-4">
            <img
              src="https://media.licdn.com/dms/image/D4D03AQH8pvAJxs3kEQ/profile-displayphoto-shrink_400_400/0/1700772247045?e=1710979200&v=beta&t=tR3Qd9RfPV80B9GaxgZdWpQKe8mxDb2tXErmH-jOYH8"
              alt=""
              className="w-28 h-28 rounded-full"
            />
            <h1 className=" text-xl font-bold text-[#424242]">YUVRAJ SINGH</h1>
            <p className=" text-[16px] text-[#757575] -mt-4">
              Full Stack Developer
            </p>
          </div>

          <div className="w-full px-5 md:px-10 box-border">
            <h3 className="text-[16px] font-medium text-[#424242] mb-4">
              Social Links
            </h3>

            <section className="grid grid-cols-2 md:grid-cols-3 w-full gap-4">
              <button className="px-5 py-3 text-[14px] text-[#424242] bg-[#F5F5F5] rounded-[250px] flex items-center gap-2 justify-center">
                <FaLinkedinIn /> LinkedIn
              </button>
              <button className="px-5 py-3 text-[14px] text-[#424242] bg-[#F5F5F5] rounded-[250px] flex items-center gap-2 justify-center">
                <FaLinkedinIn /> Instagram
              </button>
              <button className="px-5 py-3 text-[14px] text-[#424242] bg-[#F5F5F5] rounded-[250px] flex items-center gap-2 justify-center">
                <FaLinkedinIn /> YouTube
              </button>
              <button className="px-5 py-3 text-[14px] text-[#424242] bg-[#F5F5F5] rounded-[250px] flex items-center gap-2 justify-center">
                <FaLinkedinIn /> Telegram
              </button>
              <button className="px-5 py-3 text-[14px] text-[#424242] bg-[#F5F5F5] rounded-[250px] flex items-center gap-2 justify-center">
                <FaLinkedinIn /> WhatsApp
              </button>
              <button className="px-5 py-3 text-[14px] text-[#424242] bg-[#F5F5F5] rounded-[250px] flex items-center gap-2 justify-center">
                <FaLinkedinIn /> Facebook
              </button>
              <button className="px-5 py-3 text-[14px] text-[#424242] bg-[#F5F5F5] rounded-[250px] flex items-center gap-2 justify-center">
                <FaLinkedinIn /> Website
              </button>
            </section>
          </div>

          <section className="w-full flex items-center gap-6 overflow-x-auto px-5 md:px-10 py-5 box-border shadow-lg sticky top-0 z-10 bg-white">
            {NavArray.map(e=>{
              return <span className={`text-sm ${e.id === currentNavSelection ? "text-[#212121] underline" : "text-[#757575] no-underline"} text-nowrap cursor-pointer hover:text-[#212121] hover:underline`} onClick={()=>{handleNavigationOnPage(e.id)}}>{e.title}</span>
            })}
          </section>

          <section className="w-full px-5 md:px-10 box-border flex flex-col gap-10">
            {/* Collaboration History */}
            <div
              className="w-full p-3 box-border flex flex-col gap-5 rounded-lg"
              style={{ boxShadow: "0px 0px 12px 0px rgba(33, 33, 33, 0.08)" }}
              id="collabhistory"
            >
              <h3 className="text-[16px] font-medium text-[#424242]">
                Collaboration History
              </h3>

              <section className="w-full flex flex-col gap-2">
                <BrandCard />
                <BrandCard />
                <BrandCard />
              </section>
            </div>

            {/* On Other Platform */}
            <div
              className="w-full p-3 box-border flex flex-col gap-5 rounded-lg"
              style={{ boxShadow: "0px 0px 12px 0px rgba(33, 33, 33, 0.08)" }}
              id="otherplatform"
            >
              <h3 className="text-[16px] font-medium text-[#424242] mb-4">
                On Other Platform
              </h3>

              <section className="w-full flex flex-col gap-5">
                <PlatformCard />
                <PlatformCard />
                <PlatformCard />
              </section>
            </div>

            {/* Other cards ----------- */}
            <GeneralCard
              title="Category"
              tags={[
                "Finance",
                "Jobs & Internship",
                "Product Man.",
                "Product Man.",
              ]}
              id="contentInfo"
            />
            <GeneralCard
              title="Type of Audience"
              tags={[
                "Finance",
                "Jobs & Internship",
                "Product Man.",
                "Product Man.",
              ]}
            />
            <GeneralCard
              title="Type of Content Post"
              tags={[
                "Finance",
                "Jobs & Internship",
                "Product Man.",
                "Product Man.",
              ]}
            />

            {/* Where is your audience */}
            <div
              className="w-full p-3 box-border flex flex-col gap-5 rounded-lg"
              style={{ boxShadow: "0px 0px 12px 0px rgba(33, 33, 33, 0.08)" }}
              id="audience"
            >
              <h3 className="text-[16px] font-medium text-[#424242] mb-4">
                Where is your audience
              </h3>

              <SocialCard
                icon={<IoLogoWhatsapp size={24} color="#fff" />}
                bg="bg-[#10B981]"
              />
              <SocialCard
                icon={<FaTelegram size={24} color="#fff" />}
                bg="bg-[#0088CC]"
              />
              <SocialCard
                icon={<AiFillInstagram size={24} color="#fff" />}
                bg="bg-gradient-to-r from-purple-500 to-pink-500"
              />
            </div>

            {/* How do you create content? */}
            <GeneralCard
              title="How do you create content?"
              tags={["Create Content", "Create Content"]}
              id="howcontent"
              textSize="text-sm"
            />

            <div className="p-5 rounded-lg bg-[#FF8A8A] flex items-center gap-3 justify-center flex-col font-inter">
              <p className="text-[16px] font-medium">
                Are you looking for to collaborate with me?
              </p>
              <button className="text-[#FF5C5C] py-3 px-5 rounded-[250px] bg-white flex items-center gap-2">
                <CgLockUnlock /> Unlock My Info
              </button>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
};

export default Profile;
