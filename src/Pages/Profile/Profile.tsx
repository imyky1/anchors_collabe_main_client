import React, { useEffect, useState } from "react";
import {
  FaFacebook,
  FaGlobe,
  FaInstagram,
  FaLinkedinIn,
  FaTelegram,
} from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { CgLockUnlock } from "react-icons/cg";
import { BrandCard, GeneralCard, PlatformCard, SocialCard } from "./Component";
import { Navbar2 } from "../../Components/Navbar/Navbar";
import { Link, useParams } from "react-router-dom";
import { useInfluencer } from "../../Providers/Influencer";
import { FaXTwitter } from "react-icons/fa6";
import { useGeneralSettings } from "../../Providers/General";
import mixpanel from "mixpanel-browser";
import { toast } from "react-toastify";
import * as CompanyEmailValidator from "company-email-validator";
import { IoIosClose } from "react-icons/io";

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
  },
];

const UnlockPopup = ({ slug, onClose }) => {
  const [data, setdata] = useState({
    companyName: "",
    companyEmail: "",
    contactNumber: "",
    message: "",
  });

  const influencerState = useInfluencer();

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    const emailPattern =
      /\b[A-Za-z0-9._%+-]+@(?:gmail\.com|protonmail\.com|zoho\.com|outlook\.com|yahoo\.com|aol\.com|gmx\.com|icloud\.com|mailfence\.com|tutanota\.com|neo\.com|hubspot\.com|thunderbird\.net|titan\.com|yandex\.com|hotmail\.com|live\.com|msn\.com|fastmail\.com|mail\.com|posteo\.de|t-online\.de|bluemail\.me|hushmail\.com|rediffmail\.com|rediff\.com|redmail\.com|mailinator\.com)\b/;
      e.preventDefault();
    if (
      emailPattern.test(data.companyEmail) ||
      !CompanyEmailValidator.isCompanyEmail(data.companyEmail)
    ) {
      return toast.error("Please enter company mail");
    }
    e.preventDefault();
    let res = await influencerState.saveTempBrandData({ ...data, slug });

    mixpanel.track("Submitted the Temp brand info");

    if (res?.success) {
      toast.success("Data Recorded Successfully");
      onClose();
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#fdfdfd4d] fixed top-0 left-0 z-50 font-inter">
      <div onClick={()=>onClose()} className="w-[320px] flex justify-end cursor-pointer"><IoIosClose color="black" size={24}/></div>
      <form
        onSubmit={handleSubmit}
        className="bg-[#212121] p-6 flex flex-col items-center gap-4 rounded-lg w-[320px]"
      >
        
        <h1 className="text-[16px] text-[#FAFAFA] text-center w-[80%]">
          Please fill this our team will reachout to you
        </h1>

        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          required
          className="w-full px-4 py-3 text-xs rounded bg-[#EEE)]"
          onChange={handleChange}
        />
        <input
          type="text"
          name="companyEmail"
          placeholder="Company Email"
          required
          className="w-full px-4 py-3 text-xs rounded bg-[#EEE)]"
          onChange={handleChange}
        />
        <input
          type="number"
          name="contactNumber"
          placeholder="Contact Number"
          required
          className="w-full px-4 py-3 text-xs rounded bg-[#EEE)]"
          onChange={handleChange}
        />

        <textarea
          name="message"
          rows={8}
          id="message"
          placeholder="Message"
          className="w-full px-4 py-3 text-xs rounded bg-[#EEE)] focus:outline-none max-h-[500px] resize-none overflow-y-auto"
          onChange={handleChange}
        ></textarea>

        <button
          type="submit"
          className="text-[#FF5C5C] py-3 px-5 rounded-[250px] bg-white flex items-center gap-2 text-sm"
        >
          <CgLockUnlock /> Submit
        </button>
      </form>
    </div>
  );
};

