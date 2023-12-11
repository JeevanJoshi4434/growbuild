import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import userImg from '../../../layouts/components/utils/logo.jpeg';
const PaymentPending = () => {
    const [pageData, setpageData] = useState({
        loading: true, total: []
    });
    const [due, setTotal] = useState(null);
    const handlePrint = () => {

        window.print();
    };
    const location = useLocation();

    // Parse the query parameters from the location object
    const queryParams = new URLSearchParams(location.search);

    // Get the values of 'user' and 'id' parameters
    const user = queryParams.get('unit');
    const id = queryParams.get('building');
    console.log({ us: user, ID: id });
    const getData = async () => {
        const res = await axios.get(`https://growbuild-jg.onrender.com/api/get/all/payment/due/${id}/${user}`);
        if (res.status === 200) {
            setTotal(res.data);
            console.log(res.data);
        }
        setpageData({ ...pageData, loading: false });
    }
    useEffect(() => {
        getData();
    }, [])

    if (!pageData.loading && due != null) {
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
                  <h3 className='text-end'>Project - {due.profile.project}</h3>
                  <h3 className='text-end'>Building - {due.profile.building}</h3>
                  <h3 className='text-end'>Unit - {due.profile.unit}</h3>
                  <hr />
                </div>
              </div>
              <div id="print-content" className="p-3 bg-white my-3 shadow">
                <table className="table table-hover mt-3">
                  <thead className="table-dark">
                    <tr>
                      <th>SNo.</th>
                      <th>Name</th>
                      <th>Unit</th>
                      <th>Building</th>
                      <th>Amount Rate (%)</th>
                      <th>total Rate (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {due.dataArray.map((i, j) => (
                      <tr>
                        <td>{j + 1}</td>
                        <td>{i.name}</td>
                        <td>{due.profile.unit}</td>
                        <td>{due.profile.building}</td>
                        <td>{i.amount}</td>
                        <td>{due.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        );
    }
    else if (!pageData.loading && due !== null) {
        return (
            <>
                <div style={{ flexDirection: 'column' }} className='d-flex flex-col align-items-start justify-content-start'>
                    <h1>No Data Found</h1>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div style={{ flexDirection: 'column' }} className='d-flex flex-col align-items-start justify-content-start'>

                    <h1>Loading...</h1>
                </div>
            </>
        )
    }
}

export default PaymentPending