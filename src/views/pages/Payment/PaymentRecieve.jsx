import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Eye } from 'react-feather';
import { Link } from 'react-router-dom';
import { Input } from 'reactstrap'
import { RequiredField } from '../../../utility/RequiredField'
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

const PaymentRecieve = () => {
  const [buyerMaster, setBuyerMaster] = useState({
    Project: null, Building: null, floor: null, unit: null, secondfloor: null, flat: null, parking: null, booking_price: null, booking_date: null, allotment_date: null, agreement_date: null, Owner_name: null, payment_stage: null, price: null, payment_receive: null, payment_type: null, check_number: null, date: null, bank_name: null, branch_name: null, bank_account: null, card_number: null, id: null, price_with_tax: null, balance: null
  });

  const [allUnits, setAllUnits] = useState(null);
  const [allBuilding, setAllBuilding] = useState(null);
  const [Building, setBuilding] = useState(null);
  const [AllProjects, setAllProjects] = useState(null);
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setBuyerMaster({ ...buyerMaster, [name]: value });
    console.log({ data: buyerMaster });
  }
  const getProject = async () => {
    const res = await axios.get(process.env.REACT_APP_PORT + '/api/all/project', {
      Headers: {
        'Content-Type': 'application/json'
      }
    })
    setAllProjects(res.data);
  }
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
  return (
    <>
      <form
        className="row px-4 py-4 mx-2 my-2 shadow-lg needs-validation d-flex justify-content-center"
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
        <div className="col-md-6 col-12 mb-2">
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
        <div className="col-md-6 col-12 mb-2">
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
                      let s = "";
                      s = i.unit_name;
                      s = s.slice(0, 1);
                      if (s === buyerMaster.floor) {
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
        <div className='col-md-12 col-12 my-3 px-2 py-2 shadow'>
          {buyerMaster.Project != null && buyerMaster.Building != null ?
            <>
              <Link to={`/installment/view?project=${buyerMaster.Project}&&building=${buyerMaster.Building}`} className="btn btn-primary mx-1 my-1" target="_blank">Installment Slip</Link>
              <Link to={`/all/booking?project=${buyerMaster.Project}&&building=${buyerMaster.Building}&&single=false`} className="btn btn-primary mx-1 my-1" target="_blank">View All Bookings</Link>
              <Link to={`/payment/all?project=${buyerMaster.Project}&&building=${buyerMaster.Building}`} className="btn btn-primary mx-1 my-1" target="_blank">View All Payments</Link>
              <Link to={`/due/payment?project=${buyerMaster.Project}&&building=${buyerMaster.Building}`} className="btn btn-primary mx-1 my-1" target="_blank" >View All Dues</Link>
            </>
            :
            <>
            <Link  title="Select Project and Building" disabled className="btn btn-primary mx-1 my-1" >Installment Slip</Link>
            <Link  title="Select Project and Building" disabled className="btn btn-primary mx-1 my-1">View All Bookings</Link>
              <Link title="Select Project and Building" disabled className="btn btn-primary mx-1 my-1">View All Payments</Link>
              <Link title="Select Project and Building" disabled className="btn btn-primary mx-1 my-1">View All Dues</Link>
            </>
          }
          {
            buyerMaster.Project != null && buyerMaster.Building != null && buyerMaster.unit != null ?
              <>
                <Link to={`/payment/single?building=${buyerMaster.Building}&&project=${buyerMaster.Project}&&unit=${buyerMaster.unit}`} className="btn btn-primary mx-1 my-1" target="_blank">View Unit Paid Payments</Link>
                <Link to={`/payment/due?building=${buyerMaster.Building}&&project=${buyerMaster.Project}&&unit=${buyerMaster.unit}`} className="btn btn-primary mx-1 my-1" target="_blank">View Unit Pending Payments</Link>
              </>
              :
              <>
                <Link disabled title='Select Project Building and Unit' className="btn btn-primary mx-1 my-1">View Unit Paid Payments</Link>
                <Link disabled title='Select Project Building and Unit' className="btn btn-primary mx-1 my-1" >View Unit Pending Payments</Link>
              </>
          }
        </div>
      </form>
    </>
  )
}
export default PaymentRecieve
