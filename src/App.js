import Navbar from "./Navbar";
import ThemeProvider from "./ThemeProvider";
import { themePrimary } from "./style/theme";
// import Maker from "./Maker";
import BlocksLevel1 from "./BlocksLevel1";
import CodeProvider from "./Run/CodeProvider";

function App() {
  return (
    <ThemeProvider theme={themePrimary}>
      <Navbar />
      <CodeProvider>
        {/* <Maker /> */}
        <BlocksLevel1 />
      </CodeProvider>
    </ThemeProvider>
  );
}

export default App;
