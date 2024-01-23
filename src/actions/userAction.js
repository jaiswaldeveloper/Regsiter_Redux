// Install required packages: npm install react react-dom redux react-redux axios redux-thunk

import axios from "axios";
export const SignUpRequest = () => {
  return {
    type: "SIGN_UP_REQUEST",
  };
};
export const SignUpSuccess = (userData) => {
  console.log("SignUpSuccess Payload:", userData);  // Add this line

  return {
    type: "SIGN_UP_SUCCESS",
    payload: userData,
  };
};
export const SignUpFailure = (error) => {
  return {
    type: "SIGN_UP_FAILURE",
    payload: error,
  };
};


export const LogoOutRequest = ()=>{
  return {
    type : "LOGOUT_REQUEST",
  }
}
export const LogoOutSuccess = ()=>{
  return {
    type : "LOGOUT_SUCCESS",
   }
}
export const LogoOutFailure = (error)=>{
  return {
    type : "LOGOUT_FAILURE",
    payload: error
  }
}

export const signUp = (userData) => {
  return async (dispatch) => {
    dispatch(SignUpRequest());
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        userData
      );

      dispatch(SignUpSuccess(response.data));
    } catch (error) {
      dispatch(SignUpFailure(error.message));
    }
  };
};

export const LogOut = ()=>{
  return async (dispatch) =>{
    dispatch (LogoOutRequest())
    try {
      dispatch (LogoOutSuccess())

    } catch (error) {
      dispatch (LogoOutFailure(error.message))

    }
  }
}