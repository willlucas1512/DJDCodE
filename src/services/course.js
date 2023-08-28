import Axios from "axios";
import { SAVE_COURSE_URI, GET_COURSES_URI } from "./URI";

export const save = (pData, pSuccess, pError) => {
  const xUser = JSON.parse(localStorage.getItem("user"));
  Axios({
    method: "POST",
    data: {
      course: pData.course,
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
