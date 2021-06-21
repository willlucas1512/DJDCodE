import Navbar from "./Navbar";
import ThemeProvider from "./ThemeProvider";
import { themePrimary } from "./style/theme";
// import Maker from "./Maker";
import Levels from "./Levels/Levels";
import CodeProvider from "./Run/CodeProvider";

function App() {
  return (
    <ThemeProvider theme={themePrimary}>
      <Navbar />
      <CodeProvider>
        {/* <Maker /> */}
        <Levels />
      </CodeProvider>
    </ThemeProvider>
  );
}

export default App;
