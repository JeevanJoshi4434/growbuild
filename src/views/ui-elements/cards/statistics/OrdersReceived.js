import React from "react"
import StatisticsCard from "../../../../components/@vuexy/statisticsCard/StatisticsCard"
import { Package } from "react-feather"
import { ordersReceived, ordersReceivedSeries } from "./StatisticsData"

class OrdersReceived extends React.Component {
  render() {
    return (
      <StatisticsCard
        icon={this.props.Icon}
        iconBg="warning"
        stat={this.props.data}
        statTitle={this.props.Title}
        options={ordersReceived}
        series={ordersReceivedSeries}
        type="area"
      />
    )
  }
}
export default OrdersReceived
