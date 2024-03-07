import axios from "axios";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Edit, Trash } from "react-feather";
import { useHistory } from "react-router-dom";
import { Badge, CardBody, CardHeader } from "reactstrap";
import swal from "sweetalert";

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
const SetBooking = () => {
  let buildingId = document.getElementById('building');
  let unitId = document.getElementById('unit');
  const [Data, setData] = useState([]);
  const [Unit, setUnit] = useState(null);
  const [stage, setStage] = useState({
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
                title="Payment Plans"
                className="d-block text-bold-500 text-truncate mb-0"
              >
                Payment Plans
              </span>
            </div>
          </div>
        ),
      },
      {
        name: "Payment Plan",
        selector: "Payment Plan",
        sortable: true,
        cell: (row) => (
          <p className="text-bold-500 text-truncate mb-0">{row.stage_name}</p>
        ),
      },
      {
        name: "Status",
        selector: "Status",
        sortable: true,
        cell: (row) => (
          <Badge
            color={row.Status === "completed" ? "light-success" : <>{ row.Status ==="started" ? "light-warning" : "light-danger"}</>}
            pill
          >
            {row.Status}
          </Badge>
        ),
      },
      {
        name: "Demand Rate(%)",
        selector: "Demand Rate(%)",
        sortable: true,
        cell: (row) => {
          return (
            <div className="d-flex flex-column align-items-center">
              <p>{row.amount}</p>
            </div>
          );
        },
      },
    ],
    data: [],
    filteredData: [],
    selectedFacilities: [],
    value: "",
  })
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
    data: [
    ],
    filteredData: [],
    selectedFacilities: [],
    value: "",
  })
  const calculateTotalPrice = () => {
    if (state.selectedFacilities.length > 0) {
      const totalPrice = state?.selectedFacilities?.reduce((total, facility) => {
        // Convert totalPrice to a number and add it to the total
        const facilityTotalPrice = parseFloat(facility?.totalPrice) || 0;
        return parseFloat(total + facilityTotalPrice);
      }, 0);

      return parseFloat(totalPrice).toFixed(2);
    }
    return 0.00; // Return 0 if no facilities are selected
  };
  const [isEdit, setIsEdit] = useState(false);
  const [AllBooking, setAllBooking] = useState(null);
  const [Booking, setBooking] = useState({
    Project: null, building: null, floor: null, unit: null, flat: null, parking: null, booking_price: null, booking_date: null, allotment_date: null, agreement_date: null, first_applicant_name: null, first_applicant_father_name: null, first_applicant_husband_name: null, first_applicant_permanentAddress: null, first_applicant_correspondAddress: null, first_applicant_contactNumber: null, first_applicant_email: null, first_applicant_dob: null, first_applicant_AadharNumber: null, first_applicant_pan_number: null, first_applicant_City: null, first_applicant_police_station: null, first_applicant_country: null, first_applicant_occupation: null, first_applicant_religion: null, first_applicant_status: null, second_applicant_name: null, second_applicant_father_name: null, second_applicant_husband_name: null, second_applicant_contact_number: null, second_applicant_email: null, second_applicant_dob: null, second_applicant_pan_number: null, second_applicant_occupation: null, second_applicant_address: null, second_applicant_relation_with_first_applicant: null, third_applicant_name: null, third_applicant_phone_number: null, fourth_applicant_name: null, fourth_applicant_phone_number: null, second_applicant_adhar_number: null, id: null, price_with_tax: null, parking_price: null, totalAmount: null,bookingPrice:null,unitPrice:null,demandRate:null
  })
  const uploadBooking = async () => {
    const res = await axios.post(process.env.REACT_APP_PORT + '/api/create/booking', {
      Project: Booking?.Project,
      building: buildingId.value,
      floor: Booking?.floor,
      unit: unitId.value,
      parking: Booking?.parking,
      booking_price: Booking?.booking_price,
      booking_date: Booking?.booking_date,
      allotment_date: Booking?.allotment_date,
      agreement_date: Booking?.agreement_date,
      first_applicant_name: Booking?.first_applicant_name,
      first_applicant_father_name: Booking?.first_applicant_father_name,
      first_applicant_husband_name: Booking?.first_applicant_husband_name,
      first_applicant_permanentAddress: Booking?.first_applicant_permanentAddress,
      first_applicant_correspondAddress: Booking?.first_applicant_correspondAddress,
      first_applicant_contactNumber: Booking?.first_applicant_contactNumber,
      first_applicant_email: Booking?.first_applicant_email,
      first_applicant_dob: Booking?.first_applicant_dob,
      first_applicant_AadharNumber: Booking?.first_applicant_AadharNumber,
      first_applicant_pan_number: Booking?.first_applicant_pan_number,
      first_applicant_City: Booking?.first_applicant_City,
      first_applicant_police_station: Booking?.first_applicant_police_station,
      first_applicant_country: Booking?.first_applicant_country,
      first_applicant_occupation: Booking?.first_applicant_occupation,
      first_applicant_religion: Booking?.first_applicant_religion,
      first_applicant_status: Booking?.first_applicant_status,
      second_applicant_name: Booking?.second_applicant_name,
      second_applicant_father_name: Booking?.second_applicant_father_name,
      second_applicant_husband_name: Booking?.second_applicant_husband_name,
      second_applicant_contact_number: Booking?.second_applicant_contact_number,
      second_applicant_email: Booking?.second_applicant_email,
      second_applicant_dob: Booking?.second_applicant_dob,
      second_applicant_pan_number: Booking?.second_applicant_pan_number,
      second_applicant_occupation: Booking?.second_applicant_occupation,
      second_applicant_address: Booking?.second_applicant_address,
      second_applicant_relation_with_first_applicant: Booking?.second_applicant_relation_with_first_applicant,
      third_applicant_name: Booking?.third_applicant_name,
      third_applicant_phone_number: Booking?.third_applicant_phone_number,
      fourth_applicant_name: Booking?.fourth_applicant_name,
      fourth_applicant_phone_number: Booking?.fourth_applicant_phone_number,
      second_applicant_adhar_number: Booking?.second_applicant_adhar_number,
      price_with_tax: Booking?.totalAmount,
      totalAmount: Booking?.totalAmount,
      extra_facility: state?.selectedFacilities,
      bookingPrice:Booking?.booking_price,
      unitPrice:Booking?.unitPrice
    })
    if (res.status === 200) {
      window.alert("Booking created successfully");
      window.location.reload();
    } else {
      window.alert("Something Error Happened!");
    }
  }
  console.log(Booking);
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setBooking({ ...Booking, [name]: value });
  }
  const [allUnits, setAllUnits] = useState(null);
  const [allBuilding, setAllBuilding] = useState(null);
  const [Building, setBuilding] = useState(null);
  const [AllProjects, setAllProjects] = useState(null);
  const [project, setProject] = useState(null);
  const [demands, setDemands] = useState({
    completed:[],pending:[],total:"0.0"
  });
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
    setProject(id);
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
      const res = await axios.get(`${process.env.REACT_APP_PORT}/api/find/unit/available/${id}/${project}`, {
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
      setState({ ...state, data: res.data?.extra_facilities });

      const demand = await axios.get(`${process.env.REACT_APP_PORT}/api/demand/percent/${id}/${project}`);
      if(demand.data?.err) window.alert("Error Happened try checking your internet and try again.");
      else{
        setDemands({...demands,completed:demand.data?.inProgress,pending:demand.data?.Available,total:demand.data?.percent});
        setStage({...stage, data:demand.data?.total});
        setBooking({...Booking,demandRate:demand.data?.amount});
      }
    }
  }
  const edit = async (data) => {
    setBooking({
      ...Booking, Project: data?.Project, building: data?.building, floor: data?.floor, unit: data?.unit, flat: data?.flat,
      parking: data?.parking,
      booking_price: data?.booking_price,
      booking_date: data?.booking_date,
      allotment_date: data?.allotment_date,
      agreement_date: data?.agreement_date,
      first_applicant_name: data?.first_applicant_name,
      first_applicant_father_name: data?.first_applicant_father_name,
      first_applicant_husband_name: data?.first_applicant_husband_name,
      first_applicant_permanentAddress: data?.first_applicant_permanentAddress,
      first_applicant_correspondAddress: data?.first_applicant_correspondAddress,
      first_applicant_contactNumber: data?.first_applicant_contactNumber,
      first_applicant_email: data?.first_applicant_email,
      first_applicant_dob: data?.first_applicant_dob,
      first_applicant_AadharNumber: data?.first_applicant_AadharNumber,
      first_applicant_pan_number: data?.first_applicant_pan_number,
      first_applicant_City: data?.first_applicant_City,
      first_applicant_police_station: data?.first_applicant_police_station,
      first_applicant_country: data?.first_applicant_country,
      first_applicant_occupation: data?.first_applicant_occupation,
      first_applicant_religion: data?.first_applicant_religion,
      first_applicant_status: data?.first_applicant_status,
      second_applicant_name: data?.second_applicant_name,
      second_applicant_father_name: data?.second_applicant_father_name,
      second_applicant_husband_name: data?.second_applicant_husband_name,
      second_applicant_contact_number: data?.second_applicant_contact_number,
      second_applicant_email: data?.second_applicant_email,
      second_applicant_dob: data?.second_applicant_dob,
      second_applicant_pan_number: data?.second_applicant_pan_number,
      second_applicant_occupation: data?.second_applicant_occupation,
      second_applicant_address: data?.second_applicant_address,
      second_applicant_relation_with_first_applicant: data?.second_applicant_relation_with_first_applicant,
      third_applicant_name: data?.third_applicant_name,
      third_applicant_phone_number: data?.third_applicant_phone_number,
      fourth_applicant_name: data?.fourth_applicant_name,
      fourth_applicant_phone_number: data?.fourth_applicant_phone_number,
      second_applicant_adhar_number: data?.second_applicant_adhar_number,
      price_with_tax: data?.price_with_tax,
      totalAmount: data?.totalAmount,
      bookingPrice:data?.bookingPrice,
      unitPrice:data?.unitPrice,
      parking_price:data.price
    });
    setIsEdit(true)
    await getBuildings(data.Project);
    setBooking({ ...Booking, building: data?.building });
    await getBuildingDetail(data.building);
    setBooking({ ...Booking, building: data?.building });
    setBooking({ ...Booking, floor: data?.floor, flat: data?.flat });
    await getUnits(data.building, data.Project);
    setBooking({ ...Booking, unit: data?.unit });
    setBooking({
      ...Booking,
      Project: data?.Project, building: data?.building, floor: data?.floor, unit: data?.unit, flat: data?.flat,
      parking: data?.parking,
      booking_price: data?.booking_price,
      booking_date: data?.booking_date,
      allotment_date: data?.allotment_date,
      agreement_date: data?.agreement_date,
      first_applicant_name: data?.first_applicant_name,
      first_applicant_father_name: data?.first_applicant_father_name,
      first_applicant_husband_name: data?.first_applicant_husband_name,
      first_applicant_permanentAddress: data?.first_applicant_permanentAddress,
      first_applicant_correspondAddress: data?.first_applicant_correspondAddress,
      first_applicant_contactNumber: data?.first_applicant_contactNumber,
      first_applicant_email: data?.first_applicant_email,
      first_applicant_dob: data?.first_applicant_dob,
      first_applicant_AadharNumber: data?.first_applicant_AadharNumber,
      first_applicant_pan_number: data?.first_applicant_pan_number,
      first_applicant_City: data?.first_applicant_City,
      first_applicant_police_station: data?.first_applicant_police_station,
      first_applicant_country: data?.first_applicant_country,
      first_applicant_occupation: data?.first_applicant_occupation,
      first_applicant_religion: data?.first_applicant_religion,
      first_applicant_status: data?.first_applicant_status,
      second_applicant_name: data?.second_applicant_name,
      second_applicant_father_name: data?.second_applicant_father_name,
      second_applicant_husband_name: data?.second_applicant_husband_name,
      second_applicant_contact_number: data?.second_applicant_contact_number,
      second_applicant_email: data?.second_applicant_email,
      second_applicant_dob: data?.second_applicant_dob,
      second_applicant_pan_number: data?.second_applicant_pan_number,
      second_applicant_occupation: data?.second_applicant_occupation,
      second_applicant_address: data?.second_applicant_address,
      second_applicant_relation_with_first_applicant: data?.second_applicant_relation_with_first_applicant,
      third_applicant_name: data?.third_applicant_name,
      third_applicant_phone_number: data?.third_applicant_phone_number,
      fourth_applicant_name: data?.fourth_applicant_name,
      fourth_applicant_phone_number: data?.fourth_applicant_phone_number,
      second_applicant_adhar_number: data?.second_applicant_adhar_number,
      id: data?._id,
      price_with_tax: data?.price_with_tax,
      totalAmount: data?.totalAmount,
      bookingPrice:data?.bookingPrice,unitPrice:data?.unitPrice,
      parking_price: data?.price
    });
    setState({ ...state, data: data })
  }
  const getAllBooking = async () => {
    const res = await axios.get(`${process.env.REACT_APP_PORT}/api/get/all/booking`, {
      Headers: {
        'Content-Type': 'application/json'
      }
    })
    setAllBooking(res.data);
  }
  useEffect(() => {
    getAllBooking();
  }, [])

  const deleteBooking = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this Block?",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      const res = await axios.delete(process.env.REACT_APP_PORT + '/api/delete/booking/' + id, {
        Headers: {
          'Content-Type': 'application/json'
        }
      })
      getAllBooking();
    }
    willDelete();
  }
  const updateBooking = async (id) => {
    const res = await axios.put(process.env.REACT_APP_PORT + '/api/update/booking/' + id, {
      Project: Booking?.Project,
      building: buildingId.value,
      floor: Booking?.floor,
      unit: unitId.value,
      parking: Booking?.parking,
      booking_price: Booking?.booking_price,
      booking_date: Booking?.booking_date,
      allotment_date: Booking?.allotment_date,
      agreement_date: Booking?.agreement_date,
      first_applicant_name: Booking?.first_applicant_name,
      first_applicant_father_name: Booking?.first_applicant_father_name,
      first_applicant_husband_name: Booking?.first_applicant_husband_name,
      first_applicant_permanentAddress: Booking?.first_applicant_permanentAddress,
      first_applicant_correspondAddress: Booking?.first_applicant_correspondAddress,
      first_applicant_contactNumber: Booking?.first_applicant_contactNumber,
      first_applicant_email: Booking?.first_applicant_email,
      first_applicant_dob: Booking?.first_applicant_dob,
      first_applicant_AadharNumber: Booking?.first_applicant_AadharNumber,
      first_applicant_pan_number: Booking?.first_applicant_pan_number,
      first_applicant_City: Booking?.first_applicant_City,
      first_applicant_police_station: Booking?.first_applicant_police_station,
      first_applicant_country: Booking?.first_applicant_country,
      first_applicant_occupation: Booking?.first_applicant_occupation,
      first_applicant_religion: Booking?.first_applicant_religion,
      first_applicant_status: Booking?.first_applicant_status,
      second_applicant_name: Booking?.second_applicant_name,
      second_applicant_father_name: Booking?.second_applicant_father_name,
      second_applicant_husband_name: Booking?.second_applicant_husband_name,
      second_applicant_contact_number: Booking?.second_applicant_contact_number,
      second_applicant_email: Booking?.second_applicant_email,
      second_applicant_dob: Booking?.second_applicant_dob,
      second_applicant_pan_number: Booking?.second_applicant_pan_number,
      second_applicant_occupation: Booking?.second_applicant_occupation,
      second_applicant_address: Booking?.second_applicant_address,
      second_applicant_relation_with_first_applicant: Booking?.second_applicant_relation_with_first_applicant,
      third_applicant_name: Booking?.third_applicant_name,
      third_applicant_phone_number: Booking?.third_applicant_phone_number,
      fourth_applicant_name: Booking?.fourth_applicant_name,
      fourth_applicant_phone_number: Booking?.fourth_applicant_phone_number,
      second_applicant_adhar_number: Booking?.second_applicant_adhar_number,
      price_with_tax: Booking?.totalAmount,
      totalAmount: Booking?.totalAmount,
      extra_facility: state?.selectedFacilities,
      bookingPrice:Booking?.booking_price,
      unitPrice:Booking?.unitPrice
    })
    if (res.status === 200) {
      swal('Building Updated successfully!', 'success')
      setTimeout(() => {
        history.go(0);
      }, 2000);
    }
  }

  const getPrice = async (id,unit_price) => {
    const data = {
      Project: Booking.Project,
      building: buildingId.value
    };

    const res = await axios.post(`${process.env.REACT_APP_PORT}/api/booking/parking`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (res.data?.status === 200) {
      setBooking({ ...Booking, parking_price: res.data.price, unitPrice:unit_price });
    } else {
      setBooking({ ...Booking, parking_price:0, unitPrice:unit_price });
    }
  }
  const unitPriceFetch= async(id)=>{
    let price = 0.00;
    const resp = await axios.get(`${process.env.REACT_APP_PORT}/api/unit/${id}`);
    if (resp.status === 200 || resp.status === 304) {
      price = resp.data.pricewithtax;
    }
    await getPrice(id,price);
  }

  const closeEdit = () => {
    setBooking({ ...Booking, Project: null, building: null, floor: null, unit: null, flat: null, parking: null, booking_price: null, booking_date: null, allotment_date: null, agreement_date: null, first_applicant_name: null, first_applicant_father_name: null, first_applicant_husband_name: null, first_applicant_permanentAddress: null, first_applicant_correspondAddress: null, first_applicant_contactNumber: null, first_applicant_email: null, first_applicant_dob: null, first_applicant_AadharNumber: null, first_applicant_pan_number: null, first_applicant_City: null, first_applicant_police_station: null, first_applicant_country: null, first_applicant_occupation: null, first_applicant_religion: null, first_applicant_status: null, second_applicant_name: null, second_applicant_father_name: null, second_applicant_husband_name: null, second_applicant_contact_number: null, second_applicant_email: null, second_applicant_dob: null, second_applicant_pan_number: null, second_applicant_occupation: null, second_applicant_address: null, second_applicant_relation_with_first_applicant: null, third_applicant_name: null, third_applicant_phone_number: null, fourth_applicant_name: null, fourth_applicant_phone_number: null, second_applicant_adhar_number: null, id: null })
    setIsEdit(false);
  }

  const getTotalPrice = async() => {
    let price = (Booking?.parking_price !== null && Booking?.parking >= 1) ? parseFloat(calculateTotalPrice()) + parseFloat((Booking.parking_price * Booking.parking)+((Booking.parking_price * Booking.parking)*0.01)) : calculateTotalPrice();
    if(Booking.demandRate !== null && Booking.unitPrice !== null){
      price = parseFloat(price) +(parseFloat(Booking.unitPrice));
      setBooking({ ...Booking, totalAmount: price.toFixed(2)})
    }
  }



  return (
    <>
      <div className="container bg-white p-2 rounded-2">
        <form className="row px-4 py-4 mx-2 my-2 justify-content-center shadow-lg">
          <h3 className="text-alternate text-primary">Set Booking</h3>
          <hr />

          <div className="col-md-6 col-12 mb-2">
            <p className="text-alternate">Select Project</p>
            <div className="input-group">
              <select className="form-control" id="project" onChange={(e) => { handleInputs(e); getBuildings(e.target.value); }} name="Project" value={Booking.Project}>
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
              <select className="form-control" id="building" name="building" onChange={(e) => { handleInputs(e); getBuildingDetail(e.target.value); getUnits(e.target.value, Booking?.Project); }} value={Booking.building} >
                {Booking.Project === null ? <option value={null} name={null} >First select Project</option>
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
              <select className="form-control" id="floor" name="floor" onChange={handleInputs} value={Booking.floor}>
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
              <select className="form-control" id="unit" name="unit" onChange={async(e) => { handleInputs(e); await unitPriceFetch(e.target.value); }} value={Booking.unit}>
                {Booking.Project === null && Booking.building === null && <option value={null} name={null}>Select Project First</option>}
                {Booking.building === null && Booking.Project !== null && <option value={null} name={null}>Select Building First</option>}
                {Booking.building !== null && Booking.Project !== null && allUnits === null && <option value={null} name={null}>Loading...</option>}
                {allUnits !== null &&
                  <>
                    {allUnits.length === 0
                      ? <option value={null} name={null}>No Units Avaliable.</option>
                      : <option value={null} name={null}>Select Unit</option>

                    }
                    {
                     Booking.floor===null ?
                     <option value={null} name={null}>Select Floor</option>
                    :
                    allUnits.length > 0 &&
                    allUnits.map((i) => {
                      let s= "";
                      s=i.unit_name;
                      s=s.slice(0,1);
                      if(s===Booking.floor)
                      {
                        return (
                        <option value={i?._id} name={i?._id}>
                          {i?.unit_name}
                        </option>
                      );
                      }
                    }) 
                    }
                  </>
                }
              </select>
            </div>
          </div>

          <div className="col-md-4 col-12 mb-2">
            <p className="text-alternate">Parking</p>
            <input
              type="number"
              aria-label="Parking No"
              placeholder="Enter Parking No"
              className="form-control"
              id="parking"
              name="parking"
              required=""
              value={Booking.parking}
              onChange={(e) => { handleInputs(e); }}
            />
          </div>
          <div className="col-md-4 col-12 mb-2">
            <p className="text-alternate">Parking Price</p>
            {Booking.parking_price !== null ?
            <input
            type="number"
            aria-label="Parking Price"
            placeholder="Parking Price"
            className="form-control"
            id="parking_price"
            step="0.01"
            name="parking_price"
            required=""
            value={Booking.parking_price}
            onChange={(e) => { handleInputs(e); }}
          />
           : <p className="text-alternate">Loading...</p>}
          </div>
          <div className="col-md-4 col-12 mb-2">
            <p className="text-alternate">Booking Price</p>
            <input
              type="number"
              aria-label="Parking No"
              placeholder="Booking Price"
              className="form-control"
              id="booking_price"
              name="booking_price"
              required=""
              value={Booking.booking_price}
              onChange={(e) => { handleInputs(e); }}
            />
          </div>
          <div className="col-md-4 col-12 mb-2">
            <p className="text-alternate">Unit Selling Price</p>
            <input
              type="number"
              aria-label="Parking No"
              placeholder="Unit Selling Price"
              className="form-control"
              id="unitPrice"
              name="unitPrice"
              required=""
              value={Booking.unitPrice}
              onChange={(e) => { handleInputs(e);}}
            />
          </div>

          <div className="col-12 my-2">
            <DataTableCustom state={state} setState={setState} />
          </div>
          {/* <div className="col-12 my-2">
             <DataTableCustom state={stage} setState={setStage} />
            
          </div> */}
          <div className="row my-1">
            <div className="col-md-7 col-12 mb-2">
              {/* <p className="text-alternate">Total Amount</p> */}
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="totalAmount"
                  name="totalAmount"
                  value={Booking.totalAmount}
                  onChange={handleInputs}
                  required=""
                  disabled
                  placeholder="Click to Fetch Total Price"
                />
              </div>
            </div>
            <div className="col-md-3 col-12 mb-2">
              <button onClick={()=>getTotalPrice()} class="btn btn-outline-primary btn-md " type="button">Fetch Total Price</button>
            </div>
          </div>
          <div className="row">
            <h5 className="text-alternate">Maintenance Charges</h5>
            <hr />
            <div className="col-md-3 col-12">
               <p className="text-alternate">Total Saleable Area</p>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="totalSaleableArea"
                  name="totalSaleableArea"
                  value={}
                  onChange={}
                  required=""
                  disabled
                  placeholder="Can't Find"
                />
              </div>
            </div>
            <div className="col-md-3 col-12">
               <p className="text-alternate">Charges Per sqft</p>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="totalSaleableArea"
                  name="totalSaleableArea"
                  value={}
                  onChange={}
                  required=""
                  disabled
                  placeholder="Can't Find"
                />
              </div>
            </div>
            <div className="col-md-3 col-12">
               <p className="text-alternate">Total No Of Year</p>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  id="totalSaleableArea"
                  name="totalSaleableArea"
                  value={}
                  onChange={}
                  required=""
                  disabled
                  placeholder="Can't Find"
                />
              </div>
            </div>
            <div className="col-md-3 col-12">
               <p className="text-alternate">Total Maintenance Charge</p>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="totalSaleableArea"
                  name="totalSaleableArea"
                  value={}
                  onChange={}
                  required=""
                  disabled
                  placeholder="Can't Find"
                />
              </div>
            </div>
          </div>

          <div className="col-md-4 col-12 mb-2">
            <p className="text-alternate"> Booking Date</p>
            <div className="input-group">
              <input
                type="date"
                className="form-control"
                id="bookingDate"
                required=""
                name="booking_date"
                value={Booking.booking_date}
                onChange={handleInputs}
              />
            </div>
          </div>
          <div className="col-md-4 col-12 mb-2">
            <p className="text-alternate"> Allotment Date</p>
            <div className="input-group">
              <input
                type="date"
                className="form-control"
                id="allotmentDate"
                value={Booking.allotment_date}
                name="allotment_date"
                onChange={handleInputs}
                required=""
              />
            </div>
          </div>
          <div className="col-md-4 col-12 mb-2">
            <p className="text-alternate"> Agreement Date</p>
            <div className="input-group">
              <input
                type="date"
                className="form-control"
                id="agreementDate"
                value={Booking.agreement_date}
                name="agreement_date"
                onChange={handleInputs}
                required=""
              />
            </div>
          </div>


          <h3 className="text-alternate text-primary">First Applicant</h3>
          <hr />
          <div className="col-md-12 col-12 mb-2">
            <p className="text-alternate"> First Applicant Name</p>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="applicantName"
                value={Booking.first_applicant_name}
                name="first_applicant_name"
                onChange={handleInputs}
                required=""
              />
            </div>
          </div>
          <div className="col-md-6 col-12 mb-2">
            <p className="text-alternate"> Father Name</p>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="fatherName"
                onChange={handleInputs}
                value={Booking.first_applicant_father_name}
                name="first_applicant_father_name"
                required=""
              />
            </div>
          </div>
          <div className="col-md-6 col-12 mb-2">
            <p className="text-alternate"> Husband Name</p>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="husbandName"
                onChange={handleInputs}
                value={Booking.first_applicant_husband_name}
                name="first_applicant_husband_name"
                required=""
              />
            </div>
          </div>
          <div className="col-md-6 col-12">
            <p className="text-alternate">Permanent Address</p>
            <div className="input-group mb-2">
              <textarea
                className="form-control"
                id="permanentDes"
                value={Booking.first_applicant_permanentAddress}
                name="first_applicant_permanentAddress"
                onChange={handleInputs}
                required=""
              ></textarea>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <p className="text-alternate">Correspondence Address</p>
            <div className="input-group mb-2">
              <textarea
                className="form-control"
                id="correspondenceDes"
                value={Booking.first_applicant_correspondAddress}
                name="first_applicant_correspondAddress"
                onChange={handleInputs}
                required=""
              ></textarea>
            </div>
          </div>
          <div className="col-md-4 col-12 mb-2">
            <p className="text-alternate"> Contact No.</p>
            <div className="input-group">
              <input
                type="number"
                className="form-control"
                id="contactNo"
                onChange={handleInputs}
                value={Booking.first_applicant_contactNumber}
                name="first_applicant_contactNumber"
                required=""
              />
            </div>
          </div>
          <div className="col-md-4 col-12 mb-2">
            <p className="text-alternate"> Email</p>
            <div className="input-group">
              <input
                type="email"
                className="form-control"
                id="email"
                onChange={handleInputs}
                value={Booking.first_applicant_email}
                name="first_applicant_email"
                required=""
              />
            </div>
          </div>
          <div className="col-md-4 col-12 mb-2">
            <p className="text-alternate"> Date of Birth</p>
            <div className="input-group">
              <input
                type="date"
                className="form-control"
                id="dob"
                onChange={handleInputs}
                value={Booking.first_applicant_dob}
                name="first_applicant_dob"
                required=""
              />
            </div>
          </div>
          <div className="col-md-6 col-12 mb-2">
            <p className="text-alternate"> ADHAR No</p>
            <div className="input-group">
              <input
                type="number"
                className="form-control"
                id="adhar"
                onChange={handleInputs}
                value={Booking.first_applicant_AadharNumber}
                name="first_applicant_AadharNumber"
                required=""
              />
            </div>
          </div>
          <div className="col-md-3 col-12 mb-2">
            <p className="text-alternate"> Pan No</p>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="pan"
                onChange={handleInputs}
                value={Booking.first_applicant_pan_number}
                name="first_applicant_pan_number"
                required=""
              />
            </div>
          </div>
          <div className="col-md-3 col-12 mb-2">
            <p className="text-alternate"> City</p>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="city"
                onChange={handleInputs}
                value={Booking.first_applicant_City}
                name="first_applicant_City"
                required=""
              />
            </div>
          </div>
          <div className="col-md-6 col-12 mb-2">
            <p className="text-alternate"> Police Station</p>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="policeStation"
                onChange={handleInputs}
                value={Booking.first_applicant_police_station}
                name="first_applicant_police_station"
                required=""
              />
            </div>
          </div>

          <div className="col-md-6 col-12 mb-2">
            <p className="text-alternate"> Country</p>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="country"
                onChange={handleInputs}
                value={Booking.first_applicant_country}
                name="first_applicant_country"
                required=""
              />
            </div>
          </div>

          <div className="col-md-4 col-12 mb-2">
            <p className="text-alternate"> Occupation</p>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="occupation"
                onChange={handleInputs}
                value={Booking.first_applicant_occupation}
                name="first_applicant_occupation"
                required=""
              />
            </div>
          </div>
          <div className="col-md-4 col-12 mb-2">
            <p className="text-alternate"> Relegion</p>
            <div className="input-group">
              <select className="form-control" id="relegion" onChange={handleInputs} value={Booking.first_applicant_religion} name="first_applicant_religion" >
                <option value="">-- select one --</option>
                <option value="Hinduism">Hinduism</option>
                <option value="Islam">Islam</option>
                <option value="Christianity">Christianity</option>
                <option value="Sikhism">Sikhism</option>
                <option value="Buddhism">Buddhism</option>
                <option value="Jainism">Jainism</option>
                <option value="Judaism">Judaism</option>
                <option value="Secular">Secular</option>
                <option value="Agnostic">Agnostic</option>
                <option value="Atheist">Atheist</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <h3 className="text-alternate text-primary">Co Applicant Details</h3>
          <hr />
          <div className="col-md-12 col-12 mb-2">
            <p className="text-alternate"> Second Applicant Name</p>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="secondApplicantName"
                onChange={handleInputs}
                value={Booking?.second_applicant_name}
                name="second_applicant_name"
                required=""
              />
            </div>
          </div>
          <div className="col-md-6 col-12 mb-2">
            <p className="text-alternate"> Father Name</p>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="secondApplicantFatherName"
                onChange={handleInputs}
                value={Booking?.second_applicant_father_name}
                name="second_applicant_father_name"
                required=""
              />
            </div>
          </div>
          <div className="col-md-6 col-12 mb-2">
            <p className="text-alternate"> Husband Name</p>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="secondApplicantHusbandName"
                onChange={handleInputs}
                value={Booking?.second_applicant_husband_name}
                name="second_applicant_husband_name"
                required=""
              />
            </div>
          </div>


          <div className="col-md-4 col-12 mb-2">
            <p className="text-alternate"> Contact No.</p>
            <div className="input-group">
              <input
                type="number"
                className="form-control"
                id="secondApplicantContactNo"
                onChange={handleInputs}
                value={Booking?.second_applicant_contact_number}
                name="second_applicant_contact_number"
                required=""
              />
            </div>
          </div>
          <div className="col-md-4 col-12 mb-2">
            <p className="text-alternate"> Email</p>
            <div className="input-group">
              <input
                type="email"
                className="form-control"
                id="secondApplicantEmail"
                onChange={handleInputs}
                value={Booking?.second_applicant_email}
                name="second_applicant_email"
                required=""
              />
            </div>
          </div>
          <div className="col-md-4 col-12 mb-2">
            <p className="text-alternate"> Date of Birth</p>
            <div className="input-group">
              <input
                type="date"
                className="form-control"
                id="secondApplicantDob"
                onChange={handleInputs}
                value={Booking?.second_applicant_dob}
                name="second_applicant_dob"
                required=""
              />
            </div>
          </div>
          <div className="col-md-4 col-12 mb-2">
            <p className="text-alternate"> ADHAR No</p>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="secondApplicantAadhar"
                onChange={handleInputs}
                value={Booking?.second_applicant_adhar_number}
                name="second_applicant_adhar_number"
                required=""
              />
            </div>
          </div>
          <div className="col-md-4 col-12 mb-2">
            <p className="text-alternate"> Pan No</p>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="pan"
                onChange={handleInputs}
                value={Booking?.second_applicant_pan_number}
                name="second_applicant_pan_number"
                required=""
              />
            </div>
          </div>
          <div className="col-md-4 col-12 mb-2">
            <p className="text-alternate"> Occupation</p>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="secondApplicantOccupation"

                onChange={handleInputs}
                value={Booking?.second_applicant_occupation}
                name="second_applicant_occupation"
                required=""
              />
            </div>
          </div>
          <div className="col-md-12 col-12">
            <p className="text-alternate">Permanent Address</p>
            <div className="input-group mb-2">
              <textarea
                className="form-control"
                id="secondApplicantPermanentAddress"
                onChange={handleInputs}
                value={Booking?.second_applicant_address}
                name="second_applicant_address"
                required=""
              ></textarea>
            </div>
          </div>
          <div className="col-md-12 col-12 mb-2">
            <p className="text-alternate"> Relation With First Applicant</p>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="relationWithFirstApplicant"
                onChange={handleInputs}
                value={Booking?.second_applicant_relation_with_first_applicant}
                name="second_applicant_relation_with_first_applicant"
                required=""
              />
            </div>
          </div>


          <h3 className="text-alternate text-primary">More Co Applicant</h3>
          <hr />
          <div className="col-md-6 col-12 mb-2">
            <p className="text-alternate"> Third Applicant Name</p>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="thirdApplicantName"
                onChange={handleInputs}
                value={Booking?.third_applicant_name}
                name="third_applicant_name"
                required=""
              />
            </div>
          </div>
          <div className="col-md-6 col-12 mb-2">
            <p className="text-alternate"> Third Applicant Phone No</p>
            <div className="input-group">
              <input
                type="number"
                className="form-control"
                id="thirdApplicantPhoneNo"

                onChange={handleInputs}
                value={Booking?.third_applicant_phone_number}
                name="third_applicant_phone_number"
                required=""
              />
            </div>
          </div>
          <div className="col-md-6 col-12 mb-2">
            <p className="text-alternate"> Forth Applicant Name</p>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="forthApplicantName"
                onChange={handleInputs}
                value={Booking?.fourth_applicant_name}
                name="fourth_applicant_name"
                required=""
              />
            </div>
          </div>
          <div className="col-md-6 col-12 mb-2">
            <p className="text-alternate"> Forth Applicant Phone No</p>
            <div className="input-group">
              <input
                type="number"
                className="form-control"
                id="forthApplicantPhoneNo"
                onChange={handleInputs}
                value={Booking?.fourth_applicant_phone_number}
                name="fourth_applicant_phone_number"
                required=""
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
                    closeEdit();
                  }}
                >
                  {" "}
                  Exit{" "}
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-md mb-1 mr-1"
                  onClick={() => updateBooking(Booking.id)}
                >
                  {" "}
                  Update{" "}
                </button>
              </>
            ) : (
              <button
                type="button"
                class="btn btn-outline-primary btn-md mb-1 mr-1"
                onClick={() => uploadBooking()}
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
            <h3 className="text-alternate text-primary">All Bookings</h3>
            <div className="d-flex justify-content-center">
              <table className="table table-striped table-responsive">
                <tr>
                  <th>Sno.</th>
                  <th>First Applicant</th>
                  <th>Contact No</th>
                  <th>Booking Price</th>
                  <th>Action</th>
                </tr>
                {AllBooking?.map((i, j) => {
                  let id = i?._id;
                  return (
                    <tr>
                      <td>{j + 1}</td>
                      <td>{i?.first_applicant_name}</td>
                      <td>{i?.first_applicant_contactNumber}</td>
                      <td>{i?.booking_price}</td>
                      <td>
                        <Edit className="cursor-pointer" color="green" size={30} onClick={() => { edit(i) }} />
                        <Trash
                          className="cursor-pointer"
                          color="red"
                          size={30}
                          onClick={() => {
                            deleteBooking(id);
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </form>
        }
      </div>
    </>
  );
};


export default SetBooking;

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

  const toggleFacility = async (facility) => {
    // Check if the facility is already in selectedFacilities
    const isAlreadySelected = await state.selectedFacilities.some(
      (selectedFacility) => selectedFacility.extra_facility === facility.extra_facility
    );

    if (isAlreadySelected) {
      // Remove the facility from selectedFacilities
      const updatedSelectedFacilities = await state.selectedFacilities.filter(
        (selectedFacility) => selectedFacility.extra_facility !== facility.extra_facility
      );
      setState({ ...state, selectedFacilities: updatedSelectedFacilities });
    } else {
      // Add the facility to selectedFacilities
      setState({
        ...state,
        selectedFacilities: [...state.selectedFacilities, facility],
      });
    }
  };


  if (state?.data?.length > 0) {

    return (
      <div>
        <CardHeader>
          <h5>Select Extra Facilities</h5>
        </CardHeader>
        <CardBody className="rdt_Wrapper">
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Select</th>
                <th>Extra Facility</th>
                <th>Name</th>
                <th>SGST</th>
                <th>CGST</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {state.data.map((facility) => (
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      onChange={() => { toggleFacility(facility); }}
                      checked={state.selectedFacilities.some(
                        (selectedFacility) =>
                          selectedFacility.extra_facility === facility.extra_facility
                      )}
                    />
                  </td>
                  <td>{facility.extra_facility}</td>
                  <td>{facility.name}</td>
                  <td>{facility.sgst}</td>
                  <td>{facility.cgst}</td>
                  <td>{facility.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </div>
    );
  } else {
    return (
      <CardHeader>
        <h5>No Extra Facilities Avaliable</h5>
      </CardHeader>
    )
  }
}
