import { Hono } from "hono";
import {
  createCommentSchema,
  updateCommentSchema,
  type UpdateComment,
} from "./comment.dto.js";

import { zValidator } from "@hono/zod-validator";
import {
  createCommentPostgres,
  findManyComment,
  findOneComment,
  deleteComment,
  updateComment,
} from "./comment.service.js";

export const commentsRouter = new Hono()
  .basePath("comments")
  .post("/", zValidator("json", createCommentSchema), async (c) => {
    const body = await c.req.json();
    const addedComment = await createCommentPostgres(body);
    return c.json(addedComment, 201);
  })
  .get("/", async (c) => {
    const comments = await findManyComment({});
    return c.json(comments, 200);
  })
  .get("/:id", async (c) => {
    const id = c.req.param("id");
    const comments = await findOneComment({ id });
    return c.json(comments, 200);
  })
  .delete("/:id", async (c) => {
    const id = c.req.param("id");
    const comment = await deleteComment({ id });
    if (!comment) {
      return c.json({ message: "Comment Not Found" }, 404);
    }

    return c.json(comment);
  })
  .patch(
    "/:id",
    zValidator(
      "json",
      updateCommentSchema.pick({
        text: true,
      }),
    ),
    async (c) => {
      const id = c.req.param("id");
      const body: UpdateComment = await c.req.json();
      const comment = await updateComment({ id, text: body.text });
      if (!comment) {
        return c.json({ message: "Comment Not Found" }, 404);
      }
      return c.json(comment);
    },
  );
