import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import appReducer from "./appReducer";

const configureStore = () => {
  const persistConfig = {
    key: "app",
    storage,
  };

  const persistedReducer = persistReducer(persistConfig, appReducer);
  const store = createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  const persistor = persistStore(store);
  return { persistor, store };
};
export default configureStore;
