import { GlobalStyles as MuiGlobalStyles } from "@mui/material";

export const GlobalStyles = () => (
  <MuiGlobalStyles
    styles={{
      body: { margin: 0, padding: 0 },
      a: { textDecoration: "none" },
    }}
  />
);
