export interface TweetBookmark {
  tweetId: number;
  createdAt: string; // ISO string date (frontend can convert to Date if needed)
}

export interface DeleteBookmark {
  tweetId: number;
}

export interface ListUserBookmark {
  userId: number;
}
