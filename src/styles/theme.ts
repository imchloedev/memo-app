import { DefaultTheme } from "styled-components/native";

const common: DefaultTheme = {
  color: {
    commonWhite: "#FFFFFF",
    commonBlack: "#000000",
    commonMiddleGray: "#555",
    activeColor: "#DE5E69",
    deactiveColor: "#DE5E6950",
    boxActiveColor: "#DE5E6940",
  },
};

const dark: DefaultTheme = {
  color: {
    white: "#ffffff",
    black: "#000",
    container: "#222",
    textColor: "#fff",
    bg: "#121212",
    modalBg: "#151515",
    separator: "#333",
    iconColor: "#999",
    ...common.color,
  },
};

const light: DefaultTheme = {
  ...dark,
  color: {
    black: "#000",
    white: "#ffffff",
    container: "#eee",
    textColor: "#000",
    bg: "#ffffff",
    modalBg: "#eee",
    separator: "#ddd",
    iconColor: "#999",
    ...common.color,
  },
};

export { dark, light };
