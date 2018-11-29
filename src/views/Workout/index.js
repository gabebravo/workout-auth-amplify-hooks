import React, { Component } from "react";
import { Query } from 'react-apollo'
import { getExcercises } from '../../queries';
import Button from '@material-ui/core/Button';
import Header from '../../shared/Header';
import ExerciseList from './components/ExerciseList';
import { withRouter } from "react-router";

class Workout extends Component {

  workoutNav = items => {
    if( items.length > 0 ) {
      this.props.history.push(`/dashboard/${items[0].userId}`);
    }
  }

  render() {
    const { match } = this.props;
    return (
      <Query query={getExcercises} variables={{ 
        filter: {
          workoutId: {
            eq: match.params.workoutId
          }
        }
        }}>
        {({ data }) => (
          <div>
            <Header />
            <div>
              <Button
                onClick={ () => this.workoutNav( data.listExercises && data.listExercises.items ? data.listExercises.items : [] ) }
                color="primary"
              >BACK</Button>
            </div>
            <ExerciseList exercises={ data.listExercises && data.listExercises.items ? data.listExercises.items : [] } />
          </div>
        )}
      </Query>
    );
  }
}

export default withRouter(Workout);