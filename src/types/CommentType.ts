import AuthorType from './AuthorType';

type CommentType = {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: AuthorType;
};

export default CommentType;
