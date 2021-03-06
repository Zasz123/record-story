import { useStaticQuery, graphql } from 'gatsby';

import { ISidebarItem } from '@interfaces/article';

export default function useArticleList() {
  const articles: Array<ISidebarItem> = useStaticQuery(graphql`
    query MyQuery {
      allMdx(sort: { fields: frontmatter___id, order: ASC }) {
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
    images: item.frontmatter.images.map((item: any) => ({ id: item.id, url: item.publicURL })),
  }));

  return articles;
}
