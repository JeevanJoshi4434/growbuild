import React from "react";
import { useState } from "react";
import axios from "axios";
import { useLocation,Link } from "react-router-dom";
import { useEffect } from "react";

import userImg from '../../../layouts/components/utils/logo.jpeg';
const BookingDetails = () => {
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
      const building = queryParams.get("building");
      const project = queryParams.get("project");
      const getData = async () => {
        let url = `https://growbuild-jg.onrender.com/api/get/all/demand/booking/detail?building=${building}&&project=${project}&&single=false`; 
        const res = await axios.get(
          url
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
                </div>
              </div>
              <div id="print-content" className="table-responsive px-3 py-3 shadow">
                <table className="table table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>Owner</th>
                      <th>Project</th>
                      <th>Building</th>
                      <th>Unit</th>
                      <th>Floor</th>
                      <th>Amount</th>
                      <th>Pending</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                        total.map((i)=>{
                            return(
                                <tr>
                                    <td>{i.detail.first_applicant_name}</td>
                                    <td>{i.project}</td>
                                    <td>{i.building}</td>
                                    <td>{i.unit}</td>
                                    <td>{i.detail.floor}</td>
                                    <td>{i.detail.totalAmount}</td>
                                    <td>{i.detail.pending}</td>
                                    <td><Link to={`/view/booking/details?unit=${i.detail.unit}&&single=true`}><button className="btn btn-primary mx-1 my-1">View</button></Link></td>
                                </tr>
                            )
                        })
                    }
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
}

export default BookingDetails