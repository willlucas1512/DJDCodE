import { USER_LOGIN, USER_LOGOUT } from "../actionsType";

const INITIAL_STATE = {
  name_first: "",
  name_last: "",
  email: "",
  password: "",
};

const RESET_STATE = {
  ...INITIAL_STATE,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        ...action.payload,
      };
    case USER_LOGOUT:
      return {
        ...RESET_STATE,
      };
    default:
      return state;
  }
}
