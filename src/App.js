import { ScreenOrientation } from "./components";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  const Store = store();
  return (
    <Provider store={Store.store}>
      <PersistGate loading={null} persistor={Store.persistor}>
        <ScreenOrientation />
      </PersistGate>
    </Provider>
  );
}

export default App;
