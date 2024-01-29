import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CompanyList.css";
import { CiViewList } from "react-icons/ci";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { WishlistProps } from "./CompanyList";
import { useInfluencer } from "../../../../Providers/Influencer";

export const Show_Company_List = () => {
  const navigate = useNavigate();
  const influencerState = useInfluencer()
  const [data, setdata] = useState<[WishlistProps]>([
    {
      companyName: "",
      companyUrl: "",
    },
  ]);


  useEffect(() => {
    async function process(){
      const data2 = await influencerState?.getBrandWishlist()
      if(data2?.success){
        setdata(data2?.data)
      }
    }

    process()
    
  }, [])
  

  return (
    <div className="influencer_company_list_container">
      <div className="influence_copmany_list_wrapper">
        <div className="influence_copmany_list_header">
          <div className="influence_copmany_list_header_heading">
          <h1>
            Dream Brands? Craft Your Collab Wish List
            </h1>
            <h3>
            We can't guarantee every dream collab, but your wishlist fuels our search!
            </h3>
          </div>
          <button
            onClick={() =>
              navigate("/influencer/brands_wishlist")
            }
          >
            <CiViewList size={20} /> Add More Brands
          </button>
        </div>
        <div
          style={{ width: "698px" }}
          className="influencer_company_selection_contaniner"
        >
          <div className="influencer_company_selection_row">
            <div
              style={{
                maxWidth: "91px",
                background: "transparent",
                fontSize: "14px",
                color: "var(--Natural-800, #424242)",
              }}
              className="influencer_company_selection_column"
            >
              S.No.
            </div>
            <div
              style={{
                minWidth: "232px",
                background: "transparent",
                fontSize: "14px",
                color: "var(--Natural-800, #424242)",
              }}
              className="influencer_company_selection_column"
            >
              Company Name
            </div>
            <div
              style={{
                minWidth: "232px",
                background: "transparent",
                fontSize: "14px",
                color: "var(--Natural-800, #424242)",
              }}
              className="influencer_company_selection_column"
            >
              Company Website URL
            </div>
          </div>
          {data?.map((item, i) => (
            <>
              <div key={i} className="influencer_company_selection_row">
                <div
                  style={{ maxWidth: "91px" }}
                  className="influencer_company_selection_column"
                >
                  {i + 1}
                </div>
                <div
                  style={{ minWidth: "232px" }}
                  className="influencer_company_selection_column"
                >
                  {item.companyName}
                </div>
                <div
                  style={{ minWidth: "232px" }}
                  className="influencer_company_selection_column"
                >
                  {item.companyUrl}
                </div>
              </div>
            </>
          ))}
        </div>
        <div className="influencer_company_submit_button">
          <button
            onClick={() =>
              navigate("/influencer/brands_wishlist")
            }
          >
            <BsFillPlusSquareFill size={18}/> Add Another Brand
          </button>
        </div>
      </div>
    </div>
  );
};