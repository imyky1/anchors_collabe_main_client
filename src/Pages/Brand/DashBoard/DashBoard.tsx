import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
import {
  FilterOptionModal,
  SideModal,
} from "../../../Components/Brand/modals/Modals";
import { Modal1, Modal2 } from "../../../Components/Brand/modals/Modals";
import axios from "axios";

export const TypeCard = ({
  item,
  Objkey,
  borderRadius,
  locked,
  LinkObjKey,
  subItem,
}) => {
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
      {Objkey === "audience" ? (
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

      <div className="flex-col">
        {Objkey ? (
          <h1>{item?.[Objkey]?.slice(0, 27)}</h1>
        ) : (
          <h1>{item?.slice(0, 27)}</h1>
        )}
        {subItem && `${subItem}`}
      </div>
      <div
        onClick={
          !locked
            ? LinkObjKey
              ? () => window.open(`${item?.[LinkObjKey]}`)
              : () => console.log("")
            : () => alert("profile is locked!")
        }
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
              subItem={props.subItem}
              Objkey={props?.Objkey}
              borderRadius={props?.borderRadius}
              locked={props?.locked}
              LinkObjKey={props?.LinkObjKey}
            />
          );
        })}
      </div>
    </div>
  );
};
export const FilterCard = ({
  list,
  item,
  icon,
  setfilters,
  filters,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  const handleClick = (event) => {
    // console.log(event.target);
    const targetElement = event.target;
    const rect = targetElement.getBoundingClientRect();
    const mouseXRelativeToElement = event.clientX - rect.left;
    const mouseYRelativeToElement = event.clientY - rect.top;
    // console.log(
    //   "Mouse clicked relative to element at: " +
    //     mouseXRelativeToElement +
    //     ", " +
    //     mouseYRelativeToElement
    // );
    onClick();
  };

  return (
    <div
      onClick={() => handleClick(event)}
      // onMouseEnter={() => onMouseEnter()}
      // onMouseLeave={()=>onMouseLeave()}
      className="filterCard"
    >
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
  const navigate = useNavigate();
  const [AllInfluencers, SetAllInfluencers] = useState(null);
  const [FilteredInfluencer, SetFilteredInfluencer] = useState(null);
  const [numFetchedInfluencers, setNumFetchedInfluencers] = useState(10);

  const [openModal, SetOpenModal] = useState(false);
  const [successModal, OpenSuccessModal] = useState(false);
  const [filterModal, OpenFilterModal] = useState(false);
  const [AdvandeModal, OpenAdvanceModal] = useState(false);

  const brandState = useBrand();
  const authState = useAuth();
  const generalState = useGeneralSettings();
  const staticDataState = useStaticData();

  //filters
  const [List, SetList] = useState([]);
  const [Followers, setFollowers] = useState([
    "1k-5k",
    "5k-10k",
    "10k-15k",
    "15k-20k",
    "20k-30k",
    "30k-50k",
    "50k-100k",
    "More than 100k",
  ]);
  const [Gender, setGender] = useState(["Male", "Female", "Other"]);
  const [collaboratedWithBrand, SetCollaboratedWithBrand] = useState([
    "Yes",
    "No",
  ]);
  const [ContentType, setContenType] = useState([]);
  const [AudienceType, setAudienceype] = useState([]);

  //state and setters for FilterOptionModal
  const [selectedFilterState, setSelectedFilterState] = useState([]);
  const [selectedFilterSetter, setSelectedFilterSetter] = useState(() => {});

  //selected filters
  const [selectedFollowersFilters, setSelectedFollowersFilters] = useState([]);
  const [selectedContentTypeFilters, setSelectedContentTypeFilters] = useState(
    []
  );
  const [selectedAudienceTypeFilters, setSelectedAudienceTypeFilters] =
    useState([]);
  const [selectedCollaboratedWithBrand, setSelectedCollaboratedWithBrand] =
    useState([]);
  const [selectedGenderFilters, setSelectedGenderFilters] = useState([]);

  //SlectedInfluenceData
  const [selectedInfluencerCoins, setSelectedInfluencerCoins] = useState(0);
  const [selectedInfluencerName, setSelectedInfluencerName] = useState("");
  const [selectedInfluencerprofile, setSelectedInfluencerProfile] =
    useState("");
  const [selectedInfluencerID, setSelectedInfluencerID] = useState(null);

  useEffect(() => {
    async function getAllInfluencers() {
      generalState?.setLoading(true);
      const result = await brandState?.getAllInfluencersData(0,0);
      if (result?.success) {
        SetAllInfluencers(result?.AllInfluencers);
        SetFilteredInfluencer(result?.AllInfluencers);
        generalState?.setLoading(false);
      } else {
        generalState?.setLoading(false);
        console.log(result)
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
        setAudienceype(result2);
      }
    }
    getAllInfluencers();
    getAllFilters();
  }, []);
  useEffect(() => {
    setSelectedFilterState(selectedFollowersFilters);
  }, [selectedFollowersFilters]);
  useEffect(() => {
    setSelectedFilterState(selectedContentTypeFilters);
  }, [selectedContentTypeFilters]);
  useEffect(() => {
    setSelectedFilterState(selectedAudienceTypeFilters);
  }, [selectedAudienceTypeFilters]);
  useEffect(() => {
    setSelectedFilterState(selectedGenderFilters);
  }, [selectedGenderFilters]);
  useEffect(() => {
    setSelectedFilterState(selectedCollaboratedWithBrand);
  }, [selectedCollaboratedWithBrand]);

  const convertToReadableFormat = (number) => {
    if (Math.abs(number) >= 1000000000) {
      return (number / 1000000000).toFixed(1) + "B";
    } else if (Math.abs(number) >= 1000000) {
      return (number / 1000000).toFixed(1) + "M";
    } else if (Math.abs(number) >= 1000) {
      return (number / 1000).toFixed(1) + "K";
    } else {
      return number.toString();
    }
  };

  const handleFilterCardClick = (filterList, filters, setFilterFunction) => {
    SetList(filterList);
    setSelectedFilterState(filters);
    setSelectedFilterSetter(() => setFilterFunction);
    OpenFilterModal(true);
  };

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

  const handleFilterSearch = () => {
    if (
      selectedAudienceTypeFilters?.length > 0 ||
      selectedContentTypeFilters?.length > 0 ||
      selectedCollaboratedWithBrand?.length > 0 ||
      selectedFollowersFilters?.length > 0
    ) {
      const filteredInfluencers = AllInfluencers.filter((influencer) => {
        // Check if any selected filter is included in AudienceCategory or AudienceData
        const matchesAudience = influencer?.AudienceCategory?.some((category) =>
          selectedAudienceTypeFilters.includes(category)
        );
        // Check if any selected filter is included in ContentCategory
        const matchesContent = influencer?.ContentCategory?.some((category) =>
          selectedContentTypeFilters.includes(category)
        );
        // Check if the influencer matches the selected followers filter
        const matchesFollowers = checkFollowersFilter(
          influencer?.influencerData?.LinkedInFollowers
        );
        // Check if the influencer matches the selected collaboration filter
        let matchesbrands = false;
        if (
          selectedCollaboratedWithBrand?.includes("Yes") &&
          selectedCollaboratedWithBrand?.includes("No")
        ) {
          matchesbrands =
            influencer?.collabData?.length > 0 ||
            influencer?.collabData?.length === 0 ||
            !influencer?.collabData;
        } else if (selectedCollaboratedWithBrand?.includes("No")) {
          matchesbrands =
            influencer?.collabData?.length === 0 || !influencer?.collabData;
        } else if (selectedCollaboratedWithBrand?.includes("Yes")) {
          matchesbrands = influencer?.collabData?.length > 0;
        }
        // Return true if either audience, content, followers, or brands matches
        return (
          matchesAudience || matchesContent || matchesFollowers || matchesbrands
        );
      });
      SetFilteredInfluencer(filteredInfluencers);
    } else {
      SetFilteredInfluencer(AllInfluencers);
    }
  };

  const checkFollowersFilter = (followersCount) => {
    if (!followersCount) return false;
    for (let i = 0; i < selectedFollowersFilters.length; i++) {
      const range = selectedFollowersFilters[i];
      if (range === "More than 100k") {
        if (followersCount >= 100000) {
          return true;
        }
      } else {
        let [minStr, maxStr] = range.split("-");
        let min = parseFollowersCount(minStr);
        let max = parseFollowersCount(maxStr);

        if (followersCount >= min && followersCount <= max) {
          return true;
        }
      }
    }

    return false;
  };

  // Function to parse the follower count with 'k' and 'M'
  const parseFollowersCount = (val) => {
    if (val.includes("k")) {
      return parseFloat(val.replace("k", "")) * 1000;
    } else if (val.includes("M")) {
      return parseFloat(val.replace("M", "")) * 1000000;
    } else {
      return parseFloat(val);
    }
  };

  const handleViewMore = async () => {
    const newInfluencers = await brandState?.getAllInfluencersData(numFetchedInfluencers,10);
    console.log(newInfluencers)
    if (newInfluencers.success) {
      SetAllInfluencers([
        ...AllInfluencers,
        ...newInfluencers.AllInfluencers,
      ]);
      SetFilteredInfluencer([...FilteredInfluencer, ...newInfluencers.AllInfluencers,])
      setNumFetchedInfluencers(numFetchedInfluencers + 10);
    } else {
      alert(newInfluencers.error);
    }
  };

  console.log(AllInfluencers);

  return (
    <>
      {AdvandeModal && <SideModal OnClose={() => OpenAdvanceModal(false)} />}
      <div className="brandDashBoardContainer">
        <h1>Discover Influencer</h1>
        <div className="DashboardFilterContainer">
          <div
            style={{
              display: "flex",
              width: "100%",
              flexGrow: 1,
              position: "relative",
            }}
          >
            <div className="MaindashBoardFilterWrapper">
              <FilterCard
                list={Followers}
                onClick={() =>
                  handleFilterCardClick(
                    Followers,
                    selectedFollowersFilters,
                    setSelectedFollowersFilters
                  )
                }
                onMouseEnter={() => OpenFilterModal(true)}
                onMouseLeave={() => OpenFilterModal(false)}
                filters={selectedFollowersFilters}
                setfilters={setSelectedFollowersFilters}
                item={"Followers"}
                icon={<IoPeopleOutline />}
              />
              <FilterCard
                list={ContentType}
                onClick={() =>
                  handleFilterCardClick(
                    ContentType,
                    selectedContentTypeFilters,
                    setSelectedContentTypeFilters
                  )
                }
                onMouseEnter={() => OpenFilterModal(true)}
                onMouseLeave={() => OpenFilterModal(false)}
                filters={selectedContentTypeFilters}
                setfilters={setSelectedContentTypeFilters}
                item={"Content Type"}
                icon={<MdOutlinePostAdd />}
              />
              <FilterCard
                item={"Audience Type"}
                onClick={() =>
                  handleFilterCardClick(
                    AudienceType,
                    selectedAudienceTypeFilters,
                    setSelectedAudienceTypeFilters
                  )
                }
                filters={selectedAudienceTypeFilters}
                list={AudienceType}
                setfilters={setSelectedAudienceTypeFilters}
                icon={<HiOutlineUserGroup />}
                onMouseEnter={() => OpenFilterModal(true)}
                onMouseLeave={() => OpenFilterModal(false)}
              />
              <FilterCard
                filters={selectedCollaboratedWithBrand}
                list={collaboratedWithBrand}
                setfilters={SetCollaboratedWithBrand}
                item={"Collaborated with brands"}
                onClick={() =>
                  handleFilterCardClick(
                    collaboratedWithBrand,
                    selectedCollaboratedWithBrand,
                    setSelectedCollaboratedWithBrand
                  )
                }
                onMouseEnter={() => OpenFilterModal(true)}
                onMouseLeave={() => OpenFilterModal(false)}
                icon={""}
              />
              <FilterCard
                filters={selectedGenderFilters}
                list={Gender}
                setfilters={setSelectedGenderFilters}
                onClick={() =>
                  handleFilterCardClick(
                    Gender,
                    selectedGenderFilters,
                    setSelectedGenderFilters
                  )
                }
                onMouseLeave={() => OpenFilterModal(false)}
                item={"Gender"}
                icon={<BsGenderFemale />}
                onMouseEnter={() => OpenFilterModal(true)}
              />
              {/* <FilterCard item={"Gender"} icon={<BsGenderFemale />} />
              <FilterCard item={"Gender"} icon={<BsGenderFemale />} />
              <FilterCard item={"Gender"} icon={<BsGenderFemale />} /> */}
            </div>

            {filterModal && (
              <FilterOptionModal
                filters={selectedFilterState}
                setfilters={selectedFilterSetter}
                list={List}
                onClose={() => OpenFilterModal(false)}
              />
            )}

            <div className="FilterSearchWrapper">
              <Button1
                onClick={() => handleFilterSearch()}
                icon={""}
                rightIcon={""}
                text="Search"
                background={undefined}
                textColor={undefined}
                borderColor={undefined}
              />
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
            <button
              style={{ cursor: "not-allowed" }}
              // onClick={() => OpenAdvanceModal(true)}
              className="AdvanceFilter"
            >
              <IoDiamondOutline /> Advance filter
            </button>
          </div>
        </div>
        <h2>List of creators ({FilteredInfluencer?.length}) </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {FilteredInfluencer?.map((influencer, index) => (
            <div key={index} className="creatorcard">
              {openModal && (
                <Modal1
                  credits={authState?.loggedBrand?.credits}
                  coins={selectedInfluencerCoins}
                  onClose={() => {
                    return SetOpenModal(false);
                  }}
                  onBuy={() => handleBuyClick()}
                  OnClick={() => navigate("/Brand/DashBoard/PurchaseCredits")}
                />
              )}
              {successModal && (
                <Modal2
                  onClick={() =>
                    navigate(
                      `Brand/DashBoard/UnlockedInfluencer/Details/${selectedInfluencerID}`
                    )
                  }
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
                  src={influencer?.influencerData?.profile || "/user.png"}
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
                  <button
                    onClick={
                      influencer?.is_unlocked
                        ? () => navigate("/")
                        : () =>
                            handleUnlockButtonClick(
                              influencer?.influencerData?.total_coins || 0,
                              influencer?.influencerData?.name,
                              influencer?.influencerData?.profile,
                              influencer?.influencerData?._id
                            )
                    }
                    className="LinkedinButton"
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <FaLinkedin />
                      {convertToReadableFormat(
                        parseInt(influencer?.influencerData?.LinkedInFollowers)
                      )}{" "}
                      Followers
                    </div>
                    {influencer?.is_unlocked ? (
                      <div style={{ display: "flex", gap: "4px" }}>
                        <FiChevronRight />
                      </div>
                    ) : (
                      <div style={{ display: "flex", gap: "4px" }}>
                        <GoUnlock />
                      </div>
                    )}
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
                    LinkObjKey="postLink"
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
                    LinkObjKey="profileLink"
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
                    Objkey="audience"
                    LinkObjKey="link"
                    subItem="User"
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
        <div className="w-full flex justify-center align-center mt-[30px] mb-[30px]">
        <Button1
          onClick={handleViewMore}
          text="View More"
          icon={undefined}
          rightIcon={undefined}
          background={undefined}
          textColor={undefined}
          borderColor={undefined}
        />
        </div>
        
      </div>
    </>
  );
};
