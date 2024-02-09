import React from "react"
import StatisticsCard from "../../../../components/@vuexy/statisticsCard/StatisticsCard"
import { Users } from "react-feather"
import { subscribersGained, subscribersGainedSeries } from "./StatisticsData"

class SubscriberGained extends React.Component {
  render() {
    return (
      <StatisticsCard
        icon={this.props.Icon}
        stat={this.props.data}
        statTitle={this.props.Title}
        options={subscribersGained}
        series={subscribersGainedSeries}
        type="area"
      />
    )
  }
}
export default SubscriberGained
