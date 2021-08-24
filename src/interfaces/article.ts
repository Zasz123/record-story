export interface IArticle {
  title: string;
  startDate: Date;
  endDate: Date;
  images: IArticleImage[];
  path: string;
}

export interface IArticleImage {
  id: string;
  publicURL: string;
}
