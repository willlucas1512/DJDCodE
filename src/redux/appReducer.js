import { combineReducers } from "redux";
import userReducer from "./User/UserReducer";

const appReducer = combineReducers({
  user: userReducer,
});

export default appReducer;
