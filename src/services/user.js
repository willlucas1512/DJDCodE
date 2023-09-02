import Axios from "axios";
import {
  REGISTER_USER_URI,
  LOGIN_USER_URI,
  GET_USER_URI,
  RECOVER_PASSWORD_URI,
  RESET_PASSWORD_URI,
} from "./URI";

export const resetPass = (pData, pSuccess, pError) => {
  Axios({
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "ngrok-skip-browser-warning": true,
    },
    data: {
      token: pData.token,
      password: pData.password,
      confirmPassword: pData.confirmPassword,
    },
    // withCredentials: true,
    url: RESET_PASSWORD_URI,
  })
    .then((res) => {
      pSuccess && pSuccess(res.data);
    })
    .catch((error) => {
      pError && pError(error.response);
    });
};

export const recover = (pEmail, pSuccess, pError) => {
  Axios({
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "ngrok-skip-browser-warning": true,
    },
    data: {
      email: pEmail.email,
    },
    // withCredentials: true,
    url: RECOVER_PASSWORD_URI,
  })
    .then((res) => {
      pSuccess && pSuccess(res.data);
    })
    .catch((error) => {
      pError && pError(error.response);
    });
};

export const login = (pData, pSuccess, pError) => {
  Axios({
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "ngrok-skip-browser-warning": true,
    },
    data: {
      email: pData.email,
      password: pData.password,
    },
    //withCredentials: true,
    url: LOGIN_USER_URI,
  })
    .then((res) => {
      pSuccess && pSuccess(res.data);
    })
    .catch((error) => {
      pError && pError(error.response);
    });
};

export const register = (pData, pSuccess, pError) => {
  Axios({
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "ngrok-skip-browser-warning": true,
    },
    data: {
      name_first: pData.name_first,
      name_last: pData.name_last,
      email: pData.email,
      password: pData.password,
    },
    // withCredentials: true,
    url: REGISTER_USER_URI,
  })
    .then((res) => pSuccess && pSuccess(res.data))
    .catch((error) => {
      pError && pError(error.response);
    });
};

export const getUser = () => {
  Axios({
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "ngrok-skip-browser-warning": true,
    },
    // withCredentials: true,
    url: GET_USER_URI,
  }).then((res) => {
    console.log(res.data);
  });
};

export default { register, login, getUser, recover, resetPass };
