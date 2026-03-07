export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  date: string;
  readingTime?: number;
  author?: string;
  image?: string;
}
