import Axios from "axios";
import { SAVE_COURSE_URI, GET_COURSES_URI } from "./URI";

export const save = (pData, pSuccess, pError) => {
  const xUser = JSON.parse(localStorage.getItem("user"));
  Axios({
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "ngrok-skip-browser-warning": true,
    },
    data: {
      course: pData.course,
      thumbnail: pData.course.thumbnail,
      user: {
        _id: xUser._id,
        name_first: xUser.name_first,
        name_last: xUser.name_last,
        courses: xUser.courses,
      },
    },
    // withCredentials: true,
    url: SAVE_COURSE_URI,
  })
    .then((res) => {
      pSuccess && pSuccess(res.data);
    })
    .catch((error) => {
      pError && pError(error.response);
    });
};

export const getUserCourses = (pSuccess, pError) => {
  Axios({
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "ngrok-skip-browser-warning": true,
    },
    // withCredentials: true,
    url: GET_COURSES_URI + JSON.parse(localStorage.getItem("user"))._id,
  })
    .then((res) => {
      pSuccess && pSuccess(res.data);
    })
    .catch((error) => {
      pError && pError(error.response);
    });
};

export const getCourses = (pSuccess, pError) => {
  Axios({
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "ngrok-skip-browser-warning": true,
    },
    // withCredentials: true,
    url: SAVE_COURSE_URI,
  })
    .then((res) => {
      pSuccess && pSuccess(res.data);
    })
    .catch((error) => {
      pError && pError(error.response);
    });
};

export default { save, getUserCourses, getCourses };
