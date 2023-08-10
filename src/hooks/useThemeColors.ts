import { useColorScheme } from "react-native";
import { dark, light } from "styles/theme";

const useThemeColors = () => {
  const mode = useColorScheme();
  const currentTheme = mode === "light" ? light : dark;

  return currentTheme;
};
export default useThemeColors;
