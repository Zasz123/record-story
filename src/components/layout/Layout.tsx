import styled, { ThemeProvider } from 'styled-components';
import GlobalStyles from 'styles/GlobalStyles';
import Theme from 'styles/Theme';

import Sidebar from '../sidebar/Sidebar';
import useArticleList from './hooks/useArticleList';

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
  const articles = useArticleList();

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <Container>
        <Sidebar articles={articles} />
        <ArticleContainer>{children}</ArticleContainer>
      </Container>
    </ThemeProvider>
  );
}

export default Layout;
