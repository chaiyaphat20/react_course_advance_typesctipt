import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import * as ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import router from "./routes/root";
import theme from "./theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <RouterProvider router={router} />
    <Toaster />
  </ThemeProvider>
  // </React.StrictMode>,
);
