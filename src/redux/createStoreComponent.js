import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const createStoreComponent = (pAppReducer) => {
  const devTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();

  applyMiddleware(thunk)(createStore)(pAppReducer, devTools);
};
export default createStoreComponent;
