import React from "react";
import { BsTag } from "react-icons/bs";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import mixpanel from "mixpanel-browser"

interface GeneralCardProps {
  title: string;
  tags: string[];
  id?: string;
  textSize?: string;
}

interface SocialCardProps {
  icon;
  bg: string;
  platform: string;
  audience: number;
  link: string;
}

interface BrandCardProps {
  companyName: string;
  companyUrl: string;
  companyProfile: string;
  goals: [];
  newImg?:string
  postLink:string
}

interface PlatformCardProps {
  platformName: string;
  profileLink: string;
  methods: [];
}

export const BrandCard: React.FC<BrandCardProps> = ({
  companyName,
  companyUrl,
  companyProfile,
  goals,
  postLink,
  newImg
}) => {
  return (
    <div className="flex items-start rounded-lg p-5 bg-[#FFE5E5] w-full gap-4 font-inter relative">
      <img
        src={newImg ?? companyProfile}
        alt=""
        className="w-10 h-10 rounded-full"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png";
        }}
      />

      <section className="flex flex-col gap-1">
        <span className="text-xl font-medium">{companyName}</span>
        <p className="text-xs -mt-1">{companyUrl}</p>

        <div className="flex items-center gap-2 text-xs text-[#616161] mt-5 flex-wrap">
          {goals?.map((e) => {
            return (
              <span className="py-1 px-2 border border-[#616161] rounded-full">
                {e}
              </span>
            );
          })}
        </div>
      </section>

      <IoArrowForwardCircleOutline
        size={20}
        className="cursor-pointer absolute right-5"
        color="#616161"
        onClick={()=>{window.open(postLink);mixpanel.track("Clicked on brand postlink arrow")}}
      />
    </div>
  );
};

export const PlatformCard: React.FC<PlatformCardProps> = ({
  platformName,
  profileLink,
  methods,
}) => {
  return (
    <div
      className="flex items-start flex-col rounded-lg w-full font-inter bg-[#ECFDF5]"
      style={{
        boxShadow: "0px 0px 12px 0px rgba(33, 33, 33, 0.10)",
      }}
    >
      <div className="flex items-start gap-4 border-b-2 p-5 box-border w-full border-[#EEEEEE]">
        {/* <img
          src="https://www.boat-lifestyle.com/cdn/shop/files/profile-1_2e1d2124-ba4c-43f0-bb83-0e6ee038ff30_1200x1200_crop_center.png?v=1681111976"
          alt=""
          className="w-10 h-10 rounded-full"
        /> */}

        <section className="flex flex-col gap-1">
          <span className="text-xl font-medium">{platformName}</span>
          <p className="text-xs -mt-1">{profileLink}</p>

          <div className="flex items-center gap-2 text-xs text-[#616161] mt-5 flex-wrap">
            {methods?.map((e) => {
              return (
                <span className="py-1 px-2 border border-[#616161] rounded-full text-[10px] ">
                  {e}
                </span>
              );
            })}
          </div>
        </section>
      </div>

      <div className="p-5 box-border w-full flex items-center justify-between relative">
        <span className="flex items-center gap-1 text-[#757575] text-xs">
          <BsTag /> Purchased by 138 people & Increasing
        </span>

        <IoArrowForwardCircleOutline
          size={16}
          color="#757575"
          className="cursor-pointer absolute right-5"
          onClick={()=>{window.open(profileLink);mixpanel.track("Clicked on Platform profilelink arrow")}}
        />
      </div>
    </div>
  );
};

export const GeneralCard: React.FC<GeneralCardProps> = ({
  title,
  tags,
  id,
  textSize = "text-xs",
}) => {
  return (
    <div
      className="flex items-start flex-col rounded-lg w-full font-inter p-3 box-border"
      style={{
        boxShadow: "0px 0px 12px 0px rgba(33, 33, 33, 0.10)",
      }}
      id={id}
    >
      <h3 className="text-[16px] font-medium text-[#424242]">{title}</h3>

      <div
        className={`flex items-center gap-2 ${textSize} text-[#616161] mt-5 flex-wrap`}
      >
        {tags.map((e: string) => {
          return (
            <span className="py-2 px-3 border border-[#616161] rounded-full">
              {e}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export const SocialCard: React.FC<SocialCardProps> = ({ icon, bg , audience, platform}) => {
  return (
    <div
      className={`w-full flex items-center justify-between py-3 px-5 box-border ${bg} rounded-lg font-inter text-[#FAFAFA]`}
    >
      <section className="flex items-center gap-3">
        {/* {icon} */}

        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">Total {audience} Users</span>
          <span className="text-xs">{platform}</span>
        </div>
      </section>

      <IoArrowForwardCircleOutline size={24} className="cursor-pointer" />
    </div>
  );
};
