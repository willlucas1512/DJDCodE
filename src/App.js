import Navbar from "./Navbar";
import ThemeProvider from "./ThemeProvider";
import { themePrimary } from "./style/theme";
// import Maker from "./Maker";
import BlocksLevel1 from "./BlocksLevel1";
import "./App.module.scss";

function App() {
  return (
    <ThemeProvider theme={themePrimary}>
      <Navbar />
      {/* <Maker /> */}
      <BlocksLevel1 />
    </ThemeProvider>
  );
}

export default App;
