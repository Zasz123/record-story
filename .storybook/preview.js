import { addDecorator } from '@storybook/react';
import { makeDecorator } from '@storybook/addons';
import { withThemesProvider } from 'storybook-addon-styled-component-theme';
import { ThemeProvider } from 'styled-components';
import Theme from '../src/styles/Theme';
import GlobalStyles from '../src/styles/GlobalStyles';

const withGlobal = makeDecorator({
  name: 'withGlobalStyle',
  parameterName: '',
  wrapper: (getStory, context) => {
    return (
      <>
        <GlobalStyles />
        {getStory(context)}
      </>
    );
  },
});

addDecorator(withGlobal);
// addDecorator((s) => (
//   <>
//     <GlobalStyles />
//   </>
// ));
addDecorator(withThemesProvider([Theme]), ThemeProvider);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
