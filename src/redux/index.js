import persistStore from " ./persistStore";
import createStoreComponent from "./createStoreComponent";
import appReducer from "./appReducer";

const store = createStoreComponent(appReducer);
const persistor = persistStore(store);

export { store, persistor };

export default store;
