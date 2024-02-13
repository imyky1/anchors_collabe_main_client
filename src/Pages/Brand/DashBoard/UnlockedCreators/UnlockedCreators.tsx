import { useEffect, useState } from "react";
import { useBrand } from "../../../../Providers/Brand";
import { useGeneralSettings } from "../../../../Providers/General";
import { toast } from "react-toastify";

import { Table1 } from "../../../../Components/Tables/Tables";
import { GoLinkExternal } from "react-icons/go";
import { useNavigate } from "react-router-dom";

export const UnlockedCreators = () => {
  const navigate = useNavigate();
  const brandState = useBrand();
  const genralState = useGeneralSettings();
  const [unlockedInfluencer, setUnlockedInfluencers] = useState([]);

  useEffect(() => {
    async function getUnlockedInfluencers() {
      genralState?.setLoading(true);
      const result = await brandState?.getUnlockedInfluencers();
      if (result?.success) {
        genralState?.setLoading(false);
        setUnlockedInfluencers(result?.unlockedInfluencers);
      } else {
        genralState?.setLoading(false);
        toast.error(result);
      }
    }
    getUnlockedInfluencers();
  }, []);
  console.log(unlockedInfluencer)

  return (
    <div className="w-full h-full">
      <div className="flex flex-col w-full h-full px-[40px] py-[20px] align-left gap-[20px]">
        <p className=" text-[18px] font-[600] text-[#424242] ">
          Unlocked creators {`(${unlockedInfluencer?.length})`}
        </p>
        <Table1
          headers={[
            "S. No. ",
            "Influencer",
            "LinkedIn Profile",
            "Contact Number",
            "Email",
            "View Details",
          ]}
          rows={unlockedInfluencer.map((influencer, index) => [
            index + 1, // S.No.
            <div className="flex">
              <img
                style={{ width: "24px", height: "24px", borderRadius: "50%" , marginRight:'12px'}}
                src={influencer?.influencer?.profile || "/user.png"}
                alt=""
              />{" "}
              {influencer?.influencer?.name || "Not Available"}
            </div>, // Influencer name
            <div
              onClick={() => {
                if (
                  !/^https?:\/\//i.test(influencer?.influencer?.linkedinLink)
                ) {
                  const postLink =
                    "https://" + influencer?.influencer?.linkedinLink;
                  return window.open(postLink, "_blank");
                }

                window.open(influencer?.influencer?.linkedinLink, "_blank");
              }}
              className={`text-[${influencer?.influencer?.linkedinLink ? '#6183E4' : ''}] cursor-pointer"`}
            >
              {influencer?.influencer?.linkedinLink ? `${influencer?.influencer?.linkedinLink?.slice(0,25)}...` : "Not Available"}
            </div>, // LinkedIn profile
            influencer?.influencer?.mobile || "Not Available", // Contact number
            influencer?.influencer?.email || "NA", // Email
            <button
              onClick={() =>
                navigate(
                  `/Brand/DashBoard/UnlockedInfluencer/Details/?InfluencerID=${influencer?.InfluencerID}`
                )
              }
            >
              <GoLinkExternal color="#FF5C5C" size={20} />
            </button>, // LinkedIn icon
            // Add more fields if necessary
          ])}
          cellStyles={undefined}
        />
      </div>
    </div>
  );
};
