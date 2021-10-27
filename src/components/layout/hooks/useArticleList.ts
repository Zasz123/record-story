import { useStaticQuery, graphql } from 'gatsby';

export default function useArticleList() {
  const articles = useStaticQuery(graphql`
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
  }));

  return articles;
}
