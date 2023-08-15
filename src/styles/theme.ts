import { ModeTheme } from "styled-components/native";

const common = {
  color: {
    commonWhite: "#FFFFFF",
    commonBlack: "#000000",
    commonMiddleGray: "#555",
    activeColor: "#DE5E69",
    deactiveColor: "#DE5E6950",
    boxActiveColor: "#DE5E6940",
  },
};

const theme: ModeTheme = {
  dark: {
    color: {
      white: "#ffffff",
      black: "#000",
      container: "#222",
      textColor: "#fff",
      bg: "#121212",
      modalBg: "#151515",
      separator: "#333",
      iconColor: "#fff",
      buttonColor: "#fff",
      ...common.color,
    },
  },
  light: {
    color: {
      black: "#000",
      white: "#ffffff",
      container: "#eee",
      textColor: "#000",
      bg: "#ffffff",
      modalBg: "#eee",
      separator: "#ddd",
      iconColor: "#999",
      buttonColor: "#000",
      ...common.color,
    },
  },
};

const { light, dark } = theme;

export { dark, light };
