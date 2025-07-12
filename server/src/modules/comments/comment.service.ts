import sql from "../../db.js";
import type {
  FindManyComment,
  Comment,
  CreateComment,
  FindOneComment,
  DeleteComment,
  UpdateComment,
} from "./comment.dto.js";

export const findManyComment = async (
  _props: FindManyComment,
): Promise<Comment[]> => {
  const commentList = await sql<Comment[]>`SELECT * FROM comments`;
  return commentList;
};

export const createCommentPostgres = async (
  props: CreateComment,
): Promise<Comment> => {
  const { name, username, time, text, comments, reposts, likes, shares } =
    props;

  const id = crypto.randomUUID();
  const comment = await sql<Comment[]>`
  INSERT INTO comments
      (id, name, username, time, text,comments,reposts,likes,shares) 
      VALUES(${id},${name}, ${username}, ${time}, ${text},${comments},${reposts},${likes},${shares}) 
  RETURNING *;
`;

  return comment[0];
};

export const findOneComment = async ({
  id,
}: FindOneComment): Promise<Comment> => {
  const comment = await sql<Comment[]>`SELECT * FROM comments WHERE id = ${id}`;
  return comment[0];
};

export const deleteComment = async ({
  id,
}: DeleteComment): Promise<Comment | undefined> => {
  const exists = await findOneComment({ id });
  if (!exists) {
    return;
  }

  const deletedComment = await sql<
    Comment[]
  >`DELETE FROM comments WHERE id = ${id} RETURNING *`;

  return deletedComment[0];
};

export const updateComment = async ({
  id,
  text,
}: UpdateComment): Promise<Comment | undefined> => {
  const exists = await findOneComment({ id });
  if (!exists) {
    return;
  }

  const updatedComment = await sql<
    Comment[]
  >`UPDATE comments SET text=${text} WHERE id = ${id} RETURNING *`;

  return updatedComment[0];
};
