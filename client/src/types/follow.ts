export interface Follow {
  currentUser?: number; // optional
  targetUser: number;
  createdAt?: string; // optional ISO date string
}

export interface DeleteFollow {
  targetUser: number;
}

export interface FindFollowing {
  targetUserId?: number;
  page: number;
}

export interface FindFollowers {
  targetUser?: number;
  page: number;
}

export interface FollowersFollowingCount {
  targetUser: number;
}
