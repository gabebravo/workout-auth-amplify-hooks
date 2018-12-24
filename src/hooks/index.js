import { useState } from "react";

// SIGN UP FORM HOOKS
const signupState = {
  username: '',
  password: '',
  email: '',
  phone_number: '',
  authCode: '',
  showConfirmation: false
}

export const signUpHooks = () => {
  const [fieldsObj, fieldSetter] = useState(signupState);
  return { fieldsObj, fieldSetter };
};

// SIGN IN FORM HOOKS
const signinState = {
  username: '',
  password: '',
  showConfirmation: false,
  user: {},
  authCode: '',
  showModal: false,
  modalMessage: ''
}

export const signInHooks = () => {
  const [fieldsObj, fieldSetter] = useState(signinState);
  return { fieldsObj, fieldSetter };
};