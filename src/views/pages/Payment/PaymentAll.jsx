import React from "react";
import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import userImg from '../../../layouts/components/utils/logo.jpeg';
const PaymentAll = () => {
  const [pageData, setpageData] = useState({
    loading: true,
    total: [],
  });
  const [total, setTotal] = useState(null);
  const handlePrint = () => {
    window.print();
  };
  const location = useLocation();

  // Parse the query parameters from the location object
  const queryParams = new URLSearchParams(location.search);

  // Get the values of 'user' and 'id' parameters
  const user = queryParams.get("building");
  const id = queryParams.get("project");
  console.log({ us: user, ID: id });
  const getData = async () => {
    const res = await axios.get(
      `https://growbuild-jg.onrender.com/api/get/payment/detail/${id}/${user}`
    );
    if (res.status === 200) {
      setTotal(res.data);
      console.log(res.data);
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
            <div className="col-12">
              <button
                onClick={handlePrint}
                className="btn btn-primary btn-md my-2 float-end"
              >
                Print Now
              </button>
            </div>
            <div className="col-12">
              <img
                src={userImg}
                alt="logo"
                className="img-fluid "
              />

              <h3 className="text-center">All Payment Details</h3>
              <hr />
              <h4 className="text-end">
                Project Name - {total.profile.project}
              </h4>
              <h4 className="text-end mb-2">
                Building Name - {total.profile.building}
              </h4>
            </div>
          </div>
          <div id="print-content" className="table-responsive px-3 py-3 shadow">
            <table className="table table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Owner</th>
                  <th>Unit</th>
                  <th>Floor</th>
                  <th>Amount</th>
                  <th>Payment Mode</th>
                  <th>balance</th>
                </tr>
              </thead>
              <tbody>
                {total.dataArray.map((i) => (
                  <tr>
                    <td>{i.name}</td>
                    <td>{i.unit}</td>
                    <td>{i?.unit?.slice(0, 1)}</td>
                    <td>{i.amount}</td>
                    <td>{i.mode}</td>
                    <td>{i.balance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
