export interface BaseTweet {
  name: string;
  username: string;
  time: string;
  text: string;
  comments: number;
  reposts: number;
  likes: number;
  shares: number;
}

export interface Tweet extends BaseTweet {
  id: string;
}

export interface CreateTweet extends BaseTweet {}

export interface UpdateTweet {
  id: string;
  text: string;
}

export interface DeleteTweet {
  id: string;
}

export interface FindOneTweet {
  id: string;
}

export interface FindManyTweet {}
