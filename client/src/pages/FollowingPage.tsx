const FollowingPage = (props: { id?: number }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl">
      <div className="py-3 px-3 font-bold text-xl dark:text-white text-gray-800">
        Following
      </div>
      <div className="w-full bg-gray-800 rounded-2xl">{props.id}</div>
    </div>
  );
};

export default FollowingPage;
