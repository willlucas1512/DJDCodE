import Axios from "axios";
import { SAVE_COURSE_URI } from "./URI";

export const save = (pData, pSuccess, pError) => {
  Axios({
    method: "POST",
    data: {
      course: pData.course,
      user: {
        _id: JSON.parse(localStorage.getItem("user"))._id,
        courses: JSON.parse(localStorage.getItem("user")).courses,
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

export default { save };
