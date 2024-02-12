import { useEffect, useState } from "react";
import { useBrand } from "../../../../Providers/Brand";
import { useGeneralSettings } from "../../../../Providers/General";
import { toast } from "react-toastify";

import { Table1 } from "../../../../Components/Tables/Tables";

export const CreditHistory = () => {
  const brandState = useBrand();
  const genralState = useGeneralSettings();

  const [CreditsHistory, setCreditsHistory] = useState([]);

  useEffect(() => {
    async function getCreditsHistory() {
      genralState?.setLoading(true);
      const result = await brandState?.getCreditsHistory();
      if (result?.success) {
        genralState.setLoading(false);
        setCreditsHistory(result?.AllTransactions);
      } else {
        genralState?.setLoading(false);
        toast.error(result);
      }
    }
    getCreditsHistory();
  }, []);

  const getDate = (date) => {
    const originalDateUTC = new Date(date);
    let formattedDateIST = originalDateUTC.toLocaleString('en-IN');
    return formattedDateIST
  };

  const getCellStyle = (index, cellData) => {
    if (index === 1 && cellData === "Credit") {
      return { color: "#12E8B5" }; // Apply green color if cellData is 'Credit'
    }
    return {}; // Default empty object if no style should be applied
  };

  return (
    <div className="w-full h-full">
      <div className="flex flex-col w-full h-full px-[40px] py-[20px] align-left gap-[20px]">
        <p className=" text-[18px] font-[600] text-[#424242] ">
          Track Your Credit Activity
        </p>
        <Table1
          headers={["S. No. ", "Action", "Amount", "Date & Time", "Details"]}
          rows={CreditsHistory?.map((influencer, index) => [
            index + 1, // S.No.
            influencer?.transactionType ? influencer?.transactionType === "Credit" ? "Added" : "Spent" : "NA", // Influencer name
            <div
              style={{
                color:
                  influencer?.transactionType === "Credit" ? "#12E8B5" : "",
              }}
            >
              {influencer?.transactionType === "Credit"
                ? `+${influencer?.credits || 0} credits`
                : `- ${influencer?.credits || 0} credits`}
            </div>, // LinkedIn profile
            getDate(influencer?.updatedAt), // Contact number
            influencer?.purpose || "NA", // Email
          ])}
          cellStyles={undefined}
        />
      </div>
    </div>
  );
};
