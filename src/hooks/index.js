
import React, { useState } from "react";
import ReactDOM from "react-dom";

const initialState = {
    username: '',
    password: '',
    email: '',
    phone_number: '',
    authCode: '',
    showConfirmation: false
  }

  export const signUpHooks = () => {
    const [fieldsObj, fieldSetter] = useState(initialState);
    return { fieldsObj, fieldSetter };
  };