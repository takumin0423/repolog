import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

const id = uuid("id").primaryKey().defaultRandom();
const createdAt = timestamp("created_at", { withTimezone: true })
  .notNull()
  .defaultNow();
const updatedAt = timestamp("updated_at", { withTimezone: true })
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date());

export const users = pgTable("users", {
  id: id,
  name: varchar("name", { length: 100 }).notNull(),
  createdAt: createdAt,
  updatedAt: updatedAt,
});

export const reports = pgTable("reports", {
  id: id,
  title: varchar("title", { length: 100 }).notNull(),
  content: text("content").notNull(),
  articleTitle: text("article_title").notNull(),
  articleUrl: text("article_url").notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: createdAt,
  updatedAt: updatedAt,
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertReport = typeof reports.$inferInsert;
export type SelectReport = typeof reports.$inferSelect;
