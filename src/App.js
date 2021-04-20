import Navbar from "./Navbar";
import ThemeProvider from "./ThemeProvider";
import { themePrimary } from "./style/theme";
// import Maker from "./Maker";
import Labirinto from "./Labirinto";
// import Style from "./App.module.scss";

function App() {
  return (
    <ThemeProvider theme={themePrimary}>
      <Navbar />
      {/* <Maker /> */}
      <Labirinto />
    </ThemeProvider>
  );
}

export default App;
