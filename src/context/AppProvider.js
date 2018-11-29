import React from "react";
import { produce } from "immer";
import { AppContext } from "./AppContext";

const DEFAULT_VALUES = {
    userId: null,
    workoutId: null,
    workoutDate: null,
    exerciseName: null
}

// https://github.com/mweststrate/use-immer/blob/master/index.js
function useImmerReducer(reducer, initialState) {
  return React.useReducer(produce(reducer), initialState);
}

const globalReducer = (global, action) => {
  switch (action.type) {
    case "SET_VALUE":
    //   todos[action.i].complete = !todos[action.i].complete;
        global[action.key] = action.value;
      return;
    case "RESET":
      return DEFAULT_VALUES;
    default:
      return DEFAULT_VALUES;
  }
};

export default (props) => {
  const [global, dispatch] = useImmerReducer(globalReducer, DEFAULT_VALUES);

  return (
    <AppContext.Provider value={{ global, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
};