import theme from "./theme";

import { ThemeProvider } from "@material-ui/core/styles";
import { StylesProvider } from "@material-ui/core/styles";

import Rotas from "routes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <Rotas />
      </StylesProvider>
    </ThemeProvider>
  );
}

export default App;
