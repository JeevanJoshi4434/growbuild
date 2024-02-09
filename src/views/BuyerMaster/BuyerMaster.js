import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Trash } from 'react-feather';
import swal from 'sweetalert';
import { Badge, CardBody, CardHeader } from 'reactstrap';
import DataTable from 'react-data-table-component';
import * as Icon from 'react-feather';
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

const renderFlat = (n) => {
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

const BuyerMaster = () => {
  const [buyerMaster, setBuyerMaster] = useState({
    Project: null, Building: null, floor: null, unit: null, secondfloor: null, flat: null, parking: null, booking_price: null, booking_date: null, allotment_date: null, agreement_date: null, Owner_name: null, payment_stage: null, price: null, payment_receive: null, payment_type: null, check_number: null, date: null, bank_name: null, branch_name: null, bank_account: null, card_number: null, id: null,price_with_tax: null,balance:null
  });


  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setBuyerMaster({ ...buyerMaster, [name]: value });
    console.log({ data: buyerMaster });
  }

  const [allUnits, setAllUnits] = useState(null);
  const [allBuilding, setAllBuilding] = useState(null);
  const [Building, setBuilding] = useState(null);
  const [AllProjects, setAllProjects] = useState(null);
  const [dataState, setDataState] = useState({
    columns: [
      {
        name: "Payment Plan",
        selector: "payment_plan",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            <div className="user-img ml-xl-0 ml-2">
            </div>
            <div className="user-info text-truncate ml-xl-50 ml-0">
              <span
                title={row.stage_name}
                className="d-block text-bold-500 text-truncate mb-0"
              >
                {row.stage_name}
              </span>
            </div>
          </div>
        ),
      },
      {
        name: "Demand Rate(%)",
        selector: "demand_rate",
        sortable: true,
        cell: (row) => (
          <p className="text-bold-500 text-truncate mb-0">{row.amount}%</p>
        ),
      },
      {
        name: "Status",
        selector: "Status",
        sortable: true,
        cell: (row) => (
          <Badge
            color={row.Status === "pending" ? "light-danger" : "light-success"}
            pill
          >
            {row.Status}
          </Badge>
        ),
      },
      
    ],
    data: [
    ],
    filteredData: [],
    value: "",
    buildingId: null,
    projectId:null
  })
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

  const uploadBuyermaster = async () => {
    const res = await axios.post(`${process.env.REACT_APP_PORT}/api/create/buyermaster`, {
      Project: buyerMaster?.Project,
      Building: buyerMaster?.Building,
      floor: buyerMaster?.floor,
      unit: buyerMaster?.unit,
      secondfloor: buyerMaster?.secondfloor,
      flat: buyerMaster?.flat,
      parking: buyerMaster?.parking,
      booking_price: buyerMaster?.booking_price,
      booking_date: buyerMaster?.booking_date,
      allotment_date: buyerMaster?.allotment_date,
      agreement_date: buyerMaster?.agreement_date,
      Owner_name: buyerMaster?.Owner_name,
      payment_stage: buyerMaster?.payment_stage,
      price: buyerMaster?.price,
      payment_receive: buyerMaster?.payment_receive,
      payment_type: buyerMaster?.payment_type,
      check_number: buyerMaster?.check_number,
      date: buyerMaster?.date,
      bank_name: buyerMaster?.bank_name,
      branch_name: buyerMaster?.branch_name,
      bank_account: buyerMaster?.bank_account,
      card_number: buyerMaster?.card_number,
      price_with_tax: buyerMaster?.price_with_tax,
      balance:buyerMaster.balance
    })
    if (res.status === 200) {
      window.alert('Updated Successfully!');
      window.location.reload();
    } else {
      window.alert('Something Error Happened!');
    }
  }
  const [AllStage, setAllStage] = useState(null);
  const getStage = async (building, project) => {
    if ((building?.length === 12 || building?.length === 24) && (project?.length === 12 || project?.length === 24)) {
      const res = await axios.get(`${process.env.REACT_APP_PORT}/api/demand/${building}/${project}`, {
        Headers: {
          'contnt-type': 'application/json'
        }
      })
      if (res.status === 200) {
        setAllStage(res.data);
        console.log(res.data);
      }
    }
  }
  const [buyerDetail, setBuyerDetail] = useState([]);
  const getBuyerDetail = async (building, project, unit, flat, floor) => {
    if ((building?.length === 12 || building?.length === 24) && (project?.length === 12 || project?.length === 24) && (unit?.length === 12 || unit?.length === 24) && (flat !== 0 || flat !== null) && (floor !== 0 || floor !== null)) {
      const res = await axios.get(`${process.env.REACT_APP_PORT}/api/${building}/${project}/${unit}`, {
        Headers: {
          'Content-Type': 'application/json'
        }
      })
      if (res.status === 200) {
        let data = res.data;
        setBuyerMaster({
          ...buyerMaster,
          Project: buyerMaster?.Project,
          Building: buyerMaster?.Building,
          floor: buyerMaster?.floor,
          unit: buyerMaster?.unit,
          secondfloor: buyerMaster?.secondfloor,
          flat: buyerMaster?.flat,
          parking: buyerMaster?.parking,
          booking_price: data?.booking?.booking_price,
          booking_date: buyerMaster?.booking_date,
          allotment_date: buyerMaster?.allotment_date,
          agreement_date: buyerMaster?.agreement_date,
          Owner_name: data?.booking.first_applicant_name,
          payment_stage: buyerMaster?.payment_stage,
          price: buyerMaster?.price,
          payment_receive: buyerMaster?.payment_receive,
          payment_type: buyerMaster?.payment_type,
          check_number: buyerMaster?.check_number,
          date: buyerMaster?.date,
          bank_name: buyerMaster?.bank_name,
          branch_name: buyerMaster?.branch_name,
          bank_account: buyerMaster?.bank_account,
          card_number: buyerMaster?.card_number,
          price_with_tax: buyerMaster?.price_with_tax,
          balance:data?.pending
        })
        setBuyerDetail(data?.booking);
        setDataState({...dataState, data: data?.demand});
      }
    }
  }
  const [Demand, setDemand] = useState(null);
  const getDemand = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_PORT}/api/get/demand/${id}`, {
      Headers: {
        'Content-Type': 'application/json'
      }
    })
    if (res.status === 200) {
      setDemand(res.data);
      let data = res.data;
      setBuyerMaster({
        ...buyerMaster,
        Project: buyerMaster?.Project,
        Building: buyerMaster?.Building,
        floor: buyerMaster?.floor,
        unit: buyerMaster?.unit,
        secondfloor: buyerMaster?.secondfloor,
        flat: buyerMaster?.flat,
        parking: buyerMaster?.parking,
        booking_price: buyerMaster?.booking_price,
        booking_date: buyerMaster?.booking_date,
        allotment_date: buyerMaster?.allotment_date,
        agreement_date: buyerMaster?.agreement_date,
        Owner_name: buyerMaster?.Owner_name,
        payment_stage: buyerMaster?.payment_stage,
        price: data?.amount,
        payment_receive: buyerMaster?.payment_receive,
        payment_type: buyerMaster?.payment_type,
        check_number: buyerMaster?.check_number,
        date: buyerMaster?.date,
        bank_name: buyerMaster?.bank_name,
        branch_name: buyerMaster?.branch_name,
        bank_account: buyerMaster?.bank_account,
        card_number: buyerMaster?.card_number,
        price_with_tax: buyerMaster?.price_with_tax
      })
    }
  }

  const fetchOwner = async (e) => {
    getDemand(e);
  }
  const fetchDetail = () => {
      getBuyerDetail(buyerMaster.Building, buyerMaster.Project, buyerMaster.unit);
    
  }

  const [getData, setGetData] = useState(null);
  const getDataa = async () => {
    const res = await axios.get(`${process.env.REACT_APP_PORT}/api/get/all/buyermaster`, {
      Headers: {
        'Content-Type': 'application/json'
      }
    })
    if (res.status === 200) {
      setGetData(res.data);
      console.log(res.data)
    }
  }
  useEffect(() => {
    getDataa();
  }, [])
  const deletemaster= async(id)=>{
    const willDelete = await swal({
      title: "Are you sure?",
        text: "Are you sure that you want to delete?",
        icon: "warning",
        dangerMode: true,
      });
       
      if (willDelete) {
        const res = await axios.delete(process.env.REACT_APP_PORT + '/api/delete/buyermaster/'+id,{
          Headers: {
            'Content-Type': 'application/json'
          }
        })
        getDataa();
      }
      willDelete();
    }

  return (
    <>
      <div className="container bg-white p-2 rounded-2">
        <form
          className="row px-4 py-4 mx-2 my-2 shadow-lg needs-validation"
          novalidate
        >
          <h3 className="text-alternate text-primary">Payment Master</h3>
          <hr />
          <div className="col-md-6 col-12 mb-2">
            <p className="text-alternate">Select Project</p>
            <div className="input-group">
              <select
                className="form-control"
                id="project"
                onChange={(e) => {
                  handleInputs(e);
                  getBuildings(e.target.value);
                }}
                name="Project"
                value={buyerMaster.Project}
              >
                {AllProjects === null ? (
                  <option value={null} name={null}>
                    Loading...
                  </option>
                ) : (
                  <option value={null} name={null}>
                    Select Project
                  </option>
                )}
                {AllProjects !== null && AllProjects?.length === 0 && (
                  <option value={null} name={null}>
                    No projects Avaliable
                  </option>
                )}
                {AllProjects !== null &&
                  AllProjects?.length > 0 &&
                  AllProjects.map((i) => {
                    return (
                      <option name={i?._id} value={i?._id}>
                        {i?.Name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          <div className="col-md-6 col-12 mb-2">
            <p className="text-alternate">Select Building</p>
            <div className="input-group">
              <select
                className="form-control"
                id="building"
                name="Building"
                onChange={(e) => {
                  handleInputs(e);
                  getBuildingDetail(e.target.value);
                  getUnits(e.target.value, buyerMaster?.Project);
                  getStage(e.target.value, buyerMaster?.Project);
                }}
                value={buyerMaster.Building}
              >
                {buyerMaster.Project === null ? (
                  <option value={null} name={null}>
                    First select Project
                  </option>
                ) : (
                  <>
                    {allBuilding === null && (
                      <option value={null} name={null}>
                        Loading...
                      </option>
                    )}
                    {allBuilding !== null && allBuilding?.length === 0 && (
                      <option value={null} name={null}>
                        No Building Avaliable
                      </option>
                    )}
                  </>
                )}
                {allBuilding?.length > 0 && (
                  <>
                    <option value={null} name={null}>
                      Select Building
                    </option>
                    {allBuilding?.map((i) => {
                      return (
                        <>
                          <option value={i?._id} name={i?._id}>
                            {i?.buildingName}
                          </option>
                        </>
                      );
                    })}
                  </>
                )}
              </select>
            </div>
          </div>
          <div className="col-md-4 col-12 mb-2">
            <p className="text-alternate">Select Floor</p>
            <div className="input-group">
              <select
                className="form-control"
                id="floor"
                name="floor"
                onChange={handleInputs}
                value={buyerMaster.floor}
              >
                {Building === null ? (
                  <option value={null} name={null}>
                    Loading...
                  </option>
                ) : (
                  <option value={null} name={null}>
                    Select Floor
                  </option>
                )}
                {Building !== null && Building?.total_number_of_floors === 0 && (
                  <option value={null} name={null}>
                    No Floor Avaliable
                  </option>
                )}
                {Building !== null &&
                  Building?.total_number_of_floors > 0 &&
                  renderOptions(Building?.total_number_of_floors)}
              </select>
            </div>
          </div>
          <div className="col-md-4 col-12 mb-2">
            <p className="text-alternate">Select Unit</p>
            <div className="input-group">
              <select
                className="form-control"
                id="unit"
                name="unit"
                onChange={handleInputs}
                value={buyerMaster.unit}
              >
                {buyerMaster.Project === null && buyerMaster.Building === null && (
                  <option value={null} name={null}>
                    Select Project First
                  </option>
                )}
                {buyerMaster.Building === null && buyerMaster.Project !== null && (
                  <option value={null} name={null}>
                    Select Building First
                  </option>
                )}
                {buyerMaster.Building !== null &&
                  buyerMaster.Project !== null &&
                  allUnits === null && (
                    <option value={null} name={null}>
                      Loading...
                    </option>
                  )}
                {allUnits !== null && (
                  <>
                    {allUnits.length === 0 ? (
                      <option value={null} name={null}>
                        No Units Avaliable.
                      </option>
                    ) : (
                      <option value={null} name={null}>
                        Select Unit
                      </option>
                    )}
                    {allUnits.length > 0 &&
                      allUnits.map((i) => {
                        let s= "";
                        s=i.unit_name;
                        s=s.slice(0,1);
                        if(s===buyerMaster.floor)
                        {
                          return (
                          <option value={i?._id} name={i?._id}>
                            {i?.unit_name}
                          </option>
                        );
                        }
                      })}
                  </>
                )}
              </select>
            </div>
          </div>
          <div className="col-md-6 col-12 mb-2">
            <p className="text-alternate">Fetch Details</p>
            {buyerMaster?.unit !== null ?
              <button type="button" className="btn btn-primary" onClick={() => fetchDetail(buyerMaster?.payment_stage)}>Fetch Details</button> :
              <button className="btn btn-primary" disabled >Fetch Details</button>}
          </div>
          <div className="col-md-6 col-12 mb-2">
            <p className="text-alternate">Owner Name</p>
            {buyerMaster?.Owner_name !== null ? <p>{buyerMaster?.Owner_name}</p>
              : <p>Loading...</p>}
          </div>
          <div className="col-md-12 col-12 mb-2">
          <DataTableCustom dataState={dataState} setDataState={setDataState} />
          </div>
          <h4 className="text-alternate text-primary">Payment Details</h4>
          <div className="col-md-4 col-12 mb-2">
            <p className="text-alternate">Balance</p>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="balance"
                disabled
                name="balance"
                value={buyerMaster.balance}
                onChange={handleInputs}
              />
            </div>
          </div>
          <div className="col-md-4 col-12 mb-2">
            <p className="text-alternate">Payment Recived (Ammount)</p>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="price"
                name="payment_receive"
                value={buyerMaster.payment_receive}
                onChange={handleInputs}
                required=""
              />
            </div>
          </div>
          <div className="col-md-4  col-12 mb-2">
            <p className="text-alternate">Select Payment Type</p>
            <div className="input-group">
              <select
                className="form-control"
                id="paymentType"
                name="payment_type"
                value={buyerMaster?.payment_type}
                onChange={handleInputs}
              >
                <option value="">Payment Type</option>
                <option value="Cash">Cash</option>
                <option value="Cheque">Cheque</option>
                <option value="DD">DD</option>
                <option value="RTGS">RTGS</option>
                <option value="NEFT">NEFT</option>
                <option value="netBanking">Net Banking</option>
                <option value="creditCard">Credit Card</option>
              </select>
            </div>
          </div>
          <hr />
          {buyerMaster?.payment_type === "Cheque" && <>

            <div className="col-md-4 col-12 mb-2">
              <p className="text-alternate">Cheque No</p>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="chequeNo"
                  name="check_number"
                  value={buyerMaster?.check_number}
                  onChange={handleInputs}
                  required=""
                />
              </div>
            </div>
            <div className="col-md-4 col-12 mb-2">
              <p className="text-alternate">Date</p>
              <div className="input-group">
                <input
                  type="date"
                  className="form-control"
                  id="chequeDate"
                  name="date"
                  value={buyerMaster?.date}
                  onChange={handleInputs}
                  required=""
                />
              </div>
            </div>
            <div className="col-md-4 col-12 mb-2">
              <p className="text-alternate">Bank Name</p>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="bankName"
                  name="bank_name"
                  value={buyerMaster?.bank_name}
                  onChange={handleInputs}
                  required=""
                />
              </div>
            </div>
            <div className="col-md-4 col-12 mb-2">
              <p className="text-alternate">Branch Name</p>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="branchName"
                  name="branch_name"
                  value={buyerMaster?.branch_name}
                  onChange={handleInputs}
                  required=""
                />
              </div>
            </div>
          </>}
          {buyerMaster?.payment_type === "DD" && <>

            <div className="col-md-4 col-12 mb-2">
              <p className="text-alternate">Cheque No</p>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="chequeNo"
                  name="check_number"
                  value={buyerMaster?.check_number}
                  onChange={handleInputs}
                  required=""
                />
              </div>
            </div>
            <div className="col-md-4 col-12 mb-2">
              <p className="text-alternate">Date</p>
              <div className="input-group">
                <input
                  type="date"
                  className="form-control"
                  id="chequeDate"
                  name="date"
                  value={buyerMaster?.date}
                  onChange={handleInputs}
                  required=""
                />
              </div>
            </div>
            <div className="col-md-4 col-12 mb-2">
              <p className="text-alternate">Bank Name</p>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="bankName"
                  name="bank_name"
                  value={buyerMaster?.bank_name}
                  onChange={handleInputs}
                  required=""
                />
              </div>
            </div>
            <div className="col-md-4 col-12 mb-2">
              <p className="text-alternate">Branch Name</p>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="branchName"
                  name="branch_name"
                  value={buyerMaster?.branch_name}
                  onChange={handleInputs}
                  required=""
                />
              </div>
            </div>
          </>}
          {buyerMaster?.payment_type === "NEFT" && <>
            <div className="col-md-4 col-12 mb-2">
              <p className="text-alternate">Date</p>
              <div className="input-group">
                <input
                  type="date"
                  className="form-control"
                  id="chequeDate"
                  name="date"
                  value={buyerMaster?.date}
                  onChange={handleInputs}
                  required=""
                />
              </div>
            </div>
            <div className="col-md-4 col-12 mb-2">
              <p className="text-alternate">Bank Name</p>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="bankName"
                  name="bank_name"
                  value={buyerMaster?.bank_name}
                  onChange={handleInputs}
                  required=""
                />
              </div>
            </div>
            <div className="col-md-4 col-12 mb-2">
              <p className="text-alternate">Branch Name</p>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="branchName"
                  name="branch_name"
                  value={buyerMaster?.branch_name}
                  onChange={handleInputs}
                  required=""
                />
              </div>
            </div>
            <div className="col-md-4 col-12 mb-2">
              <p className="text-alternate">Bank Account</p>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="bankAccount"
                  name="bank_account"
                  value={buyerMaster?.bank_account}
                  onChange={handleInputs}
                  required=""
                />
              </div>
            </div>
          </>}
          {buyerMaster?.payment_type === "RTGS" && <>
            <div className="col-md-4 col-12 mb-2">
              <p className="text-alternate">Date</p>
              <div className="input-group">
                <input
                  type="date"
                  className="form-control"
                  id="chequeDate"
                  name="date"
                  value={buyerMaster?.date}
                  onChange={handleInputs}
                  required=""
                />
              </div>
            </div>
            <div className="col-md-4 col-12 mb-2">
              <p className="text-alternate">Bank Name</p>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="bankName"
                  name="bank_name"
                  value={buyerMaster?.bank_name}
                  onChange={handleInputs}
                  required=""
                />
              </div>
            </div>
            <div className="col-md-4 col-12 mb-2">
              <p className="text-alternate">Branch Name</p>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="branchName"
                  name="branch_name"
                  value={buyerMaster?.branch_name}
                  onChange={handleInputs}
                  required=""
                />
              </div>
            </div>
            <div className="col-md-4 col-12 mb-2">
              <p className="text-alternate">Bank Account</p>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="bankAccount"
                  name="bank_account"
                  value={buyerMaster?.bank_account}
                  onChange={handleInputs}
                  required=""
                />
              </div>
            </div>
          </>}
          {buyerMaster?.payment_type === "netBanking" && <>
            <div className="col-md-4 col-12 mb-2">
              <p className="text-alternate">Date</p>
              <div className="input-group">
                <input
                  type="date"
                  className="form-control"
                  id="chequeDate"
                  name="date"
                  value={buyerMaster?.date}
                  onChange={handleInputs}
                  required=""
                />
              </div>
            </div>
            <div className="col-md-4 col-12 mb-2">
              <p className="text-alternate">Bank Name</p>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="bankName"
                  name="bank_name"
                  value={buyerMaster?.bank_name}
                  onChange={handleInputs}
                  required=""
                />
              </div>
            </div>
            <div className="col-md-4 col-12 mb-2">
              <p className="text-alternate">Branch Name</p>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="branchName"
                  name="branch_name"
                  value={buyerMaster?.branch_name}
                  onChange={handleInputs}
                  required=""
                />
              </div>
            </div>
            <div className="col-md-4 col-12 mb-2">
              <p className="text-alternate">Bank Account</p>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="bankAccount"
                  name="bank_account"
                  value={buyerMaster?.bank_account}
                  onChange={handleInputs}
                  required=""
                />
              </div>
            </div>
          </>}
          {buyerMaster?.payment_type === "creditCard" && <>
            <div className="col-md-4 col-12 mb-2">
              <p className="text-alternate">Date</p>
              <div className="input-group">
                <input
                  type="date"
                  className="form-control"
                  id="chequeDate"
                  name="date"
                  value={buyerMaster?.date}
                  onChange={handleInputs}
                  required=""
                />
              </div>
            </div>
            <div className="col-md-4 col-12 mb-2">
              <p className="text-alternate">Bank Name</p>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="bankName"
                  name="bank_name"
                  value={buyerMaster?.bank_name}
                  onChange={handleInputs}
                  required=""
                />
              </div>
            </div>
            <div className="col-md-4 col-12 mb-2">
              <p className="text-alternate">Branch Name</p>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="branchName"
                  name="branch_name"
                  value={buyerMaster?.branch_name}
                  onChange={handleInputs}
                  required=""
                />
              </div>
            </div>
            <div className="col-md-4 col-12 mb-2">
              <p className="text-alternate">Card Number</p>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="cardNumber"
                  name="card_number"
                  value={buyerMaster?.card_number}
                  onChange={handleInputs}
                  required=""
                />
              </div>
            </div>
          </>}
          <div className="col-md-12 col-12 text-right">
            <button
              type="button"
              class="btn btn-outline-warning btn-md mb-1 mr-1"
            >
              {" "}
              Exit{" "}
            </button>
            <button
              type="button"
              onClick={() => uploadBuyermaster()}
              class="btn btn-outline-primary btn-md mb-1 mr-1"
            >
              {" "}
              Submit{" "}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default BuyerMaster


const DataTableCustom = (props) => {
  const { dataState, setDataState } = props;
  let { data, columns, value, filteredData } = dataState;
  let val, name;
  const handleOnchange = (e) => {
    name = e.target.name;
    val = e.target.value;
    setDataState({ ...dataState, [name]: val });
  }
  return (
    <div>
      <CardHeader>
        <h5>Demands</h5>
      </CardHeader>
      <CardBody className="rdt_Wrapper">
        <DataTable
          className="dataTable-custom"
          data={value.length ? filteredData : data}
          columns={columns}
          noHeader
          pagination
          subHeader
          subHeaderComponent={
            <div className="d-flex flex-wrap justify-content-between">
              <div className="add-new">
              </div>
            </div>
          }
        />
      </CardBody>
    </div>
  );
}