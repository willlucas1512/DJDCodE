import { ScreenOrientation } from "./components";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import configureStore from "./redux/configureStore";

function App() {
  const xConfigureStore = configureStore();
  return (
    <Provider store={xConfigureStore.store}>
      <PersistGate loading={null} persistor={xConfigureStore.persistor}>
        <ScreenOrientation />
      </PersistGate>
    </Provider>
  );
}

export default App;
