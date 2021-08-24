import styled, { ThemeProvider } from 'styled-components';
import GlobalStyles from 'styles/GlobalStyles';
import Theme from 'styles/Theme';

import Sidebar from '../sidebar/Sidebar';

const Container = styled.main`
  width: 100%;
  height: 100vh;

  overflow: hidden;

  display: flex;
  flex-direction: row;
`;

const ArticleContainer = styled.main`
  width: 1350px;
  height: 100%;

  padding: 40px;
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
        <ArticleContainer>{children}</ArticleContainer>
      </Container>
    </ThemeProvider>
  );
}

export default Layout;
