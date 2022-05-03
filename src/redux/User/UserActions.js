import { USER_LOGIN, USER_LOGOUT } from "../actionsType";

export function acLogin(pData) {
  console.log(pData, "useractions");
  return {
    type: USER_LOGIN,
    payload: pData,
  };
}

export function acLogout(pData) {
  return {
    type: USER_LOGOUT,
    payload: pData,
  };
}
