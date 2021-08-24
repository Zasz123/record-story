export interface IArticle {
  title: string;
  startDate: Date;
  endDate: Date;
  images: any[]; // TODO: 타입 수정 필요
  path: string;
}
