import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

const RaiseDemand = () => {

  const [demand, setDemand] = useState({
    Project: '', Building: '', paymentPlan: ''
  })
  const [allBuilding, setAllBuilding] = useState(null);
  const [DemandList, setDemandList] = useState([]);
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setDemand({ ...demand, [name]: value });
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
  const getDetail = async (id) => {
    if ((id?.length === 24 || id?.length === 12)) {
      const res = await axios.get(`${process.env.REACT_APP_PORT}/api/demand/status/${id}/${demand.Project}/pending`, {
        Headers: {
          'Content-Type': 'application/json'
        }
      }
      );
      setDemandList(res.data);
    }
  }

  const updateDemand = async () => {
    try {

      const res = await axios.put(process.env.REACT_APP_PORT + `/api/update/demand/${demand.paymentPlan}`,
        { Status: 'completed', onlyStatus: true }
      );
      if (res.status === 200) {
        alert("Demand Raised successfully");
        getDetail(demand.Building);
      }else{
        alert("Something went wrong, try again later.");
      }

    } catch (error) {
      alert("Something went wrong, try again later.");
    }
  }
  return (
    <>
      <div class="container bg-white p-2 rounded-2">
        <form class="row px-4 py-4 mx-2 my-2 justify-content-center shadow-lg">
          <h3 class="text-alternate text-primary">Raise Demand</h3>
          <hr />
          <div className="col-md-6 col-12 mb-2">
            <p className="text-alternate">Select Project</p>
            <div className="input-group">
              <select className="form-control" id="project" onChange={(e) => { handleInputs(e); getBuildings(e.target.value); }} name="Project" value={demand.Project}>
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
              <select className="form-control" id="building" name="Building" onChange={(e) => { handleInputs(e); getDetail(e.target.value) }} value={demand.Building} >
                {demand.Project === null ? <option value={null} name={null} >First select Project</option>
                  : <>
                    {allBuilding === null && <option value={null} name={null} >Loading...</option>}
                    {allBuilding !== null && allBuilding?.length === 0 && <option value={null} name={null} >No Building Available</option>}
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
          <div class="col-md-8 col-12 mb-2">
            <p class="text-alternate">Select Payment Plan</p>
            <div class="input-group">
              <select class="form-control" id="paymentPlan" name="paymentPlan" onChange={handleInputs} value={demand.paymentPlan}>
                {allBuilding === null && <option value=''>Select Building First</option>}
                <option value='' >Select Payment Plan</option>
                {
                  DemandList.length > 0 && DemandList.map((i) => {
                    return (
                      <option name={i?._id} value={i?._id}>{i?.stage_name}</option>
                    )
                  })
                }
              </select>
            </div>
          </div>
          <div class="col-md-4 col-12 mb-2">
            <p class="text-alternate">Raise Demands For this Plan</p>
            <button type="button" disabled={demand.paymentPlan.length > 0 ? false : true} onClick={updateDemand} class="btn btn-success">
              Set Plan Active
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RaiseDemand;
