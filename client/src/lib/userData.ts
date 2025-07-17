interface UserData {
  id: number;
  name: string;
  username: string;
  email: string;
  avatar: string;
  created_at: string;
  updated_at: string;
}
const userData = () => {
  const userDataString = localStorage.getItem("UserData");
  const userData: UserData = userDataString ? JSON.parse(userDataString) : null;
  const userDataUpdated = {
    id: userData.id,
    name: ConvertToUpperCase(userData.name),
    username: GenerateUsername(userData.name),
    avatar: userData.avatar,
    created_at: userData.created_at,
    updated_at: userData.updated_at,
  };
  return userDataUpdated;
};
function GenerateUsername(name: string) {
  const username = "@" + name + Math.floor(Math.random() * 100);
  return username;
}
function ConvertToUpperCase(data: string) {
  const upperCaseData = data.charAt(0).toUpperCase() + data.slice(1);
  return upperCaseData;
}

export { ConvertToUpperCase, userData };
