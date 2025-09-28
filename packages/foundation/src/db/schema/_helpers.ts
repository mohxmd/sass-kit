import { timestamp, uuid } from "drizzle-orm/pg-core";

export const id = uuid().primaryKey().defaultRandom();
export const createdAt = timestamp({ withTimezone: true }).notNull().defaultNow();
export const updatedAt = timestamp({ withTimezone: true })
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date());
export const deletedAt = timestamp({ withTimezone: true });

export const timestamps = { createdAt, updatedAt };
