import React from "react";
import { useState } from "react";
import "./CompanyList.css";
import { CiViewList } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

export const TextContainter_1 = (props: {
  handleChange: any;
  text: any;
  placeholder: string | undefined;
}) => {
  const [value, setValue] = useState(props?.text);

  return (
    <div className="component_text_container">
      <input
        type="text"
        value={value}
        placeholder={props.placeholder}
        onChange={(e) => {
          setValue(e.target.value);
          props.handleChange(e.target.value);
        }}
      />
    </div>
  );
};

export const Company_list = () => {
  const navigate = useNavigate();
  const [companylist, setCompanyList] = useState([{ Cname: "", CUrl: "" }]);

  const addCompanylist = () => {
    setCompanyList([...companylist, { Cname: "", CUrl: "" }]);
  };

  const handleChange = (value: any, index: number) => {
    setCompanyList((prevList) => {
      const newList = [...prevList];
      newList[index] = { ...newList[index], Cname: value };
      return newList;
    });
  };

  const handleUrlChange = (value: any, index: string | number) => {
    setCompanyList((prevList) => {
      const newList = [...prevList];
      newList[index] = { ...newList[index], CUrl: value };
      return newList;
    });
  };
  const handleSubmit = () => {
    console.log(companylist);
    console.log("submitted");
  };

  return (
    <div className="influencer_company_list_container">
      <div className="influence_copmany_list_wrapper">
        <div className="influence_copmany_list_header">
          <div className="influence_copmany_list_header_heading">
            <h1>
              Share the list of company that you want to collaborate for
              influencer marketing
            </h1>
            <h3>
              It’s just a Wishlist of you that you want to collaborate but we
              don’t promise that you will get brand deals from us but we will
              try our best for the same
            </h3>
          </div>
          <button
            onClick={() =>
              navigate("/influencer/Preferred_Companies_List_view")
            }
          >
            <CiViewList size={20} /> View Brand List
          </button>
        </div>
        <div className="influencer_company_selection_contaniner">
          {companylist.map((item, i) => (
            <>
              <div key={i} className="influencer_company_selection_row">
                <TextContainter_1
                  handleChange={(value: any) => handleChange(value, i)}
                  text={item.Cname}
                  placeholder={"Company Name"}
                />
                <TextContainter_1
                  handleChange={(value: any) => handleUrlChange(value, i)}
                  text={item.CUrl}
                  placeholder={"Company Website URL"}
                />
              </div>
            </>
          ))}

          <button
            onClick={addCompanylist}
            className="influencer_company_selection_button"
          >
            + Add More Company
          </button>
        </div>
        <div className="influencer_company_submit_button">
          <button onClick={handleSubmit}>Submit →</button>
        </div>
      </div>
    </div>
  );
};
