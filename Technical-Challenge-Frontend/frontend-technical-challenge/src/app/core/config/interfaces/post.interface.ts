import { User } from './user.interface';

export interface Post {
  id: number;
  title: string;
  content: string;
  status: string;
  user: User;
}

export interface MyPost{
  id: number;
  title: string;
  content: string;
  status: string;
  at_created: string
}

export interface CreatePost{
  title: string;
  content: string;
}

export interface UpdatePost{
  id: number;
  title: string;
  content: string;
}
