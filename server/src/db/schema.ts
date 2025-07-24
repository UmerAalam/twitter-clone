import { timeStamp } from "console";
import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: text().notNull(),
  avatar: varchar({ length: 255 }).notNull(),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});
export const tweetsTable = pgTable("tweets", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  text: text().notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  createdAt: timestamp().notNull().defaultNow(),
});
export const commentsTable = pgTable("comments", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  text: text().notNull(),
  tweetId: integer("tweet_id")
    .notNull()
    .references(() => tweetsTable.id),
  createdAt: timestamp().notNull().defaultNow(),
});
// export const likesTable = pgTable("likes", {
//   id: integer().primaryKey().generatedAlwaysAsIdentity(),
//   tweetId: integer("tweet_id")
//     .notNull()
//     .references(() => tweetsTable.id),
//   created_at: timestamp().notNull().defaultNow(),
// });
