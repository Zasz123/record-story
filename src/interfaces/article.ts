export interface ISidebarItem {
  id: string;
  path: string;
  images: Array<IArticleImage>;
  thumbnail: string;
}

export interface IArticle {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;
  images: IArticleImage[];
  path: string;
}

export interface IArticleImage {
  id: string;
  url: string;
}
