export interface BaseTweet {
  text: string;
  createdAt?: string;
  userId: number;
}

export interface Tweet extends BaseTweet {
  id: number;
  user: {
    id: number;
    name: string;
  } | null;
  likesCount: number;
  hasLiked: boolean;
  hasBookmarked: boolean;
}

export interface CreateTweet {
  text: string;
  createdAt?: string;
  userId: number;
}

export interface UpdateTweet {
  id: number;
  text: string;
}

export interface DeleteTweet {
  id: number;
}

// -------- Bookmark Interfaces --------
export interface BookmarkByUserId {
  bookmark?: string;
}

// -------- Query Interfaces --------
export interface FindOneTweet {
  id: number;
}

export interface FindManyTweet {
  userId?: number;
  count?: number; // defaults handled by backend (10)
  page?: number; // defaults handled by backend (1)
}
