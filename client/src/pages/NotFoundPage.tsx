import IconButton from "../components/IconButton.tsx";
import { useNavigate } from "react-router-dom";
const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-blue-500 text-white h-screen flex justify-center items-center">
      <div className="font-bold flex justify-center items-center flex-col">
        <h1 className="text-9xl">404</h1>
        <h2 className="flex justify-center text-xl">Not Found</h2>
        <PageIcon />
        <IconButton
          flex
          className="flex p-5 justify-center items-center h-12 rounded-full font-bold bg-white text-blue-500 hover:text-blue-300"
          onClick={() => {
            navigate("/");
          }}
        >
          Back To HomePage
        </IconButton>
      </div>
    </div>
  );
};
const PageIcon = () => {
  return <img src="sad.svg" width={100} />;
};
export default NotFoundPage;
