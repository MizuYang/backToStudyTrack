
export interface Article {
  title: string;
  // 建立此 notion 筆記的日期 年-月-時分, 例: 2023-1001-1200
  notionCardId: string;
  // notion 筆記的連結參數
  notionPath: string;
  component?: Component | null;
}

export interface Articles {
  [key: string]: {
    [key: string]: Article[];
  };
}

export interface UseArticle {
  article: Ref<Article>;
  articles: Ref<Article[]>;
}