const Profile: React.FC = () => {
  const { slug } = useParams();
  const influencerState = useInfluencer();
  const generalState = useGeneralSettings();

  const [InfluData, setInfluData] = useState({});
  const [openUnlockPopup, setOpenUnlockPopup] = useState(false);

  const [currentNavSelection, setCurrentNavSelection] = useState("");

  // controlls the nav under and movemnet --------------
  useEffect(() => {
    const targetElement1 = document.getElementById("collabhistory");
    const targetElement2 = document.getElementById("otherplatform");
    const targetElement3 = document.getElementById("contentInfo");
    const targetElement4 = document.getElementById("audience");

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentNavSelection(entry.target.id);
        }
      });
    };

    const options = {
      root: null, // Use the viewport as the root
      rootMargin: "0px", // No margin
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

  useEffect(() => {
    mixpanel.track("Visted Profile Page Collab");
    generalState.setLoading(true);
    influencerState.getInfluencerInfoFromSlug(slug).then((e) => {
      generalState.setLoading(false);
      if (e.success) {
        setInfluData(e);
      } else {
        alert(e?.error);
        window.open("/");
      }
    });
  }, [slug]);

  const handleNavigationOnPage = (id: string) => {
    if (id) {
      const section = document.querySelector(`#${id}`);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {openUnlockPopup && (
        <UnlockPopup
          slug={slug}
          onClose={() => {
            setOpenUnlockPopup(false);
          }}
        />
      )}

      <div className="w-screen bg-[#ada9a94f] flex flex-col items-center justify-center">
        <Navbar2 />
        <div className="w-full md:w-1/2 box-border bg-white h-max relative font-inter">
          <img
            src={InfluData?.data?.coverPhoto}
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
                src={
                  InfluData?.data?.profile ??
                  "https://t3.ftcdn.net/jpg/04/85/67/08/360_F_485670840_Ai4Rz09r0DmHlJycECZk23LVaocea4ZI.jpg"
                }
                alt=""
                className="w-28 h-28 rounded-full"
              />
              <h1 className=" text-xl font-bold text-[#424242] uppercase">
                {InfluData?.data?.name}
              </h1>
              <p
                style={{ width: "90%", wordBreak: "break-word" }}
                className=" text-[16px] text-[#757575] -mt-4"
              >
                {InfluData?.data?.tagline}
              </p>
            </div>

            <div className="w-full px-5 md:px-10 box-border">
              <h3 className="text-[16px] font-medium text-[#424242] mb-4">
                Social Media Links
              </h3>

              <section className="grid grid-cols-2 md:grid-cols-3 w-full gap-4">
                {InfluData?.data?.linkedinLink?.length > 0 && (
                  <button
                    className="px-5 py-3 text-[14px] text-[#424242] bg-[#F5F5F5] rounded-[250px] flex items-center gap-2 justify-center"
                    onClick={() => {
                      window.open(InfluData?.data?.linkedinLink);
                      mixpanel.track(
                        `Clicked linkedinLink on profile on COllab`
                      );
                    }}
                  >
                    <FaLinkedinIn /> LinkedIn
                  </button>
                )}
                {InfluData?.data?.instaLink?.length > 0 && (
                  <button
                    className="px-5 py-3 text-[14px] text-[#424242] bg-[#F5F5F5] rounded-[250px] flex items-center gap-2 justify-center"
                    onClick={() => {
                      window.open(InfluData?.data?.instaLink);
                      mixpanel.track(`Clicked instaLink on profile on COllab`);
                    }}
                  >
                    <FaInstagram /> Instagram
                  </button>
                )}
                {/* <button className="px-5 py-3 text-[14px] text-[#424242] bg-[#F5F5F5] rounded-[250px] flex items-center gap-2 justify-center">
                  <FaLinkedinIn /> YouTube
                </button> */}
                {InfluData?.data?.telegramLink?.length > 0 && (
                  <button
                    className="px-5 py-3 text-[14px] text-[#424242] bg-[#F5F5F5] rounded-[250px] flex items-center gap-2 justify-center"
                    onClick={() => {
                      window.open(InfluData?.data?.teleLink);
                      mixpanel.track(`Clicked teleLink on profile on COllab`);
                    }}
                  >
                    <FaTelegram /> Telegram
                  </button>
                )}
                {InfluData?.data?.twitterLink?.length > 0 && (
                  <button
                    className="px-5 py-3 text-[14px] text-[#424242] bg-[#F5F5F5] rounded-[250px] flex items-center gap-2 justify-center"
                    onClick={() => {
                      window.open(InfluData?.data?.twitterLink);
                      mixpanel.track(
                        `Clicked twitterLink on profile on COllab`
                      );
                    }}
                  >
                    <FaXTwitter /> Twitter
                  </button>
                )}
                {InfluData?.data?.fbLink?.length > 0 && (
                  <button
                    className="px-5 py-3 text-[14px] text-[#424242] bg-[#F5F5F5] rounded-[250px] flex items-center gap-2 justify-center"
                    onClick={() => {
                      window.open(InfluData?.data?.fbLink);
                      mixpanel.track(`Clicked fbLink on profile on COllab`);
                    }}
                  >
                    <FaFacebook /> Facebook
                  </button>
                )}
                {InfluData?.data?.websiteLink?.length > 0 && (
                  <button
                    className="px-5 py-3 text-[14px] text-[#424242] bg-[#F5F5F5] rounded-[250px] flex items-center gap-2 justify-center"
                    onClick={() => {
                      window.open(InfluData?.data?.websiteLink);
                      mixpanel.track(
                        `Clicked websiteLink on profile on COllab`
                      );
                    }}
                  >
                    <FaGlobe /> Website
                  </button>
                )}
              </section>
            </div>

            <section className="w-full flex items-center gap-6 overflow-x-auto px-5 md:px-10 py-5 box-border shadow-lg sticky top-0 z-10 bg-white">
              {NavArray.map((e) => {
                return (
                  <span
                    className={`text-sm ${
                      e.id === currentNavSelection
                        ? "text-[#212121] underline"
                        : "text-[#757575] no-underline"
                    } text-nowrap cursor-pointer hover:text-[#212121] hover:underline`}
                    onClick={() => {
                      handleNavigationOnPage(e.id);
                    }}
                  >
                    {e.title}
                  </span>
                );
              })}
            </section>

            <section className="w-full px-5 md:px-10 box-border flex flex-col gap-10">
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
                  {InfluData?.data2?.data?.map((e, index) => {
                    return <BrandCard key={`brandCard${index}`} {...e} />;
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
                  {InfluData?.data3?.data?.map((e, index) => {
                    return <PlatformCard key={`platformCard${index}`} {...e} />;
                  })}
                </section>
              </div>

              {/* Other cards ----------- */}
              <GeneralCard
                title="Content Category"
                tags={InfluData?.data4?.categories ?? []}
                id="contentCategory"
              />
              <GeneralCard
                title="Audience Types"
                tags={InfluData?.data5?.types ?? []}
                id="audienceTypes"
              />
              <GeneralCard
                title="Content Formats"
                tags={InfluData?.data4?.formats ?? []}
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

                {/* <SocialCard
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
              /> */}

                {InfluData?.data5?.platforms?.map((e) => {
                  const myarr = [
                    "bg-[#10B981]",
                    "bg-[#0088CC]",
                    "bg-gradient-to-r from-purple-500 to-pink-500",
                  ];
                  return (
                    <SocialCard
                      icon={<IoLogoWhatsapp size={24} color="#fff" />}
                      bg={myarr[Math.floor(Math.random() * myarr?.length)]}
                      {...e}
                    />
                  );
                })}
              </div>

              {/* How do you create content? */}
              {/* <GeneralCard
              title="How do you create content?"
              tags={["Create Content", "Create Content"]}
              id="howcontent"
              textSize="text-sm"
            /> */}

              <div className="p-5 rounded-lg bg-[#FF8A8A] flex items-center gap-3 justify-center flex-col font-inter">
                <p className="text-[16px] font-medium text-center">
                  Are you looking for to collaborate with me?
                </p>
                <button
                  className="text-[#FF5C5C] py-3 px-5 rounded-[250px] bg-white flex items-center gap-2"
                  onClick={() => {
                    mixpanel.track("Unlock My Info");
                    setOpenUnlockPopup(true);
                  }}
                >
                  <CgLockUnlock /> Unlock My Info
                </button>
              </div>
            </section>

            {/* footer */}

            <div className="flex items-center flex-col gap-3 font-inter mb-10">
              <span className="text-[16px] text-[#424242]">
                powered by : anchors.in
              </span>
              <Link
                to="/"
                className="cursor-pointer text-[#FF5C5C] text-sm"
                onClick={() => {
                  mixpanel.track("Create your own Collab Profile");
                }}
              >
                Create your own Collab Profile
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Profile;
