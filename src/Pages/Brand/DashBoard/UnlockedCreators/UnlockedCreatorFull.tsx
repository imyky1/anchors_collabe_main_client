import { HiArrowNarrowLeft } from "react-icons/hi";
import { FaLinkedin } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { CiCalendarDate } from "react-icons/ci";

import { useNavigate } from "react-router-dom";

import { useBrand } from "../../../../Providers/Brand";

import { Table1 } from "../../../../Components/Tables/Tables";
import { Contentcard } from "../DashBoard";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PiSquaresFourLight } from "react-icons/pi";

export const TableCard = ({ heading, length, headers, rows }) => {
  return (
    <div className="w-full flex-col flex items-center justify-between gap-[20px] px-[40px]">
      <div className=" w-full flex item-start text-[16px] text-[#424242] font-[600] ">
        <p>
          {heading} {`(${length || 0})`}
        </p>
      </div>
      <div className=" w-full ">
        <Table1 headers={headers} rows={rows} cellStyles={undefined} />
      </div>
    </div>
  );
};

export const UnlockedCreatorFull = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(window.location.search);
  const InfluencerID = query?.get("InfluencerID");

  const [UnlockedInfo, SetUnlockedInfo] = useState(null);
  const [InfluencerInfo, SetInfluencerInfo] = useState(null);
  const [InfluencerCollabInfo, SetInfluencerCollabInfo] = useState(null);
  const [InfluencerMonetizationInfo, SetInfluencerMonetizationInfo] =
    useState(null);
  const [InfluencerContentInfo, SetInfluencerContentInfo] = useState(null);
  const [InfluencerAudienceInfo, SetInfluencerAudienceInfo] = useState(null);

  const brandState = useBrand();

  useEffect(() => {
    async function getInfluencerPersonalInfo() {
      const result = await brandState?.getInfluencerPersonalInfo(InfluencerID);
      if (result.success) {

        result?.unlockedInfo && SetUnlockedInfo(result?.unlockedInfo);
        result?.data && SetInfluencerInfo(result?.data);
        result?.data2 && SetInfluencerCollabInfo(result?.data2);
        result?.data3 && SetInfluencerMonetizationInfo(result?.data3);
        result?.data4 && SetInfluencerContentInfo(result?.data4);
        result?.data5 && SetInfluencerAudienceInfo(result?.data5);
      } else {
        toast.error(result?.Error, { autoClose: 1500 });
        navigate('/Brand/DashBoard/UnlockedInfluencer')
      }
    }
    getInfluencerPersonalInfo();
  }, []);

  const convertToReadableFormat = (number) => {
    if (Math.abs(number) >= 1000000000) {
      return (number / 1000000000).toFixed(1) + "B";
    } else if (Math.abs(number) >= 1000000) {
      return (number / 1000000).toFixed(1) + "M";
    } else if (Math.abs(number) >= 1000) {
      return (number / 1000).toFixed(1) + "K";
    } else {
      return number?.toString();
    }
  };

  const getDate = (date) => {
    const originalDateUTC = new Date(date);
    let formattedDateIST = originalDateUTC.toLocaleString("en-IN");
    return formattedDateIST;
  };

  return (
    <div className="w-full h-full">
      <div className="flex flex-col w-full h-auto px-[40px] py-[20px] align-left gap-[20px]">
        <p className="flex gap-[12px] text-[18px] font-[600] text-[#424242] ">
          <button
            onClick={() => navigate("/Brand/DashBoard/UnlockedInfluencer")}
          >
            <HiArrowNarrowLeft size={20} />
          </button>
          {"Creator Details"}
        </p>
        <div className="w-full font-inter items-center flex flex-col p-[40px] gap-[20px] bg-[#FAFAFA] rounded-[12px]">
          {/* creater details header */}
          <div className="w-full flex items-center justify-between px-[40px]">
            <div className="flex gap-[16px] items-center justify-center ">
              <img
                className="w-[80px] h-[80px] rounded-[50%] "
                src={InfluencerInfo?.profile}
                alt=""
              />
              <div>
                <p className=" text-[20px] font-[600] text-[#424242] ">
                  {InfluencerInfo?.name}
                </p>
                <p className="flex items-center gap-[4px] text-[16px] text-[#0076B2] font-[400] ">
                  <FaLinkedin color="#0076B2" />{" "}
                  {convertToReadableFormat(InfluencerInfo?.followers?.linkedin)}{" "}
                  Followers
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-[12px]">
              <p className="flex gap-[8px] text-[#424242] text-[16px] ">
                {" "}
                <CiMail color="#FF5C5C" size={24} /> {InfluencerInfo?.email}
              </p>
              <p className="flex gap-[8px] text-[#424242] text-[16px] ">
                <IoCallOutline color="#FF5C5C" size={24} />{" "}
                {InfluencerInfo?.mobile}
              </p>
            </div>
            <div className="flex flex-col gap-[12px]">
              <p className="flex gap-[8px] text-[#424242] text-[16px] ">
                {" "}
                <CiLocationOn color="#FF5C5C" size={24} /> India
              </p>
              <p className="flex gap-[8px] text-[#424242] text-[16px] ">
                <CiCalendarDate color="#FF5C5C" size={24} /> Unlocked On :
                {getDate(UnlockedInfo?.updatedAt)}
              </p>
            </div>
          </div>

          <div className="w-[95%] h-[1px] bg-[#EEEEEE]"></div>

          {/* creator collab experience */}
          {InfluencerCollabInfo && (
            <TableCard
              heading={"Collab Experience"}
              length={InfluencerCollabInfo?.data?.length}
              headers={[
                "S. No. ",
                "Company Name",
                "Website",
                "Post Link",
                "Goals",
              ]}
              rows={InfluencerCollabInfo?.data?.map((item, index) => [
                index + 1, // S.No.
                item?.companyName,
                <div
                  onClick={() => {
                    window.open(`${item?.companyUrl}`);
                  }}
                  className="text-[#6183E4] cursor-pointer"
                >
                  {item?.companyUrl}
                </div>,
                <div
                onClick={() => {
                  if (!/^https?:\/\//i.test(item?.postLink)) {
                    const postLink = "https://" + item?.postLink;
                    return window.open(postLink, "_blank");
                  }

                  window.open(item?.postLink, "_blank");
                }}
                  className="text-[#6183E4] cursor-pointer"
                >
                  {item?.postLink}
                </div>,

                <div className="flex gap-[4px] ">
                  {item?.goals?.map((item) => (
                    <div className="flex px-[12px] py-[4px] rounded-[198px] bg-[#D1FAE5] align-center justify-center">
                      {item}
                    </div>
                  ))}
                </div>,
              ])}
            />
          )}

          <div className="w-[95%] h-[1px] bg-[#EEEEEE]"></div>

          {/* creator Monetization Avenues*/}
          {InfluencerMonetizationInfo && (
            <TableCard
              heading={"Monetization Avenues"}
              length={InfluencerMonetizationInfo?.data?.length}
              headers={[
                "S. No. ",
                "Company Name",
                "Profile Link",
                "Services",
                "Paid audience",
              ]}
              rows={InfluencerMonetizationInfo?.data?.map((item, index) => [
                index + 1,
                item?.platformName,
                <div
                onClick={() => {
                  if (!/^https?:\/\//i.test(item?.profileLink)) {
                    const profileLink = "https://" + item?.profileLink;
                    return window.open(profileLink, "_blank");
                  }

                  window.open(item?.profileLink, "_blank");
                }}
                  className="text-[#6183E4] cursor-pointer"
                >
                  {item?.profileLink}
                </div>,
                <div>
                  {item?.methods?.map((item) => (
                    <div className="flex px-[12px] py-[4px] rounded-[198px] bg-[#D1FAE5] align-center justify-center">
                      {item}
                    </div>
                  ))}
                </div>,
                ,
                item?.paidAudience,
              ])}
            />
          )}

          <div className="w-[95%] h-[1px] bg-[#EEEEEE]"></div>

          {/* Content category */}
          <div className="w-full flex-col flex items-center justify-between gap-[20px] px-[40px]">
            {InfluencerContentInfo && (
              <Contentcard
                icon={<PiSquaresFourLight color="#424242" size={18} />}
                heading={"Content category"}
                number={InfluencerContentInfo?.categories?.length}
                type={InfluencerContentInfo?.categories}
                borderRadius={"198px"}
              />
            )}
          </div>

          <div className="w-[95%] h-[1px] bg-[#EEEEEE]"></div>

          {/* Audience category */}
          <div className="w-full flex-col flex items-center justify-between gap-[20px] px-[40px]">
            <Contentcard
              icon={<PiSquaresFourLight color="#424242" size={18} />}
              heading={"Audience category"}
              number={InfluencerAudienceInfo?.types?.length}
              type={InfluencerAudienceInfo?.types}
              borderRadius={"198px"}
            />
          </div>

          <div className="w-[95%] h-[1px] bg-[#EEEEEE]"></div>

          {/* Audience Presence */}
          <TableCard
            heading={"Audience Presence"}
            length={InfluencerAudienceInfo?.platforms?.reduce(
              (total, platform) => total + platform.audience,
              0
            )}
            headers={["S. No. ", "Platform Names", "No. of users", "Link"]}
            rows={InfluencerAudienceInfo?.platforms?.map((item, index) => [
              index + 1,
              item?.platform,
              item?.audience,
              <div
                onClick={() => {
                  if (!/^https?:\/\//i.test(item?.link)) {
                    const link = "https://" + item?.link;
                    return window.open(link, "_blank");
                  }

                  window.open(item?.link, "_blank");
                }}
                className="text-[#6183E4] cursor-pointer"
              >
                {item?.link}
              </div>,
            ])}
          />
        </div>
      </div>
    </div>
  );
};
