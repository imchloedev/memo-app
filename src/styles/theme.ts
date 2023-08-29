import { ModeTheme } from "styled-components/native";

const common = {
  color: {
    commonWhite: "#FFFFFF",
    commonBlack: "#000000",
    commonMiddleGray: "#555",
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
      activeColor: "#DE5E69",
      deactiveColor: "#353535",
      boxActiveColor: "#DE5E6940",
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
      activeColor: "#DE5E69",
      deactiveColor: "#ccc",
      boxActiveColor: "#DE5E6940",
      ...common.color,
    },
  },
};

const { light, dark } = theme;

export { dark, light };
