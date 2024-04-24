import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { Edit, Search, Star, Trash } from "react-feather";
import swal from "sweetalert";
import UnitTable from "./UnitTable";
import { Badge, Button, Card, CardBody, CardHeader, CardTitle, Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import DataTable from "react-data-table-component";
const CreateUnit = () => {
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
            color={row.status === "inactive" ? "light-danger" : "light-success"}
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
            color={row.status === "inactive" ? "light-danger" : "light-success"}
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
  })
  const [isEdit, setIsEdit] = useState(false);
  const [allUnit, setAllUnit] = useState(null);
  const [CreateUnit, setCreateUnit] = useState({
    Project: null, building: null, unit_name: null, total_area_this_unit: null, carpet_area: null, build_up_area: null, balcony_area: null, total_number_of_flat_on_this_unit: null, parking_detail: null, extra_facilities: null, id: null, price: null, TotalPrice: null,sgst:null,cgst:null, pricewithtax: null,multiple:false,floors:0,units:0
  });
  const [allBuilding, setAllBuilding] = useState(null);
  const [Building, setBuilding] = useState(null);
  let name, value;
  let totalPrice = document.getElementById('pricewithtax');
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setCreateUnit({ ...CreateUnit, [name]: value });
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
      console.log(res.data);
    }
  }
  const getProjectName = async (idd) => {
    const res = await axios.get(process.env.REACT_APP_PORT + '/api/project/' + idd);
    if (res.status === 200) {
      return res.data.name;
    } else {
      return null;
    }
  }
  const getBuildingName = async (idd) => {
    const res = await axios.get(process.env.REACT_APP_PORT + '/api/building/' + idd);
    if (res.status === 200) {
      return res.data.name;
    } else {
      return null;
    }
  }
  const createUnit = async () => {
    const res = await axios.post(process.env.REACT_APP_PORT + '/api/create/unit', {
      Project: CreateUnit.Project,
      building: CreateUnit.building,
      unit_name: CreateUnit.unit_name,
      total_area_this_unit: CreateUnit.total_area_this_unit,
      carpet_area: CreateUnit.carpet_area,
      build_up_area: CreateUnit.build_up_area,
      balcony_area: CreateUnit.balcony_area,
      total_number_of_flat_on_this_unit: CreateUnit.total_number_of_flat_on_this_unit,
      parking_detail: CreateUnit.parking_detail,
      extra_facilities: state.data,
      price:CreateUnit.price ,
      totalPrice: totalPrice.value,
      sgst:CreateUnit.sgst,
      cgst:CreateUnit.cgst,
      pricewithtax:totalPrice.value,
      multiple:CreateUnit.multiple,
      floors:CreateUnit.floors,
      units:CreateUnit.units
    })
    if (res.status === 200) {
      window.alert("Unit Upload Done!");
      history.go(0);
    }
  }

  const deleteUnit = async () => {
    const res = await axios.delete(`${process.env.REACT_APP_PORT}/api/delete/unit/${CreateUnit._id}`)
    if (res.status === 200) {
      window.alert("Unit Deleted!");
      getAllUnits();
      history.go(0);
    }
  }
  const edit = async (data) => {
    setCreateUnit({ ...CreateUnit, Project: data?.Project, building: data?.building, unit_name: data?.unit_name, total_area_this_unit: data?.total_area_this_unit, carpet_area: data?.carpet_area, build_up_area: data?.build_up_area, balcony_area: data?.balcony_area, total_number_of_flat_on_this_unit: data?.total_number_of_flat_on_this_unit, parking_detail: data?.parking_detail, extra_facilities: "", id: data?._id ,pricewithtax:data?.pricewithtax,sgst:data?.sgst,cgst:data?.cgst});
    setIsEdit(true)
    await getBuildings(data?.Project);
    setCreateUnit({ ...CreateUnit, Project: data?.Project, building: data?.building, unit_name: data?.unit_name, total_area_this_unit: data?.total_area_this_unit, carpet_area: data?.carpet_area, build_up_area: data?.build_up_area, balcony_area: data?.balcony_area, total_number_of_flat_on_this_unit: data?.total_number_of_flat_on_this_unit, parking_detail: data?.parking_detail, extra_facilities: "", id: data?._id, price: data?.price, TotalPrice: data?.totalPrice,pricewithtax:data?.pricewithtax,sgst:data?.sgst,cgst:data?.cgst });
    setState({...state, data:data?.extra_facilities});
  }

  const updateUnit = async (id) => {
    const res = await axios.put(`${process.env.REACT_APP_PORT}/api/update/unit/${id}`, {
      Project: CreateUnit.Project,
      building: CreateUnit.building,
      unit_name: CreateUnit.unit_name,
      total_area_this_unit: CreateUnit.total_area_this_unit,
      carpet_area: CreateUnit.carpet_area,
      build_up_area: CreateUnit.build_up_area,
      balcony_area: CreateUnit.balcony_area,
      total_number_of_flat_on_this_unit: CreateUnit.total_number_of_flat_on_this_unit,
      parking_detail: CreateUnit.parking_detail,
      extra_facilities: state.data,
      price: CreateUnit.pricewithtax,
      totalPrice: CreateUnit.pricewithtax,
      sgst:CreateUnit.sgst,
      cgst:CreateUnit.cgst,
      pricewithtax:CreateUnit.pricewithtax,
    })
    if (res.status === 200) {
      swal("Unit Updated!");
      setTimeout(() => {
        history.go(0);
      }, 2000);
    }
  }


  const getAllUnits = async () => {
    const res = await axios.get(process.env.REACT_APP_PORT + '/api/all/unit', {
      Headers: {
        'Content-Type': 'application/json'
      }
    })
    setAllUnit(res.data);
  }
  useEffect(() => {
    getAllUnits();
  }, [])

  const setTotalPrice = () => {
    if(CreateUnit.total_area_this_unit&&CreateUnit.sgst&&CreateUnit.cgst&&CreateUnit.price){
      let Saleable = document.getElementById('totalArea');
      let sqft = document.getElementById('price');
      let total = document.getElementById('pricewithtax');
      let sgst = document.getElementById('sgst');
      let cgst = document.getElementById('cgst');
      let price = 0;
      price = parseFloat(Saleable.value * sqft.value);
      price = parseFloat(price) + (parseFloat(price)*(parseFloat(sgst.value/100)+parseFloat(cgst.value/100)));
      total.value = price.toFixed(2);
    }
  }

  const handleMultipleBehavior =()=>{
    var check = document.getElementById('multiple');
    check.checked?setCreateUnit({...CreateUnit, multiple:true}):setCreateUnit({...CreateUnit, multiple:false});
  }

  useEffect(() => {
    setTotalPrice();
  }, [CreateUnit.total_area_this_unit,CreateUnit.sgst,CreateUnit.cgst,CreateUnit.price]);
  


  return (
    <>
      <div className="container bg-white p-2 rounded-2">
        <form className="row px-4 py-4 mx-2 my-2 shadow-lg">
          <h3 className="text-alternate text-primary">Create New Unit</h3>
          <div className="col-md-6 col-12 m-2 d-flex items-center">
            <p className="text-alternate">Multiple Units Mode</p>
            <Input id="multiple" type="checkbox" onChange={handleMultipleBehavior} />
          </div>
          <hr />

          <div className="col-md-6 col-12 mb-2">
            <p className="text-alternate">Select Project</p>
            <div className="input-group">
              <select className="form-control" id="project" onChange={(e) => { handleInputs(e); getBuildings(e.target.value); }} name="Project" value={CreateUnit.Project}>
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
              <select className="form-control" id="building" name="building" onChange={(e) => { handleInputs(e); getBuildingDetail(e.target.value) }} value={CreateUnit.building} >
                {CreateUnit.project === null ? <option value={null} name={null} >First select Project</option>
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
          <div className="col-md-6 col-12 mb-2">
            {!CreateUnit.multiple ? <p className="text-alternate">Unit Name</p> : <p className="text-alternate">Name</p>}
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="unitName"
                name="unit_name"
                onChange={handleInputs}
                value={CreateUnit.unit_name}
                required=""
              />
            </div>
          </div>
          <div className="col-md-3 col-12 mb-2">
            <p className="text-alternate">Saleable Area This Unit</p>
            <div className="input-group">
              <input
                type="number"
                className="form-control"
                id="totalArea"
                name="total_area_this_unit"
                onChange={(e) => { handleInputs(e);}}
                value={CreateUnit.total_area_this_unit}
                required=""
              />
            </div>
          </div>
          {CreateUnit.multiple && 
          <div className="col-md-3 col-12 mb-2">
            <p className="text-alternate">Total Floors</p>
            <div className="input-group">
              <input
                type="number"
                className="form-control"
                id="floors"
                name="floors"
                onChange={(e) => { handleInputs(e);}}
                value={CreateUnit.floors}
              />
            </div>
          </div>}
          <div className="col-md-4 col-12 mb-2">
            <p className="text-alternate">Carpet Area</p>
            <div className="input-group">
              <input
                type="number"
                className="form-control"
                id="carpet"
                name="carpet_area"
                onChange={handleInputs}
                value={CreateUnit.carpet_area}
                required=""
              />
            </div>
          </div>
          <div className="col-md-4 col-12 mb-2">
            <p className="text-alternate">Built-Up Area</p>
            <div className="input-group">
              <input
                type="number"
                className="form-control"
                id="builtup"
                name="build_up_area"
                onChange={handleInputs}
                value={CreateUnit.build_up_area}
                required=""
              />
            </div>
          </div>
          <div className="col-md-4 col-12 mb-2">
            <p className="text-alternate">Balcony Area</p>
            <div className="input-group">
              <input
                type="number"
                className="form-control"
                id="balcony"
                name="balcony_area"
                onChange={handleInputs}
                value={CreateUnit.balcony_area}
                required=""
              />
            </div>
          </div>
          {/* <div className="col-md-6 col-12 mb-2">
            <p className="text-alternate">Total No Of Flat On This Unit</p>
            <div className="input-group">
              <input
                type="number"
                className="form-control"
                id="totalflats"
                name="total_number_of_flat_on_this_unit"
                onChange={handleInputs}
                value={CreateUnit.total_number_of_flat_on_this_unit}
                required=""
              />
            </div>
          </div> */}
          {/* <div className="col-md-6 col-12 mb-2">
            <p className="text-alternate">Parking Details</p>
            <div className="input-group">
              <span className="input-group-text">
                <input
                  aria-label="Parkings"
                  id="isParkings"
                  name="isParkings"
                  type="radio"
                  className="form-check-input"
                />
              </span>
              <input
                type="number"
                aria-label="No Of Parking"
                placeholder="Enter Total No Of Parkings"
                className="form-control"
                name='parking_detail'
                onChange={handleInputs}
                value={CreateUnit.parking_detail}
              />
            </div>
          </div> */}
          <div className="col-md-4 col-12 mb-2">
            <p className="text-alternate">Price per sq.ft</p>
            <div className="input-group">
              <input
                type="number"
                step={0.01}
                aria-label="price"
                placeholder="Enter Price"
                className="form-control"
                name='price'
                id='price'
                onChange={(e) => { handleInputs(e);}}
                value={CreateUnit.price}
              />
            </div>
          </div>
          <div className="col-md-4 col-12 mb-2">
            <p className="text-alternate">SGST</p>
            <div className="input-group">
              <input
                type="number"
                aria-label="Total Price"
                placeholder="SGST(%)"
                className="form-control"
                name='sgst'
                id='sgst'
                onChange={(e) => { handleInputs(e);}}
                value={CreateUnit.sgst}
              />
            </div>
          </div>
          <div className="col-md-4 col-12 mb-2">
            <p className="text-alternate">CGST</p>
            <div className="input-group">
              <input
                type="number"
                aria-label="Total Price"
                placeholder="CGST(%)"
                className="form-control"
                name='cgst'
                id='cgst'
                onChange={(e) => { handleInputs(e);}}
                value={CreateUnit.cgst}
              />
            </div>
          </div>
          <div className="col-md-6 col-12 mb-2">
            <p className="text-alternate">Total Price(GST included)</p>
            <div className="input-group">
              <input
                type="number"
                step="0.01"
                aria-label="Total Price"
                placeholder="Total Price"
                className="form-control"
                name='pricewithtax'
                id='pricewithtax'
                disabled
                onChange={(e)=>handleInputs(e)}
                value={CreateUnit.pricewithtax}
              />
            </div>
          </div>
          <div className="col-md-12 col-12 text-right">
            {isEdit ? (
              <>
                <button
                  type="button"
                  class="btn btn-outline-warning btn-md mb-1 mr-1"
                  onClick={() => {
                    setCreateUnit({
                      ...CreateUnit,
                      Project: null,
                      building: null,
                      unit_name: null,
                      total_area_this_unit: null,
                      carpet_area: null,
                      build_up_area: null,
                      balcony_area: null,
                      total_number_of_flat_on_this_unit: null,
                      parking_detail: null,
                      extra_facilities: null, id: null,
                      sgst:null,cgst:null,price:null,
                      pricewithtax:null
                    });
                    setIsEdit(false);

                  }}
                >
                  {" "}
                  Exit{" "}
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-md mb-1 mr-1"
                  onClick={() => updateUnit(CreateUnit?.id)}
                >
                  {" "}
                  Update{" "}
                </button>
              </>
            ) : (
              <button
                type="button"
                class="btn btn-outline-primary btn-md mb-1 mr-1"
                onClick={() => createUnit()}
              >
                {" "}
                Create{" "}
              </button>
            )}
          </div>
        </form>
        {!isEdit &&
          <form
            className="row px-4 py-4 mx-2 my-2 shadow-lg needs-validation"
            novalidate
          >
            <h3 className="text-alternate text-primary">All Units</h3>
            <div className="d-flex justify-content-center">
              <table className="table table-striped table-responsive">
                <tr>
                  <th>Sno</th>
                  <th>Project</th>
                  <th>Building</th>
                  <th>Unit Name</th>
                  <th>Balcony Area</th>
                  <th>Build Up Area</th>
                  <th>Carpet Area</th>
                  <th>Saleable Area</th>
                  <th>Price per sq. ft</th>
                  <th>Total Price</th>
                  <th>Action</th>
                </tr>
                {allUnit?.map((i, j) => {
                  let id = i?._id;
                  return <UnitTable i={i} j={j} setState={setState} state={state} setIsEdit={setIsEdit} setAllUnit={setAllUnit} setCreateUnit={setCreateUnit} setAllBuilding={setAllBuilding} CreateUnit={CreateUnit} id={id} />;
                })}
              </table>
            </div>
          </form>
        }
      </div>
    </>
  );
};

