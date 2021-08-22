import styled, { ThemeProvider } from 'styled-components';
import GlobalStyles from 'styles/GlobalStyles';
import Theme from 'styles/Theme';

import Sidebar from '../sidebar/Sidebar';

const Container = styled.main`
  width: 100%;
  height: 100vh;

  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 570px 1fr;

  overflow: hidden;
`;

const ArticleContainer = styled.main`
  width: 100%;
  height: 100%;

  padding: 30px;
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
