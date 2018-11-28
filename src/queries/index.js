import gql from 'graphql-tag';

export const getUserInfo = gql`
  query ($id: ID!) {
    getUser(id: $id) {
      id
      email
      firstName
      lastName
      password
    }
}`;

export const getUserWorkouts = gql`
query($filter: TableWorkoutFilterInput){
  listWorkouts(filter: $filter) {
    items {
      id
      userId
      date
    }
  }
}`;

export const getWorkoutInfo = gql`
query ($filter: TableExerciseFilterInput) {
  listExercises(filter: $filter) {
    items {
      id
      userId
      workoutId
      date
      category
      bodyPart
      name
    }
  }
}`;

export const getExcercises = gql`
query ($filter: TableExerciseFilterInput) {
  listExercises(filter: $filter) {
    items {
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
  }
}`;

export const getExcerciseInfo = gql`
query ($filter: TableExerciseFilterInput) {
  listExercises(filter: $filter) {
    items {
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
  }
}`;

export const getExerciseNames = gql`
query($filter: TableExerciseDefFilterInput){
  listExerciseDefs(filter: $filter) {
    items {
      name
    }
  }
}`;