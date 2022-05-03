import Axios from "axios";
import { REGISTER_USER_URI, LOGIN_USER_URI, GET_USER_URI } from "./URI";

export const login = (pData) => {
  console.log(pData);
  Axios({
    method: "POST",
    data: {
      email: pData.email,
      password: pData.password,
    },
    withCredentials: true,
    url: LOGIN_USER_URI,
  }).then((res) => console.log(res));
};

export const register = (pData) => {
  console.log(pData);
  Axios({
    method: "POST",
    data: {
      name_first: pData.name_first,
      name_last: pData.name_last,
      email: pData.email,
      password: pData.password,
    },
    withCredentials: true,
    url: REGISTER_USER_URI,
  }).then((res) => console.log(res));
};

export const getUser = () => {
  Axios({
    method: "GET",
    withCredentials: true,
    url: GET_USER_URI,
  }).then((res) => {
    console.log(res.data);
  });
};

export default { register, login, getUser };
