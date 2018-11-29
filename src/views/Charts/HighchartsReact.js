import React, { Component } from 'react'

class HighchartsReact extends Component {
  componentDidMount() {
    var p = this.props
    var highcharts = p.highcharts || window.Highcharts
    var constructorType = p.constructorType || 'chart'
    // Create chart
    this.chart = highcharts[constructorType](this.container, Object.assign({}, p.options))
  }

  shouldComponentUpdate(nextProps, nextState) {
    var update = this.props.update
    // Update if not specified or set to true
    return (typeof update === 'undefined') || update
  }

  componentDidUpdate() {
    this.chart.update(Object.assign({}, this.props.options), true, !(this.props.oneToOne === false))
  }

  componentWillReceiveProps() {
    this.chart.update(Object.assign({}, this.props.options), true, !(this.props.oneToOne === false))
  }

  componentWillUnmount() {
    // Destroy chart
    this.chart.destroy()
  }

  render() {
    var self = this
    var containerProps = this.props.containerProps || {}

    // Add ref to div props
    containerProps.ref = function (container) { self.container = container }

    // Create container for our chart
    return React.createElement('div', containerProps)
  }
  
}

export default HighchartsReact