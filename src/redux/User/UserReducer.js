import { USER_LOGIN, USER_LOGOUT } from "../actionsType";

const INITIAL_STATE = {
  user: { name_first: "", name_last: "", email: "", usuario_id: null },
};

const RESET_STATE = {
  ...INITIAL_STATE,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        user: { ...action.payload },
      };
    case USER_LOGOUT:
      return {
        ...RESET_STATE,
      };
    default:
      return state;
  }
}
