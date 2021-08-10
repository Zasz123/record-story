import styled, { ThemeProvider } from 'styled-components';
import GlobalStyles from 'styles/GlobalStyles';
import Theme from 'styles/Theme';

import Sidebar from './Sidebar';

const Container = styled.main`
  width: 100%;
  height: 100%;

  display: grid;
`;

interface IProps {
  children: React.ReactNode;
}

function Layout({ children }: IProps) {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <Container>
        <Sidebar />
        {children}
      </Container>
    </ThemeProvider>
  );
}

export default Layout;
