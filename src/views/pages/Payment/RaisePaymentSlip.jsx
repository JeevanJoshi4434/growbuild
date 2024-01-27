import React from "react";
import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import userImg from '../../../layouts/components/utils/logo.jpeg';
import InstallmentPDF from "./InstallmentPDF";
import { ChevronLeft, ChevronRight } from "react-feather";
const PaymentAll = () => {
  const [pageData, setpageData] = useState({
    loading: false,
    total: [],
  });
  const [curTab, setCurTab] = useState(0);
  const [total, setTotal] = useState(null);
  const [info, setInfo] = useState({
    project: "", building: ""
  })
  const handlePrint = () => {
    window.print();
  };
  const location = useLocation();

  // Parse the query parameters from the location object
  const queryParams = new URLSearchParams(location.search);

  // Get the values of 'building' and 'id' parameters
  const building = queryParams.get("building");
  const id = queryParams.get("project");
  console.log({ us: building, ID: id });
  const getData = async () => {
    const res = await axios.get(
      `https://growbuild-jg.onrender.com/api/get/all/pendingdemand?project=${id}&&building=${building}`
    );
    if (res.status === 200) {
      let data = res.data;
      if (data.length > 0 && data.dataArray.length > 0) {
        let filteredData = data.dataArray.filter((i) => {
          if (i.pendingDemands.length !== 0) return i;
        })
        setInfo({ ...info, project: data.profile.project, building: data.profile.building });
        setTotal(filteredData);
      } else {
        setTotal([]);
        setInfo({ ...info, project: "", building: "" });
      }
    }
    setpageData({ ...pageData, loading: false });
  };
  useEffect(() => {
    getData();
  }, []);




  if (!pageData.loading && total !== null)
    return (
      <>
        <div className="container my-3">
          <div className="row">
            {/* <div className="col-12">
              <button
                onClick={handlePrint}
                className="btn btn-primary btn-md my-2 float-end"
              >
                Print Now
              </button>
            </div> */}
            <div className="col-12">
              <img
                src={userImg}
                alt="logo"
                className="img-fluid "
              />

              <h3 className="text-center">All Installment Slips</h3>
              <hr />
              <h4 className="text-end">
                Project Name - {info.project}
              </h4>
              <h4 className="text-end mb-2">
                Building Name - {info.building}
              </h4>
            </div>
          </div>
          <div>
            <ChevronLeft onClick={() => curTab!= 0 && setCurTab(curTab - 1)} className={`${curTab != 0 ? `primary` : ``}`} />
            <span className="mx-2"></span>
            <ChevronRight onClick={() =>curTab!= (total.length-1) && setCurTab(curTab + 1)} className={`${curTab != (total.length-1) ? `primary` : ``}`} />
          </div>
          {
            total.length > 0 && total.map((i,j)=>{
              if(curTab===j){
                return <InstallmentPDF data={i} project={info.project} building={info.building} />;
              }
            })
          }
        </div>
      </>
    );
  else if (!pageData.loading && total !== null) {
    return (
      <>
        <div
          style={{ flexDirection: "column" }}
          className="d-flex flex-col align-items-start justify-content-start"
        >
          <h1>No Data Found</h1>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          style={{ flexDirection: "column" }}
          className="d-flex flex-col align-items-start justify-content-start"
        >
          <h1>Loading...</h1>
        </div>
      </>
    );
  }
};

export default PaymentAll;

