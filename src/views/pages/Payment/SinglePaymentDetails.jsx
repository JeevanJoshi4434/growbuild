import React from "react";
import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./print.css";

import userImg from "../../../layouts/components/utils/logo.jpeg";
const SinglePaymentDetails = () => {
  const [pageData, setpageData] = useState({
    loading: true,
    total: [],
  });
  const handlePrint = () => {
    window.print();
  };
  const [data, setData] = useState();
  const location = useLocation();

  // Parse the query parameters from the location object
  const queryParams = new URLSearchParams(location.search);

  // Get the values of 'user' and 'id' parameters
  const user = queryParams.get("building");
  const id = queryParams.get("unit");
  console.log({ us: user, ID: id });
  const getData = async () => {
    const res = await axios.get(
      `https://growbuild-jg.onrender.com/api/get/all/payment/single/${user}/${id}`
    );
    if (res.status === 200) {
      setData(res.data);
      console.log(res.data);
    }
    setpageData({ ...pageData, loading: false });
  };
  useEffect(() => {
    getData();
  }, []);
  const getTotalPrice = () => {
    let price = data?.booking?.booking_price;
    for (let i = 0; i < data?.PaymentTotal?.length; i++) {
      price = price + data?.PaymentTotal[i]?.payment_receive;
    }
    return price;
  };
  if (!pageData.loading && data !== null)
    return (
      <>
        <div className="container my-3 px-3 py-3 shadow">
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
              <img src={userImg} alt="logo" className="img-fluid " />
              <h3 className="text-center">Payment Details</h3>
              <hr />
            </div>
          </div>
          <div id="print-content" className="bg-white p-3">
            <div className="row">
              <div className="col-6 col-md-6 text-left">
                <h5>{data.profile.building.buildingName}</h5>
                <h5>Mrs. {data.booking.first_applicant_name}</h5>
                <h5>{data.booking.first_applicant_permanentAddress}</h5>
                <h5>
                  {data.booking.floor},{data.profile.unitDetails.unit_name}
                </h5>
                <p>Area: {data.profile.unitDetails.total_area_this_unit}</p>
                <p>Rate: {data.profile.unitDetails.price}</p>
                <p>Booking Date: {data.booking.booking_date}</p>
              </div>
              <div className="col-6 col-md-6 text-left">
                <p>
                  Unit Cost Rs. :{" "}
                  {data.profile.unitDetails.totalPrice.toFixed(2)}
                </p>
                <p>Total Cost Rs. : {data.booking.totalAmount.toFixed(2)}</p>
                <p>Total Cost Paid Rs. : {getTotalPrice()}</p>
                <p>
                  Unit Balance Rs. :{" "}
                  {data.booking.totalAmount.toFixed(2) - getTotalPrice()}
                </p>
              </div>
            </div>
            <span
              className="d-flex w-100 my-2"
              style={{ height: "1px", width: "100%", backgroundColor: "black" }}
            ></span>
            <table className="table-hover table">
              <thead className="table-border">
                <tr>
                  <th>Sno.</th>
                  <th>Stage Name</th>
                  <th>Amount Rate (%)</th>
                </tr>
              </thead>
              <tbody>
                {data.dataArray.map((i, j) => (
                  <tr className="my-2">
                    <td>{j + 1}</td>
                    <td>{i.name}</td>
                    <td>{i.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table> 
            <h5 className="my-2">Extra Facilities</h5>
            <table className="table-hover table">
              <thead className="table-border">
                <tr>
                  <th>Sno.</th>
                  <th>Name</th>
                  <th>Provider</th>
                  <th>SGST</th>
                  <th>CGST</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {data.booking.extra_facility.map((i, j) => (
                  <tr className="my-2">
                    <td>{j + 1}</td>
                    <td>{i.extra_facility}</td>
                    <td>{i.name}</td>
                    <td>{i.sgst}</td>
                    <td>{i.cgst}</td>
                    <td>{i.totalPrice.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <hr />
            <table className="table table-hover mt-3">
              <thead className="table-dark">
                <tr>
                  <th>Sno.</th>
                  <th>Pay Head Amt</th>
                  <th>Chq/DD/RTGS/ NEFT No.</th>
                  <th>Chq Amt(Rs.)</th>
                  <th>balance</th>
                </tr>
              </thead>
              <tbody>
                <tr className="my-2">
                  <td>1</td>
                  <td>{data.booking.totalAmount.toFixed(2)}</td>
                  <td>--</td>
                  <td>{data.booking.booking_price.toFixed(2)}</td>
                  <td>
                    {(
                      data.booking.totalAmount - data.booking.bookingPrice
                    ).toFixed(2)}
                  </td>
                </tr>
                {data.PaymentTotal.map((i, j) => (
                  <tr className="my-2">
                    <td>{j + 2}</td>
                    <td className="my-1">
                      {(
                        parseFloat(i.payment_receive) + parseFloat(i.balance)
                      ).toFixed(2)}
                    </td>
                    <td>{i.payment_type}</td>
                    <td>{i.payment_receive}</td>
                    <td>{i.balance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  else if (!pageData.loading && data !== null) {
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

export default SinglePaymentDetails;
