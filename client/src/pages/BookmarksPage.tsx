import BookmarkList from "../components/BookmarkList";

const BookmarksPage = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl">
      <div className="py-3 px-3 font-bold text-xl dark:text-white text-gray-800">
        Bookmarks
      </div>
      <div>
        <BookmarkList />
      </div>
    </div>
  );
};

export default BookmarksPage;
