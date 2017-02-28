 interface IPost {
  id?: number;
  url?: string;
  user?: string;
  title: string;
  description: string;
  created_on?: Date;
  modified_on?: Date;
  keywords?: string[];
}

export default IPost;