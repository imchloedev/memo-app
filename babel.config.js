module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    "babel-plugin-styled-components",
    [
      "react-native-reanimated/plugin",
      {
        relativeSourceLocation: true,
      },
    ],
    [
      "module-resolver",
      {
        root: ["./src"],
        extensions: [
          ".ios.ts",
          ".android.ts",
          ".ts",
          ".ios.tsx",
          ".android.tsx",
          ".tsx",
          ".jsx",
          ".js",
          ".json",
        ],
        alias: {
          "~": "./src",
          components: "./src/components",
          screens: "./src/screens",
          assets: "./src/assets",
          styles: "./src/styles",
          api: "./src/api",
          utils: "./src/utils",
          hooks: "./src/hooks",
        },
      },
    ],
  ],
};
