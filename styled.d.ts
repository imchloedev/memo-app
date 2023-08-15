import "styled-components/native";

declare module "styled-components/native" {
  export interface ModeTheme {
    dark: {
      color: {
        white: string;
        black: string;
        container: string;
        textColor: string;
        bg: string;
        modalBg: string;
        separator: string;
        iconColor: string;
        buttonColor: string;
        commonWhite: string;
        commonBlack: string;
        commonMiddleGray: string;
        activeColor: string;
        deactiveColor: string;
        boxActiveColor: string;
      };
    };

    light: {
      color: {
        white: string;
        black: string;
        container: string;
        textColor: string;
        bg: string;
        modalBg: string;
        separator: string;
        iconColor: string;
        buttonColor: string;
        commonWhite: string;
        commonBlack: string;
        commonMiddleGray: string;
        activeColor: string;
        deactiveColor: string;
        boxActiveColor: string;
      };
    };
  }
}
