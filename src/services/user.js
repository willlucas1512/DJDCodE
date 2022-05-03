import Axios from "axios";
import { REGISTER_USER_URI, LOGIN_USER_URI, GET_USER_URI } from "./URI";

export const register = (data) => {
  Axios({
    method: "POST",
    data: {
      username: data.username,
      password: data.password,
    },
    withCredentials: true,
    url: REGISTER_USER_URI,
  }).then((res) => console.log(res));
};

export const login = (data) => {
  Axios({
    method: "POST",
    data: {
      username: data.username,
      password: data.password,
    },
    withCredentials: true,
    url: LOGIN_USER_URI,
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
