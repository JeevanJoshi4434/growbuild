import React from 'react';
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Badge, Button, Card, CardBody, CardHeader, CardTitle, Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import DataTable from "react-data-table-component";
import axios from 'axios';
import { Delete, Edit, Edit2, Trash2 } from 'react-feather';
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
      {
        name: "Actions",
        selector: "",
        sortable: true,
        cell: (row) => {
          return (
            <div className="d-flex align-items-center justify-content-around">
              <Edit2 className='mx-1 pointer' />
              <Delete />
            </div>
          );
        },
      },
    ],
    data: [],
    filteredData: [],
    value: "",
    buildingId: null,
    projectId: null
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
      if (res.data?.extra_facilities?.length > 0) setState({ ...state, data: res.data?.extra_facilities });
    }
  }
  const update = async () => {
    let building = document.getElementById('buildingId');
    let buildingId = building.value;
    if (buildingId !== null && buildingId?.length > 0) {
      const res = await axios.put(`${process.env.REACT_APP_PORT}/api/update/building/${buildingId}`, {
        extra_facilities: state.data
      });
      if (res.status === 200) setEditWindow(false);
      else window.alert('Check your internet connection');
    }
  }

  return (
    <div className="container bg-white p-2 rounded-2">
      <form className="row px-4 py-4 mx-2 my-2 justify-content-center shadow-lg">
        <div className='col-12 d-flex justify-content-end items-center'>
          {!editWindow ? <Button color="primary" onClick={() => setEditWindow(true)}>Edit</Button>
            : <Button color="primary" onClick={() => { update(); }}>Save Changes</Button>}
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
  const { state, setState, editWindow } = props;
  let { data, columns, value, filteredData } = state;
  let val, name;
  const handleOnchange = (e) => {
    name = e.target.name;
    val = e.target.value;
    setState({ ...state, [name]: val });
  }
  const [modal, setModal] = useState(false);
  const [Data, setData] = useState({
    name: "",
    Status: "initiated",
    sgst: "9%",
    cgst: "9%",
    extra_facility: null,
    totalPrice: null,
  });

  const [EditModal, setEditModal] = useState(false);
  const [EditElement, setEditElement] = useState({
    name: "",
    Status: "initiated",
    sgst: "9%",
    cgst: "9%",
    extra_facility: "",
    totalPrice: 0,
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
    let object = {
      name:Data.name,
      Status:Data.Status,
      sgst:Data.sgst,
      cgst:Data.cgst,
      extra_facility:Data.extra_facility,
      totalPrice:Data.totalPrice
    }
    setState({ ...state, data: data?.concat(object) });
    setData({ name: "", Status: "initiated", sgst: "9%", cgst: "9%", extra_facility: "", totalPrice: 0.00 });
    console.log(state);
    if (modal) setModal(false);
    else setModal(true);
  }

  const setTotalPrice = (val) => {
    let price = parseFloat(val) + (parseFloat(val) * 0.18);
    setData({ ...Data, totalPrice: price.toFixed(2) });
  }

  const [currentIndex, setCurrentIndex] = useState(-1);

  function updateFieldAtIndex() {
    let prevData = state.data;
    let updatedObj = {
      name: EditElement.name,
      Status: EditElement.Status,
      sgst: EditElement.sgst,
      cgst: EditElement.cgst,
      extra_facility: EditElement.extra_facility,
      totalPrice: EditElement.totalPrice
    }
    console.log(currentIndex);
    if (currentIndex >= 0 && currentIndex < data.length && prevData.length > 0) {
      prevData[currentIndex] = updatedObj;
      console.log({prev:prevData, udpate:updatedObj,index:currentIndex});
      setState({ ...state, data: prevData });
      setEditModal(false);
    } else {
      return;
    }
  }

  const setTotalEditPrice = (val) => {
    let price = parseFloat(val) + (parseFloat(val) * 0.18);
    setEditElement({ ...EditElement, totalPrice: price.toFixed(2) });
  }

  // Function to remove a particular index
  function removeAtIndex(index) {
    let prevData = state.data;
    console.log(index,prevData);
    if (index >= 0 && index < data.length) {
      prevData.splice(index, 1);
      console.log({deleted:prevData});
      setState({ ...state, data: prevData });
    } else {
      return;
    }
  }

  function closeEdit(){
    if (EditModal) setEditModal(false);
  }

  function toggleEditScreen(prevData,index) {
    setCurrentIndex(index);
    if (EditModal) setEditModal(false);
    else {
      setEditModal(true);
      setEditElement({
        name: prevData.name,
        Status: prevData.Status,
        sgst: prevData.sgst,
        cgst: prevData.cgst,
        extra_facility: prevData.extra_facility,
        totalPrice: prevData.totalPrice
      })

    }
  }

  function onEditElementChange(e) {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;
    setEditElement({ ...EditElement, [name]: [value] });
  }
  return (
    <div>
      <CardHeader>
        <h5>Extra Facilities</h5>
      </CardHeader>
      <CardBody className="rdt_Wrapper">
        <table className='table table-striped ' style={{ width: "100%" }}>
          <tr>
            <th>Extra Facility</th>
            <th>Provider</th>
            <th>CGST</th>
            <th>SGST</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
          {state.data.length > 0 &&
            state.data.map((i,index) => {
              return (
                <tr>
                  <td>{i.extra_facility}</td>
                  <td>{i.name}</td>
                  <td>{i.sgst}</td>
                  <td>{i.cgst}</td>
                  <td>{i.totalPrice}</td>
                  <td className="d-flex align-items-center" >   <Edit2 className='mx-1' onClick={() => toggleEditScreen(i,index)} /> <Trash2 onClick={() => removeAtIndex(index)} /></td>
                </tr>
              )
            })
          }

        </table>
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
              <Input type="text" id="totalPrice" onChange={(e) => setTotalPrice(e.target.value)} name="totalPrice" placeholder="Price" />
              <p className="mb-1">Total Price including GST</p>
              <Input type="text" id="Final" value={Data.totalPrice || 0} name="totalPrice" placeholder="Price" />

            </ModalBody>
            <ModalFooter>
              <Button color="warning" onClick={() => toggleModal()}>
                cancel
              </Button>{" "}
              <Button color="primary" onClick={() =>updateModal()}>
                Add
              </Button>{" "}
            </ModalFooter>
          </Modal>
          {/* Edit Modal */}
          <Modal
            isOpen={EditModal}
            toggle={closeEdit}
            className="modal-dialog-centered"
            fade={false}
          >
            <ModalHeader toggle={closeEdit}>
              Update Facility
            </ModalHeader>
            <ModalBody className="modal-dialog-centered d-flex flex-column align-items-start justify-center space-around">
              <p className="my-1">Facility Name</p>
              <Input type="text" name="extra_facility" id="extra_facility" value={EditElement.extra_facility} onChange={(e) => onEditElementChange(e)} placeholder="Facility..." />
              <p className="my-1">Provider</p>
              <Input type="text" value={EditElement.name} name="name" id="name" onChange={(e) => onEditElementChange(e)} placeholder="Provider Name" />
              <p className="mt-1">Price(without 18% GST)</p>
              <p className="mb-1">GST will be added at checkout</p>
              <Input type="text" id="totalPrice" onChange={(e) => setTotalEditPrice(e.target.value)} name="totalPrice" placeholder={`Previous Price: ${EditElement.totalPrice} current Price: 0`} />
              <p className="mb-1">Total Price including GST</p>
              <Input type="text" id="Final" value={EditElement.totalPrice || 0} name="totalPrice" placeholder="Price" />
            </ModalBody>
            <ModalFooter>
              <Button color="warning" onClick={() => closeEdit()}>
                cancel
              </Button>{" "}
              <Button color="primary" onClick={() => updateFieldAtIndex()}>
                Update
              </Button>{" "}
            </ModalFooter>
          </Modal>
          <div className="add-new">
            {editWindow && <Button.Ripple color="primary" onClick={toggleModal} >Add New</Button.Ripple>}
          </div>
        </div>
      </CardBody>
    </div>
  );
}
