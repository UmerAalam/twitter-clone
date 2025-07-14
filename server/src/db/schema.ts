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
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: text().notNull(),
});

export const tweetsTable = pgTable("tweets", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  text: text().notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  createdAt: timestamp().notNull().defaultNow(),
});
// export const likesTable = pgTable("likes", {
//   id: integer().primaryKey().generatedAlwaysAsIdentity(),
//   tweetId: integer("tweet_id")
//     .notNull()
//     .references(() => tweetsTable.id),
//   created_at: timestamp().notNull().defaultNow(),
// });
