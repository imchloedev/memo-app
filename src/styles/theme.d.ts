import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    common: {
      color: {
        commonWhite: string;
        commonBlack: string;
        activeColor: string;
        deactiveColor: string;
        boxActiveColor: string;
      };
    };

    dark: {
      color: {
        main: string;
        white: string;
        black: string;
        darkGray: string;
        textColor: string;
        bg: string;
        modalBg: string;
      };
    };
    light: {
      color: {
        main: string;
        white: string;
        black: string;
        textColor: string;
        bg: string;
        modalBg: string;
      };
    };
  }
}
