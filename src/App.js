import Navbar from "./Navbar";
import ThemeProvider from "./ThemeProvider";
import { themePrimary } from "./style/theme";
// import Maker from "./Maker";
import Levels from "./Levels/Levels";
import CodeProvider from "./Run/CodeProvider";
import LevelProvider from "./Levels/LevelProvider";

function App() {
  return (
    <ThemeProvider theme={themePrimary}>
      <LevelProvider>
        <Navbar />
        <CodeProvider>
          {/* <Maker /> */}

          <Levels />
        </CodeProvider>
      </LevelProvider>
    </ThemeProvider>
  );
}

export default App;
