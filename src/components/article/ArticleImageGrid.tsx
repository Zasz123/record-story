import styled from 'styled-components';
import { getImage, GatsbyImage } from 'gatsby-plugin-image';

import { IArticle } from 'interfaces/article';

const Container = styled.div`
  width: 100%;
  height: 400px;
  overflow: scroll;
`;

const Image = styled(GatsbyImage)`
  width: 400px;
  height: auto;
`;

interface IProps {
  images: IArticle['images'];
}

function ArticleImageGrid({ images }: IProps) {
  return (
    <Container>
      {images.map((item) => {
        const image = getImage(item);

        return image !== undefined && <Image image={image} alt="dsa" />;
      })}
    </Container>
  );
}

export default ArticleImageGrid;
