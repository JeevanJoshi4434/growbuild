import React from 'react';
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Badge, Button, Card, CardBody, CardHeader, CardTitle, Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import DataTable from "react-data-table-component";
import axios from 'axios';
const ExtraFacilities = () => {
  const [allBuilding, setAllBuilding] = useState(null);
  const [editWindow, setEditWindow] = useState(false);
  const [Building, setBuilding] = useState(null);
  const [state, setState] = useState({
    columns: [
      {
        name: "Extra Facility",
        selector: "extra_facility",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            <div className="user-img ml-xl-0 ml-2">
            </div>
            <div className="user-info text-truncate ml-xl-50 ml-0">
              <span
                title={row.extra_facility}
                className="d-block text-bold-500 text-truncate mb-0"
              >
                {row.extra_facility}
              </span>
            </div>
          </div>
        ),
      },
      {
        name: "Provider",
        selector: "provider",
        sortable: true,
        cell: (row) => (
          <p className="text-bold-500 text-truncate mb-0">{row.name}</p>
        ),
      },
      {
        name: "SGST",
        selector: "SGST",
        sortable: true,
        cell: (row) => (
          <Badge
            color={row.Status === "inactive" ? "light-danger" : "light-success"}
            pill
          >
            {row.sgst}
          </Badge>
        ),
      },
      {
        name: "CGST",
        selector: "CGST",
        sortable: true,
        cell: (row) => (
          <Badge
            color={row.Status === "inactive" ? "light-danger" : "light-success"}
            pill
          >
            {row.cgst}
          </Badge>
        ),
      },
      {
        name: "Price",
        selector: "",
        sortable: true,
        cell: (row) => {
          return (
            <div className="d-flex flex-column align-items-center">
              <p>{row.totalPrice}</p>
            </div>
          );
        },
      },
    ],
    data: [],
    filteredData: [],
    value: "",
    buildingId: null,
    projectId:null
  })
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setState({ ...state, [name]: value });
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
      console.log(res.data);
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
      if(res.data?.extra_facilities?.length > 0) setState({ ...state, data: res.data?.extra_facilities });
    }
  }
  const update = async()=>{
    let building = document.getElementById('buildingId');
    let buildingId = building.value;
    if(buildingId !== null && buildingId?.length > 0){
      const res = await axios.put(`${process.env.REACT_APP_PORT}/api/update/building/${buildingId}`,{
        extra_facilities:state.data
      });
      if(res.status===200) setEditWindow(false);
      else window.alert('Check your internet connection');
    }
  }

  return (
    <div className="container bg-white p-2 rounded-2">
      <form className="row px-4 py-4 mx-2 my-2 justify-content-center shadow-lg">
        <div className='col-12 d-flex justify-content-end items-center'>
            {!editWindow ? <Button color="primary" onClick={()=>setEditWindow(true)}>Edit</Button>
            : <Button color="primary" onClick={()=>{update();}}>Save Changes</Button>}
        </div>
        <div className="col-md-6 col-12 mb-2">
          <p className="text-alternate">Select Project</p>
          <div className="input-group">
            <select className="form-control" id="projectId" onChange={(e) => { handleInputs(e); getBuildings(e.target.value); }} name="projectId" value={state.projectId}>
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
            <select className="form-control" id="buildingId" name="buildingId" onChange={(e) => { handleInputs(e); getBuildingDetail(e.target.value) }} value={state.buildingId} >
              {state.projectId === null ? <option value={null} name={null} >First select Project</option>
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
        <DataTableCustom state={state} setState={setState} editWindow={editWindow} />
      </form>
    </div>
  )
}

export default ExtraFacilities;

const DataTableCustom = (props) => {
  const { state, setState,editWindow } = props;
  let { data, columns, value, filteredData } = state;
  let val, name;
  const handleOnchange = (e) => {
    name = e.target.name;
    val = e.target.value;
    setState({ ...state, [name]: val });
  }
  const [modal, setModal] = useState(false);
  const [Data, setData] = useState({
    name: null,
    Status: "initiated",
    sgst: "9%",
    cgst: "9%",
    extra_facility: null,
    totalPrice: null,
  });
  const [price, setPrice] = useState(null);

  const onChange = (e) => {
    name = e.target.name;
    val = e.target.value;
    setData({ ...Data, [name]: val });
    console.log(Data);
  }
  const toggleModal = () => {
    if (modal) setModal(false);
    else setModal(true);
  }
  const updateModal = () => {
    setState({ ...state, data: data?.concat(Data) });
    console.log(state);
    if (modal) setModal(false);
    else setModal(true);
  }

  const setTotalPice = (val) => {
    let price = parseFloat(val) + (parseFloat(val) * 0.18);
    setData({ ...Data, totalPrice: price });
  }



  return (
    <div>
      <CardHeader>
        <h5>Extra Facilities</h5>
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
              <Modal
                isOpen={modal}
                toggle={toggleModal}
                className="modal-dialog-centered"
                fade={false}
              >
                <ModalHeader toggle={toggleModal}>
                  Add Facility
                </ModalHeader>
                <ModalBody className="modal-dialog-centered d-flex flex-column align-items-start justify-center space-around">
                  <p className="my-1">Facility Name</p>
                  <Input type="text" name="extra_facility" id="extra_facility" value={Data.extra_facility} onChange={(e) => onChange(e)} placeholder="Facility..." />
                  <p className="my-1">Provider</p>
                  <Input type="text" value={Data.name} name="name" id="name" onChange={(e) => onChange(e)} placeholder="Provider Name" />
                  <p className="mt-1">Price(without 18% GST)</p>
                  <p className="mb-1">GST will be added at checkout</p>
                  <Input type="text" id="totalPrice" onChange={(e) => setTotalPice(e.target.value)} name="totalPrice" placeholder="Price" />

                </ModalBody>
                <ModalFooter>
                   <Button color="primary" onClick={() => updateModal()}>
                    Add
                  </Button>{" "}
                  <Button color="primary" onClick={() => toggleModal()}>
                    cancel
                  </Button>{" "}
                </ModalFooter>
              </Modal>
              <div className="add-new">
              {editWindow && <Button.Ripple color="primary" onClick={toggleModal} >Add New</Button.Ripple>}
              </div>
            </div>
          }
        />
      </CardBody>
    </div>
  );
}
