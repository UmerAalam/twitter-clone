import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: text().notNull(),
  bio: text().notNull(),
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
  id: integer().primaryKey().generatedAlwaysAsIdentity().notNull(),
  text: text().notNull(),
  tweetId: integer("tweet_id")
    .notNull()
    .references(() => tweetsTable.id),
  createdAt: timestamp().notNull().defaultNow(),
});
export const likesTable = pgTable(
  "tweets_likes",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: integer("user_id").references(() => usersTable.id),
    tweetId: integer("tweet_id").references(() => tweetsTable.id),
    createdAt: timestamp().notNull().defaultNow(),
  },
  (table) => ({
    uniqueLike: unique().on(table.userId, table.tweetId),
  }),
);
