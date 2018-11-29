import gql from 'graphql-tag';

export const ADD_WORKOUT = gql`
  mutation($input: CreateWorkoutInput!) {
    createWorkout(input: $input) {
      id
      userId
      date
    }
}`;

export const DELETE_WORKOUT = gql`
  mutation($input: DeleteWorkoutInput!) {
    deleteWorkout(input: $input) {
      id
      userId
      date
    }
}`;

export const ADD_EXERCISE_DEF = gql`
  mutation($input: CreateExerciseDefInput!) {
    createExerciseDef(input: $input) {
      id
      category
      bodyPart
      name
    }
}`;

export const ADD_EXERCISE = gql`
  mutation($input: CreateExerciseInput!) {
    createExercise(input: $input) {
      id
      userId
      workoutId
      date
      category
      bodyPart
      name
      reps
      sets
      weight
      miles
      minutes
    }
}`;