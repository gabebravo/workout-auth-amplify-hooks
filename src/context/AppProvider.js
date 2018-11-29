import React from "react";
import { useImmerReducer } from "use-immer";
import { AppContext } from "./AppContext";

const DEFAULT_VALUES = {
    userId: null,
    workoutId: null,
    workoutDate: null,
    exerciseName: null
}

const globalReducer = (global, action) => {
  switch (action.type) {
    case "SET_VALUE":
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