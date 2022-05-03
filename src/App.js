import { ScreenOrientation } from "./components";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./redux";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ScreenOrientation />{" "}
      </PersistGate>
    </Provider>
  );
}

export default App;
