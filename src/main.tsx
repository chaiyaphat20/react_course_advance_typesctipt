import { ThemeProvider } from "@emotion/react";
import { Provider } from "react-redux";
import { CssBaseline } from "@mui/material";
import * as ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import router from "./routes/root";
import theme from "./theme";

//store
import { store } from "./redux-toolkit/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
    {/* </React.StrictMode>, */}
  </Provider>
);
