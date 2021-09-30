import { createMuiTheme } from "@material-ui/core/styles";

export const themePrimary = {
  mui: createMuiTheme({
    palette: {
      type: "dark",
      common: { black: "#000", white: "#fff", transparent: "transparent" },
      background: {
        light: "#7a81ab",
        main: "#212121",
        dark: "#191b2a",
        contrastText: "#fff",
        paper: "rgba(38, 38, 59, 1)",
        default: "rgba(38, 38, 59, 1)",
      },
      primary: {
        light: "#5df2d6",
        main: "#00bfa5",
        dark: "#008e76",
        contrastText: "rgba(255, 255, 255, .87)",
      },
      secondary: {
        light: "#ff908b",
        main: "#f25e5e",
        dark: "#ba2934",
        darkness: "#191b2a",
        contrastText: "rgba(255, 255, 255, .87)",
      },
      error: {
        light: "#ff7957",
        main: "#ed442c",
        dark: "#b30000",
        contrastText: "rgba(255, 255, 255, .87)",
      },
      info: {
        light: "#869fd8",
        main: "#5671A6",
        dark: "#254677",
        contrastText: "rgba(255, 255, 255, .87)",
      },
      warn: {
        light: "#ffe650",
        main: "#f1b40f",
        dark: "#b98500",
        contrastText: "rgba(0, 0, 0, .87)",
      },
      text: {
        primary: "rgba(255, 255, 255, .87)",
        secondary: "#212427",
        disabled: "rgba(122, 129, 171, 1)",
        disabledInvert: "rgba(255, 255, 255, 0.48)",
        hint: "rgba(155, 155, 155, 1)",
      },
    },
    typography: {
      useNextVariants: true,
      fontFamily: ["Montserrat", "sans-serif"].join(","),
      fontSize: 14,
    },
  }),
};
