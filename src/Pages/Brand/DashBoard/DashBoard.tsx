import { useEffect, useState } from "react";

import "./DashBoard.css";

import { useBrand } from "../../../Providers/Brand";
import { useStaticData } from "../../../Providers/Data";
import { useAuth } from "../../../Providers/Auth";
import { useGeneralSettings } from "../../../Providers/General";

import { IoIosArrowDown } from "react-icons/io";
import { BsGenderFemale } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { IoPeopleOutline } from "react-icons/io5";
import { MdOutlinePostAdd } from "react-icons/md";
import { FaRegHandshake } from "react-icons/fa";
import { PiSquaresFourLight } from "react-icons/pi";
import { FiPhone } from "react-icons/fi";
import { IoIosPeople } from "react-icons/io";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaLinkedin } from "react-icons/fa";
import { GoUnlock } from "react-icons/go";
import { CiLock } from "react-icons/ci";
import { PiCrown } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
import { VscMail } from "react-icons/vsc";
import { FiChevronRight } from "react-icons/fi";
import { IoDiamondOutline } from "react-icons/io5";

import { Button1 } from "../../../Components/Buttons";
import { FilterOptionModal } from "../../../Components/Brand/modals/Modals";
import { Modal1, Modal2 } from "../../../Components/Brand/modals/Modals";

export const TypeCard = ({ item, Objkey, borderRadius, locked }) => {
  const staticDataState = useStaticData();
  const [AudiencePlatformLogo, setAudiencePlatformLogo] = useState("");
  const [PlatformLogo, setPlatformLogo] = useState("");

  useEffect(() => {
    async function getSataticData() {
      if (Objkey === "platform") {
        const result = await staticDataState?.getLogoFromType(
          "Audience Platform"
        );

        setAudiencePlatformLogo(result?.[item?.[Objkey]]);
      } else if (Objkey === "platformName") {
        const result = await staticDataState?.getLogoFromType("Platform Name");

        setPlatformLogo(result?.[item?.[Objkey]]);
      }
    }
    getSataticData();
  }, [item]);
  return (
    <div
      style={{
        display: Objkey
          ? item?.[Objkey]
            ? "flex"
            : "none"
          : item
          ? "flex"
          : "none",
        borderRadius: borderRadius || "",
      }}
      className="typeWrapper"
    >
      {Objkey === "platform" ? (
        <img
          style={{ width: "24px", height: "24px", borderRadius: "50%" }}
          src={AudiencePlatformLogo}
          alt=""
        />
      ) : (
        ""
      )}
      {Objkey === "platformName" ? (
        <img
          style={{ width: "16px", height: "16px", borderRadius: "50%" }}
          src={PlatformLogo}
          alt=""
        />
      ) : (
        ""
      )}

      {Objkey ? (
        <h1>{item?.[Objkey]?.slice(0, 27)}</h1>
      ) : (
        <h1>{item?.slice(0, 27)}</h1>
      )}
      <div
        style={{ cursor: "pointer", display: borderRadius ? "none" : "flex" }}
      >
        {locked ? (
          <CiLock color="#424242" size={16} />
        ) : (
          <FiChevronRight color="#424242" size={16} />
        )}
      </div>
    </div>
  );
};
export const Contentcard = (props) => {
  const colors = ["#F3FFFA", "#FFFCF1", "#FFF1F1", "#F1F7FF", "#F6F2FF"];
  const getRandomColor = () => {
    const int = Math.floor(Math.random() * 5);
    return colors[int];
  };
  return (
    <div
      style={{ background: getRandomColor() }}
      className="DashboardContentCard"
    >
      <h1 style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        {props?.icon}
        {props?.heading}({props?.number})
      </h1>
      <div className="DashBoardContentCardItemList">
        {props?.type?.map((item) => {
          return (
            <TypeCard
              item={item}
              Objkey={props?.Objkey}
              borderRadius={props?.borderRadius}
              locked={props?.locked}
            />
          );
        })}
      </div>
    </div>
  );
};
export const FilterCard = ({ list, item, icon, setfilters, filters }) => {
  const [filterModal, OpenFilterModal] = useState(false);

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => OpenFilterModal(true)}
      onMouseLeave={() => OpenFilterModal(false)}
      className="filterCard"
    >
      {filterModal && (
        <FilterOptionModal
          filters={filters}
          setfilters={setfilters}
          list={list}
          onClose={() => OpenFilterModal(false)}
        />
      )}
      {icon}
      <div
        style={
          filters?.length
            ? {
                background: "#EEEEEE",
                borderRadius: "120px",
                padding: "4px 8px",
                fontSize: "12px",
                lineHeight: "14px",
              }
            : {}
        }
      >
        {filters?.length ? filters?.[0] : item}
      </div>
      {filters?.length > 1 && <div>{`+${filters?.length - 1}`}</div>}
      {<IoIosArrowDown />}
    </div>
  );
};

