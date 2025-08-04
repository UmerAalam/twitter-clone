import ComposedComment from "./ComposedComment";
import { Tweet } from "../../../server/src/modules/tweet/tweet.dto";
import { useCommentListByTweetId } from "../modules/comment/comments.query";
interface Props {
  tweet: Tweet;
}
function CommentList({ tweet }: Props) {
  const { data, isLoading } = useCommentListByTweetId(tweet.id);
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {data?.map((comment) => {
        return (
          <>
            <hr className="dark:text-gray-700 text-gray-200" />
            <ComposedComment
              key={comment.id}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl mt-3"
              comment={comment}
              userId={tweet.userId}
            />
          </>
        );
      })}
    </div>
  );
}
export default CommentList;
