import { useMemo } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import styled, { ThemeProvider } from 'styled-components';
import GlobalStyles from 'styles/GlobalStyles';
import Theme from 'styles/Theme';

import { ISidebarItem } from 'interfaces/article';
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
  const articles: Array<ISidebarItem> = useMemo(
    () =>
      useStaticQuery(graphql`
        query MyQuery {
          allMdx {
            nodes {
              id
              frontmatter {
                path
                thumbnail {
                  publicURL
                }
                images {
                  id
                  publicURL
                }
              }
            }
          }
        }
      `).allMdx.nodes.map((item: any) => ({
        id: item.id,
        path: item.frontmatter.path,
        thumbnail: item.frontmatter.thumbnail.publicURL,
        images: item.frontmatter.images,
      })),
    [],
  );

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
