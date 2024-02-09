import React from "react";
import { Row, Col } from "reactstrap";
import SalesCard from "./SalesCard";
import SuberscribersGained from "../../ui-elements/cards/statistics/SubscriberGained";
import OrdersReceived from "../../ui-elements/cards/statistics/OrdersReceived";
// import AvgSession from "../../ui-elements/cards/analytics/AvgSessions";
// import SupportTracker from "../../ui-elements/cards/analytics/SupportTracker";
// import ProductOrders from "../../ui-elements/cards/analytics/ProductOrders";
import SalesStat from "../../ui-elements/cards/analytics/Sales";
import ActivityTimeline from "./ActivityTimeline";
// import DispatchedOrders from "./DispatchedOrders"
import "../../../assets/scss/pages/dashboard-analytics.scss";
import axios from "axios";
import { Bell, Book, FileText, Package, Users } from "react-feather";

let $primary = "#7367F0",
  $danger = "#EA5455",
  $warning = "#FF9F43",
  $info = "#00cfe8",
  $primary_light = "#9c8cfc",
  $warning_light = "#FFC085",
  $danger_light = "#f29292",
  $info_light = "#1edec5",
  $stroke_color = "#e8e8e8",
  $label_color = "#e7eef7",
  $white = "#fff";

class AnalyticsDashboard extends React.Component {
  state = {
    data: [],
  }
  numberFormatter(number) {
    let result = '';
    if (number >= 1000000000) {
        result = (number / 1000000000).toFixed(1) + 'B';
    } else if (number >= 1000000) {
        result = (number / 1000000).toFixed(1) + 'M';
    } else if (number >= 1000) {
        result = (number / 1000).toFixed(1) + 'K';
    } else {
        result = number?.toString();
    }
    return result;
}
  componentDidMount() {
    this.getData();
  }
  data = {
    bookingStat: {
      bookings: 7,
      total: 19,
    }
    ,
    buildings: 4,
    customers: 7,
    demands: 18,
    projects: 3,
    totalPrice: 262524.44,
    totalPriceCollected: 9978.44,
    totalUnits: 19
  };
  getData = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_PORT + `/api/get/stats`);
      if (res.status === 200) {
        this.setState({
          data: res.data
        })
        console.log({ data: this.state.data, resp: res.data });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  render() {
    return (
      <React.Fragment>
        <Row className="match-height">
          <Col lg="6" md="12">
            <SalesCard />
          </Col>
          <Col lg="3" md="6" sm="12">
            <SuberscribersGained data={this.numberFormatter(this.state.data.customers) || `Loading...`} Icon={<Users className="primary" size={22} />} Title={"Customers"}  />
          </Col>
          <Col lg="3" md="6" sm="12">
            <OrdersReceived data={this.numberFormatter(this.state.data.totalUnits) || `Loading...`} Icon={<Package className="warning" size={22} />} Title={"Total Units"} />
          </Col>
        </Row>
        <Row className="match-height">
          {/* <Col lg="6" md="6" sm="12">
            <SalesStat
              strokeColor={$stroke_color}
              infoLight={$info_light}
              primary={$primary}
              info={$info}
            />
          </Col> */}
          <Col lg="3" md="6" sm="12">
            <SuberscribersGained data={this.numberFormatter(this.state.data.bookingStat?.bookings) || `Loading...`} Icon={<Book className="primary" size={22} />} Title={"Bookings"} />
          </Col>
          <Col lg="3" md="6" sm="12">
            <OrdersReceived data={this.numberFormatter(parseInt(this.state.data.bookingStat?.total-this.state.data.bookingStat?.bookings)) || `Loading...`} Icon={<Package className="warning" size={22} />} Title={"Salable Units"} />
          </Col>
          <Col lg="3" md="6" sm="12">
            <SuberscribersGained data={this.numberFormatter(this.state.data.totalPrice) || `Loading...`} Icon={<FileText className="primary" size={22} />} Title={"Total Payment Raised"} />
          </Col>
          <Col lg="3" md="6" sm="12">
            <OrdersReceived data={this.numberFormatter(this.state.data.totalPriceCollected) || `Loading...`} Icon={<Bell className="warning" size={22} />} Title={"Total Payment Collected"} />
          </Col>
        </Row>
        {/* <Row className="match-height">
          <Col lg="4">
            <ProductOrders
              primary={$primary}
              warning={$warning}
              danger={$danger}
              primaryLight={$primary_light}
              warningLight={$warning_light}
              dangerLight={$danger_light}
            />
          </Col>

          <Col lg="4">
            <ActivityTimeline />
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <DispatchedOrders />
          </Col>
        </Row> */}
      </React.Fragment>
    );
  }
}

export default AnalyticsDashboard;
