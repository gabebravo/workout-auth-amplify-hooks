import React, { Fragment, Component } from 'react'
import { Query } from 'react-apollo'
import { getExcerciseInfo } from '../../../queries';
import Button from '@material-ui/core/Button';
import Highcharts from 'highcharts/highstock'
import Chart from '../Chart'
import Header from '../../../shared/Header'

const chartOptions = {
  title: {
    text: 'Cardio'
  },
  subtitle: {
    text: 'Bench Press: max minutes completed'
  },
  xAxis: {
    type: 'datetime',
    dateTimeLabelFormats: { // don't display the dummy year
      month: '%e. %b',
      year: '%b'
    },
    title: {
      text: 'Date'
    }
  },
  yAxis: {
    title: {
      text: 'Minutes as numbers'
    },
    min: 0
  },
  plotOptions: {
    spline: {
      marker: {
        enabled: true
      }
    }
  },

  colors: ['#000'],

  responsive: {
    rules: [{
        condition: {
            maxWidth: 500
        },
        chartOptions: {
            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
            }
        }
    }]
  },

  // Define the data points. All series have a dummy year
  // of 1970/71 in order to be compared on the same x axis. Note
  // that in JavaScript, months start at 0 for January, 1 for February etc.
  // series: [{
  //   name: "max wieght",
  //   data: [
  //     [Date.UTC(1970, 9, 15), 100],
  //     [Date.UTC(1970, 9, 31), 110],
  //     [Date.UTC(1970, 10,  7), 112],
  //     [Date.UTC(1970, 10, 10), 120],
  //     [Date.UTC(1970, 11, 10), 122],
  //     [Date.UTC(1970, 11, 13), 125],
  //     [Date.UTC(1970, 11, 16), 124],
  //     [Date.UTC(1970, 11, 19), 132],
  //     [Date.UTC(1970, 11, 22), 135],
  //     [Date.UTC(1970, 11, 25), 128],
  //     [Date.UTC(1970, 11, 28), 140],
  //     [Date.UTC(1971, 0, 16), 142],
  //     [Date.UTC(1971, 0, 19), 137]
  //   ]
  // }]
}

const getDate = date => date.split('-')
.map( (num, index) => index === 1 ? Number(num - 1) : Number(num))

const drawChart = ( exercises = []) => {
  if( exercises.length > 0 ) {
    const chartData = { 
      name: "max minutes",
      data: exercises.map( exercise => [ Date.UTC(...getDate(exercise.date)), exercise.minutes])
    }
    return {...chartOptions, series: chartData }
  } return chartOptions
};

class CardioChart extends Component {

  componentDidMount() {
    // Force a render without state change...
    this.forceUpdate();
  }

  workoutNav = workoutId => {
    this.props.history.push(`/workout/${workoutId}`);
  }

  render() {
    const { name, workoutId } = this.props.match.params
    return (
      <Fragment>
        <Header />
        <div>
          <Button
            onClick={ () => this.workoutNav(workoutId) }
            color="primary"
          >BACK</Button>
        </div>
        <Query query={getExcerciseInfo} variables={{ 
          filter: {
            name: {
              eq: name
            }
          }, limit: 10
          }}>
          {({ data }) => (
            <div style={{ 'marginTop': '2rem' }}>
              <Chart options={drawChart(data.listExercises && data.listExercises.items ? data.listExercises.items : <div>...Loading</div>)} highcharts={Highcharts} />
            </div>
        )}
        </Query>
      </Fragment>
    )
  }
}

export default CardioChart;