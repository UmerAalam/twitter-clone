interface Tweet {
  id: string;
  name: string;
  username: string;
  time: string;
  text: string;
  comments: number;
  reposts: number;
  likes: number;
  shares: number;
}
interface UserData {
  email: string;
  password: string;
}
interface SignUpUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export type { SignUpUser, UserData, Tweet };
