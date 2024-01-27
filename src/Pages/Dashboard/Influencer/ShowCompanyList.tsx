import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CompanyList.css";
import { CiViewList } from "react-icons/ci";
import { BsFillPlusSquareFill } from "react-icons/bs";

export const Show_Company_List = () => {
  const navigate = useNavigate();
  const [companylist, setCompanyList] = useState([
    { Cname: "company name", CUrl: "htps://url.xom" },
  ]);

  return (
    <div className="influencer_company_list_container">
      <div className="influence_copmany_list_wrapper">
        <div className="influence_copmany_list_header">
          <div className="influence_copmany_list_header_heading">
            <h1>
              list of company that you want to collaborate for influencer
              marketing
            </h1>
            <h3>
              It’s just a Wishlist of you that you want to collaborate but we
              don’t promise that you will get brand deals from us but we will
              try our best for the same
            </h3>
          </div>
          <button
            onClick={() =>
              navigate("/influencer/Preferred_Companies_List_edit")
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
          {companylist.map((item, i) => (
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
                  {item.Cname}
                </div>
                <div
                  style={{ minWidth: "232px" }}
                  className="influencer_company_selection_column"
                >
                  {item.CUrl}
                </div>
              </div>
            </>
          ))}
        </div>
        <div className="influencer_company_submit_button">
          <button
            onClick={() =>
              navigate("/influencer/Preferred_Companies_List_edit")
            }
          >
            <BsFillPlusSquareFill size={18}/> Add Another Brand
          </button>
        </div>
      </div>
    </div>
  );
};