export default CreateUnit;

const DataTableCustom = (props) => {
  const { state, setState } = props;
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
    status: "active",
    sgst: "8%",
    cgst: "10%",
    extra_facility: null,
    totalPrice: null,
  });
  const [price, setPrice] = useState(null);

  const onChange = (e) => {
    name = e.target.name;
    val = e.target.value;
    setData({ ...Data, [name]: val });
  }
  const toggleModal = () => {
    if (modal) setModal(false);
    else setModal(true);
  }
  const updateModal = () => {
    setState({ ...state, data: data.concat(Data) });
    console.log(state);
    if (modal) setModal(false);
    else setModal(true);
  }

  const setTotalPice = (val)=>{
    let price = parseFloat(val) + (parseFloat(val) * 0.18);
    setData({...Data, totalPrice:price});
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
                  <Input type="text" name="extra_facility" id="extra_facility" value={data.extra_facility} onChange={(e) => onChange(e)} placeholder="Facility..." />
                  <p className="my-1">Provider</p>
                  <Input type="text" value={data.name} name="name" id="name" onChange={(e) => onChange(e)} placeholder="Provider Name" />
                  <p className="mt-1">Price(without 18% GST)</p>
                  <p className="mb-1">GST will be added at checkout</p>
                  <Input type="text"  id="totalPrice" onChange={(e)=>setTotalPice(e.target.value)}  name="totalPrice" placeholder="Price" />

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
                <Button.Ripple color="primary" onClick={toggleModal} >Add New</Button.Ripple>
              </div>
            </div>
          }
        />
      </CardBody>
    </div>
  );
}