export const DashBoard = () => {
  const [AllInfluencers, SetAllInfluencers] = useState(null);
  const [openModal, SetOpenModal] = useState(false);
  const [successModal, OpenSuccessModal] = useState(false);

  const brandState = useBrand();
  const authState = useAuth();
  const generalState = useGeneralSettings();
  const staticDataState = useStaticData();

  //filters
  const [Followers, setFollowers] = useState([
    "1k-5k",
    "5k-10k",
    "10k-15k",
    "15k-20k",
    "20k-30k",
    "30K-50K",
    "50k-100k",
    "100k-500k",
    "500k-1M",
    "1M-10M",
    "10M-50M",
    "50M-100M",
    "More than 100M",
  ]);
  const [Gender, setGender] = useState(["Male", "Female", "Other"]);
  const [ContentType, setContenType] = useState([]);
  const [AudienceType, setAudienceype] = useState([]);

  //selected filters
  const [selectedFollowersFilters, setSelectedFollowersFilters] = useState([]);
  const [selectedContentTypeFilters, setSelectedContentTypeFilters] = useState(
    []
  );
  const [selectedAudienceTypeFilters, setSelectedAudienceTypeFilters] =
    useState([]);
  const [selectedGenderFilters, setSelectedGenderFilters] = useState([]);

  const [selectedInfluencerCoins, setSelectedInfluencerCoins] = useState(0);
  const [selectedInfluencerName, setSelectedInfluencerName] = useState("");
  const [selectedInfluencerprofile, setSelectedInfluencerProfile] =
    useState("");
  const [selectedInfluencerID, setSelectedInfluencerID] = useState(null);

  useEffect(() => {
    async function getAllInfluencers() {
      generalState?.setLoading(true)
      const result = await brandState?.getAllInfluencersData();
      if (result?.success) {
        SetAllInfluencers(result?.AllInfluencers);
        generalState?.setLoading(false)
      } else {
        generalState?.setLoading(false)
        alert(result?.error);
      }
    }
    async function getAllFilters() {
      const result = await staticDataState?.getDataFromType("Content Type");
      if (result) {
        setContenType(result);
      }
      const result2 = await staticDataState?.getDataFromType(
        "Audience Category"
      );
      if (result) {
        setAudienceype(result);
      }
    }
    getAllInfluencers();
    getAllFilters();
  }, []);

  const handleUnlockButtonClick = (coins, name, profile, id) => {
    setSelectedInfluencerCoins(coins);
    setSelectedInfluencerName(name);
    setSelectedInfluencerProfile(profile);
    setSelectedInfluencerID(id);
    SetOpenModal(true);
  };

  const handleBuyClick = async () => {
    SetOpenModal(false);
    generalState?.setLoading(true);
    const result = await brandState?.getInfluncerWithCredits(
      selectedInfluencerID
    );
    if (result?.success) {
      generalState.setLoading(false);
      OpenSuccessModal(true);
      authState?.setReFetchBrandData((prev) => !prev);
    } else {
      generalState.setLoading(false);
      alert(result);
    }
  };

  console.log(AllInfluencers);

  return (
    <>
      <div className="brandDashBoardContainer">
        <h1>Discover Influencer</h1>
        <div style={{ marginTop: "20px" }} className="DashboardFilterContainer">
          <div style={{ display: "flex",width:'100%' }}>
            <div className="MaindashBoardFilterWrapper">
              <FilterCard
                list={Followers}
                filters={selectedFollowersFilters}
                setfilters={setSelectedFollowersFilters}
                item={"Followers"}
                icon={<IoPeopleOutline />}
              />
              <FilterCard
                list={ContentType}
                filters={selectedContentTypeFilters}
                setfilters={setSelectedContentTypeFilters}
                item={"Content Type"}
                icon={<MdOutlinePostAdd />}
              />
              <FilterCard
                item={"Audience Type"}
                filters={selectedAudienceTypeFilters}
                list={AudienceType}
                setfilters={setSelectedAudienceTypeFilters}
                icon={<HiOutlineUserGroup />}
              />
              <FilterCard item={"Collaborated with brands"} icon={""} />
              <FilterCard
                filters={selectedGenderFilters}
                list={Gender}
                setfilters={setSelectedGenderFilters}
                item={"Gender"}
                icon={<BsGenderFemale />}
              />
              {/* <FilterCard item={"Gender"} icon={<BsGenderFemale />} />
              <FilterCard item={"Gender"} icon={<BsGenderFemale />} />
              <FilterCard item={"Gender"} icon={<BsGenderFemale />} /> */}
            </div>
            <div className="FilterSearchWrapper">
              <Button1 text="Search" />
            </div>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "20px",
            }}
          >
            <button className="AdvanceFilter">
              <IoDiamondOutline /> Advance filter
            </button>
          </div>
        </div>
        <h2>List of creators ({AllInfluencers?.length}) </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {AllInfluencers?.map((influencer, index) => (
            <div key={index} className="creatorcard">
              {openModal && (
                <Modal1
                  credits={authState?.loggedBrand?.credits}
                  coins={selectedInfluencerCoins}
                  onClose={() => {
                    return SetOpenModal(false);
                  }}
                  onBuy={() => handleBuyClick()}
                />
              )}
              {successModal && (
                <Modal2
                  onClose={() => {
                    return OpenSuccessModal(false);
                  }}
                  name={selectedInfluencerName}
                  profile={selectedInfluencerprofile}
                />
              )}
              <div className="creatorCardLeft">
                <div className="featuredcontaner">
                  <PiCrown size={12} /> FEATURED
                </div>
                <img
                  style={{
                    filter: !influencer?.is_unlocked ? "blur(4px)" : "",
                  }}
                  src={influencer?.influencerData?.profile}
                  alt=""
                />
                <div className="creatorinfowrapper">
                  <h1
                    style={{
                      filter: !influencer?.is_unlocked ? "blur(3px)" : "",
                    }}
                  >
                    {influencer?.influencerData?.name}
                  </h1>
                  <h2>
                    <VscMail />
                    <div
                      style={{
                        filter: !influencer?.is_unlocked ? "blur(3px)" : "",
                      }}
                    >
                      {" "}
                      {influencer?.influencerData?.email}
                    </div>
                  </h2>
                  <h2>
                    <FiPhone />
                    <div
                      style={{
                        filter: !influencer?.is_unlocked ? "blur(3px)" : "",
                      }}
                    >
                      {influencer?.influencerData?.mobile}
                    </div>
                  </h2>
                  <h2>
                    <IoLocationOutline />
                    <div
                      style={{
                        filter: !influencer?.is_unlocked ? "blur(3px)" : "",
                      }}
                    >
                      India
                    </div>
                  </h2>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    marginTop: "90px",
                  }}
                >
                  <button className="LinkedinButton">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <FaLinkedin />
                      51K Followers
                    </div>
                    <div style={{ display: "flex", gap: "4px" }}>
                      <GoUnlock />
                      <FiChevronRight />
                    </div>
                  </button>
                  {influencer?.is_unlocked ? (
                    <button
                      style={{ background: "#10B981" }}
                      className="unlockButton"
                    >
                      <GoUnlock /> {"Profile Unlocked"}
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        handleUnlockButtonClick(
                          influencer?.influencerData?.total_coins || 0,
                          influencer?.influencerData?.name,
                          influencer?.influencerData?.profile,
                          influencer?.influencerData?._id
                        )
                      }
                      className="unlockButton"
                    >
                      <GoUnlock />{" "}
                      {`Unlock with ${
                        influencer?.influencerData?.total_coins || 0
                      } Credits`}
                    </button>
                  )}
                </div>
              </div>
              <div className="creatorCardRight">
                {influencer?.collabData && (
                  <Contentcard
                    icon={<FaRegHandshake color="#424242" size={18} />}
                    heading={"Collab Experience"}
                    number={influencer?.collabData?.length}
                    type={influencer?.collabData}
                    Objkey="companyName"
                    locked={!influencer?.is_unlocked}
                  />
                )}
                {influencer?.MonetizedData && (
                  <Contentcard
                    icon={<GiTakeMyMoney color="#424242" size={18} />}
                    heading={"Monetization Avenues"}
                    number={influencer?.MonetizedData?.length}
                    type={influencer?.MonetizedData}
                    Objkey="platformName"
                    locked={!influencer?.is_unlocked}
                  />
                )}
                {influencer?.ContentCategory && (
                  <Contentcard
                    icon={<PiSquaresFourLight color="#424242" size={18} />}
                    heading={"Content category"}
                    number={influencer?.ContentCategory?.length}
                    type={influencer?.ContentCategory}
                    borderRadius={"198px"}
                  />
                )}
                {influencer?.AudienceData && (
                  <Contentcard
                    icon={<IoIosPeople color="#424242" size={18} />}
                    heading={"Audience Presence"}
                    number={influencer?.AudienceData?.length}
                    type={influencer?.AudienceData}
                    Objkey="platform"
                    locked={!influencer?.is_unlocked}
                  />
                )}
                {influencer?.AudienceCategory && (
                  <Contentcard
                    icon={<PiSquaresFourLight color="#424242" size={18} />}
                    heading={"Audience category"}
                    number={influencer?.AudienceCategory?.length}
                    type={influencer?.AudienceCategory}
                    borderRadius={"198px"}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
