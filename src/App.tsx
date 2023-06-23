/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {ThemeProvider} from 'styled-components';
import Navigator from '~/Navigator';
import {theme} from '@styles/theme';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

function App(): JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  return (
    <ThemeProvider theme={theme}>
      <Navigator />
    </ThemeProvider>
  );
}

export default App;
