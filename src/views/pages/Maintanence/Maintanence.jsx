import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from 'react-router-dom';

const renderOptions = (n) => {
  const options = [];

  for (let i = 1; i <= n; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return options;
};

const Maintanence = () => {
  const [getInfo, setGetInfo] = useState(null);
  const [info, setInfo] = useState(false);
  const [allUnits, setAllUnits] = useState(null);
  const [CreateFlat, setCreateFlat] = useState({
    price: null, owner: null, floor: null, building: null, unit: null, flat: null, allotmentDate: null, parking: null, id: null, bookingDate: null, agreementDate: null, phoneNo: null, BookingId: null, addPayment: 0.00
  });
  const [allBuilding, setAllBuilding] = useState(null);
  const [Building, setBuilding] = useState(null);
  const [MaintenanceData, setMaintenanceData] = useState([]);
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setCreateFlat({ ...CreateFlat, [name]: value });
  }
  const [AllProjects, setAllProjects] = useState(null);
  const getProject = async () => {
    const res = await axios.get(process.env.REACT_APP_PORT + '/api/all/project', {
      Headers: {
        'Content-Type': 'application/json'
      }
    })
    setAllProjects(res.data);
  }
  var history = useHistory();
  useEffect(() => {
    getProject();
  }, []);
  const getBuildings = async (id) => {
    if ((id?.length === 24 || id?.length === 12) && id !== "Select Project") {
      const res = await axios.get(`${process.env.REACT_APP_PORT}/api/buildings/${id}`, {
        Headers: {
          'Content-Type': 'application/json'
        }
      }
      );
      setAllBuilding(res.data);
    }
  }
  const getUnits = async (id, project) => {
    if ((id?.length === 24 || id?.length === 12) && (project?.length === 24 || project?.length === 12)) {
      const res = await axios.get(`${process.env.REACT_APP_PORT}/api/find/unit/${id}/${project}`, {
        Headers: {
          'Content-Type': 'application/json'
        }
      }
      );
      setAllUnits(res.data);
    }
  }
  const getBuildingDetail = async (id) => {
    if ((id?.length === 24 || id?.length === 12)) {
      const res = await axios.get(`${process.env.REACT_APP_PORT}/api/building/${id}`, {
        Headers: {
          'Content-Type': 'application/json'
        }
      }
      );
      setBuilding(res.data);
    }
  }

  const getDetails = async (building, project, unit) => {
    if ((building.length === 12 || building.length === 24) && (project.length === 12 || project.length === 24) && (unit.length === 12 || unit.length === 24)) {
      const res = await axios.get(`${process.env.REACT_APP_PORT}/api/${building}/${project}/${unit}`, {
        Headers: {
          'Content-Type': 'application/json'
        }
      })
      if (res.status === 201) {
        setInfo(false);
        setCreateFlat({ ...CreateFlat, price: 0, owner: "No Record Found!", floor: CreateFlat.floor, building: CreateFlat.building, unit: CreateFlat.unit, allotmentDate: null, parking: 0, id: CreateFlat.id, bookingDate: null, agreementDate: null });

      }
      else if (res.status === 200) {
        setInfo(true);
        setGetInfo(res.data);
        console.log(res.data);
        let data = res.data;
        setCreateFlat({ ...CreateFlat, price: data?.booking.booking_price, owner: data?.booking.first_applicant_name, floor: CreateFlat.floor, building: CreateFlat.building, unit: CreateFlat.unit, allotmentDate: data?.booking.allotment_date, parking: data?.booking.parking, id: CreateFlat.id, bookingDate: data?.booking.booking_date, agreementDate: data?.booking.agreement_date, phoneNo: data?.booking.first_applicant_contactNumber, BookingId: data?.booking._id })
        await getData();
      }
    }
  }
  const getData = async () => {
    const res = await axios.get(process.env.REACT_APP_PORT + `/api/get/maintenance?projectId=${CreateFlat.Project}&buildingId=${CreateFlat.building}&unitId=${CreateFlat.unit}`)
    setMaintenanceData(res.data);
  }

  const UpdatePaymentStatus = async () => {
    if (MaintenanceData.length < 0 || CreateFlat.addPayment <= 0.00) {
      return;
    }
    const res = await axios.post(process.env.REACT_APP_PORT + `/api/pay/maintenance`, {
      paid: CreateFlat.addPayment, total: MaintenanceData[MaintenanceData.length - 1]?.MaintenanceCharges, bookingId: CreateFlat.BookingId
    })
    if (res.status === 200) {
      toast.success("Payment Added", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      await getData();
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="container bg-white p-2 rounded-2">
        <form className="row px-4 py-4 mx-2 my-2 justify-content-center shadow-lg">
          <h3 className="text-alternate text-primary">
            Collect Maintenance Payment
          </h3>
          <hr />
          <div className="col-md-6 col-12 mb-2">
            <p className="text-alternate">Select Project</p>
            <div className="input-group">
              <select className="form-control" id="project" onChange={(e) => { handleInputs(e); getBuildings(e.target.value); }} name="Project" value={CreateFlat.Project}>
                {AllProjects === null ?
                  <option value={null} name={null}>Loading...</option>
                  : <option value={null} name={null}>Select Project</option>}
                {AllProjects !== null && AllProjects?.length === 0 &&
                  <option value={null} name={null}>No projects Avaliable</option>
                }
                {AllProjects !== null && AllProjects?.length > 0 && AllProjects.map((i) => {
                  return (
                    <option name={i?._id} value={i?._id}>{i?.Name}</option>
                  )
                })
                }
              </select>
            </div>
          </div>
          <div className="col-md-6 col-12 mb-2">
            <p className="text-alternate">Select Building</p>
            <div className="input-group">
              <select className="form-control" id="building" name="building" onChange={(e) => { handleInputs(e); getBuildingDetail(e.target.value); getUnits(e.target.value, CreateFlat?.Project); }} value={CreateFlat.building} >
                {CreateFlat.Project === null ? <option value={null} name={null} >First select Project</option>
                  : <>
                    {allBuilding === null && <option value={null} name={null} >Loading...</option>}
                    {allBuilding !== null && allBuilding?.length === 0 && <option value={null} name={null} >No Building Avaliable</option>}
                  </>
                }
                {allBuilding?.length > 0 &&
                  <>
                    <option value={null} name={null} >Select Building</option>
                    {
                      allBuilding?.map((i) => {
                        return (
                          <>
                            <option value={i?._id} name={i?._id}>{i?.buildingName}</option>
                          </>
                        )
                      })
                    }
                  </>
                }
              </select>
            </div>
          </div>
          <div className="col-md-4 col-12 mb-2">
            <p className="text-alternate">Select Floor</p>
            <div className="input-group">
              <select className="form-control" id="floor" name="floor" onChange={(e) => { handleInputs(e); }} value={CreateFlat.floor}>
                {Building === null ?
                  <option value={null} name={null}>Loading...</option>
                  : <option value={null} name={null}>Select Floor</option>}
                {Building !== null && Building?.total_number_of_floors === 0 &&
                  <option value={null} name={null}>No Floor Avaliable</option>
                }
                {
                  Building !== null &&
                  Building?.total_number_of_floors > 0 &&
                  renderOptions(Building?.total_number_of_floors)
                }
              </select>
            </div>
          </div>
          <div className="col-md-4 col-12 mb-2">
            <p className="text-alternate">Select Unit</p>
            <div className="input-group">
              <select className="form-control" id="unit" name="unit" onChange={(e) => { handleInputs(e); }} value={CreateFlat.unit}>
                {CreateFlat.Project === null && CreateFlat.building === null && <option value={null} name={null}>Select Project</option>}
                {CreateFlat.building === null && CreateFlat.Project !== null && <option value={null} name={null}>Select Building</option>}
                {CreateFlat.building !== null && CreateFlat.Project !== null && allUnits === null && <option value={null} name={null}>Loading...</option>}
                {allUnits !== null &&
                  <>
                    {allUnits.length === 0
                      ? <option value={null} name={null}>No Units Avaliable.</option>
                      : <option value={null} name={null}>Select Unit</option>

                    }
                    {allUnits.length > 0 && allUnits.map((i) => {
                      let s = "";
                      s = i.unit_name;
                      s = s.slice(0, 1);
                      if (s === CreateFlat.floor) {
                        return (
                          <option value={i?._id} name={i?._id}>
                            {i?.unit_name}
                          </option>
                        );
                      }
                    })}
                  </>
                }
              </select>
            </div>
          </div>
          <div className="col-md-4 col-12 mb-2">
            <p className="text-alternate">Fetch Data</p>
            <button onClick={() => getDetails(CreateFlat.building, CreateFlat.Project, CreateFlat.unit)} type="button" className="btn btn-primary ">
              View Details
            </button>
          </div>
          <div className="col-md-6 col-12 mb-2">
            <p className="text-alternate">Owner Name</p>
            <div className="input-group">
              <input
                type="text"
                aria-label="ownerName"
                placeholder="Select Flat first"
                readonly
                value={CreateFlat?.owner}
                name="owner"
                className="form-control"
              />
            </div>
          </div>
          <div className="col-md-6 col-12 mb-2">
            <p className="text-alternate">Owner Phone No</p>
            <div className="input-group">
              <input
                type="text"
                aria-label="ownerPhone"
                placeholder="Select Flat first"
                readonly
                name="phone"
                className="form-control"
                value={CreateFlat?.phoneNo}
              />
            </div>
          </div>
          <div className="col-md-3 col-12 mb-2">
            <p className="text-alternate">Total Maintenance Amount</p>
            <div className="input-group">
              <input
                type="text"
                aria-label="MaintenanceAmount"
                placeholder="Select Flat first"
                readonly
                name="MaintenanceAmount"
                className="form-control"
                value={MaintenanceData.length > 0 ? parseFloat(MaintenanceData[0]?.MaintenanceCharges) : 0.00}
              />
            </div>
          </div>
          <div className="col-md-3 col-12 mb-2">
            <p className="text-alternate">Payment Due</p>
            <div className="input-group">
              <input
                type="number"
                aria-label="due"
                placeholder="Select Flat first"
                readonly
                name="due"
                className="form-control"
                value={MaintenanceData.length > 0 ? parseFloat(MaintenanceData[MaintenanceData.length - 1]?.MaintenanceCharges) : 0.00}
              />
            </div>
          </div>
          <div className="col-md-3 col-12 mb-2">
            <p className="text-alternate">Add Payment</p>
            <div className="input-group">
              <input
                type="number"
                aria-label="addPayment"
                placeholder="Select Flat first"
                readonly
                name="addPayment"
                className="form-control"
                value={CreateFlat?.addPayment}
                onChange={handleInputs}
              />
            </div>
          </div>
          <div className="col-md-3 col-12 mb-2">
            <p className="text-alternate">Add Payment</p>
            <button onClick={UpdatePaymentStatus} type="button" className="btn btn-primary ">
              Add Payment
            </button>
          </div>
        </form>
        <div className="row">
          <div className="col-12">
            <div className="table-responsive bg-white py-4 px-3 my-2 justify-content-center shadow-lg">
              <table
                id="maintanence"
                className="table table-striped table-bordered"
              >
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Total Amount</th>
                    <th>Paid Amount</th>
                    <th>Payment Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {MaintenanceData.length > 0 ? MaintenanceData.map((data, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{data?.MaintenanceCharges}</td>
                      <td>{data?.paid}</td>
                      <td>{data?.paymentDate}</td>
                      <td>
                        <button type="button" class="btn btn-primary">
                          Print
                        </button>
                      </td>
                    </tr>
                  ))
                    :
                    <tr>
                      <td>Loading...</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Maintanence;
