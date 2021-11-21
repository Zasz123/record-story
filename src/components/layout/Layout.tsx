import styled, { ThemeProvider } from 'styled-components';
import GlobalStyles from 'styles/GlobalStyles';
import Theme from 'styles/Theme';

import useArticleList from './hooks/useArticleList';

import { LayoutProvider } from './Layout.provider';

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
`;

function Layout({ children, location }: any) {
  const articles = useArticleList();

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <Container>
        {/* 선택된 index를 위한 provider */}
        <LayoutProvider>
          <Sidebar articles={articles} pathname={location.pathname} />
          <ArticleContainer>{children}</ArticleContainer>
        </LayoutProvider>
      </Container>
    </ThemeProvider>
  );
}

export default Layout;
