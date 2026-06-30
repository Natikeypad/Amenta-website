import { z } from "zod";
import { eq, desc } from "drizzle-orm";
import { createRouter, publicQuery, adminQuery } from "../middleware";
import { getDb } from "../queries/connection";
import * as schema from "@db/schema";

export const newsletterRouter = createRouter({
  // Public: Subscribe to newsletter
  subscribe: publicQuery
    .input(
      z.object({
        email: z.string().email().max(320),
      })
    )
    .mutation(async ({ input }) => {
      try {
        await getDb().insert(schema.newsletters).values({
          email: input.email,
          status: "active",
        });
        return { success: true, message: "Thank you for subscribing!" };
      } catch (error: any) {
        if (error.message?.includes("Duplicate") || error.code === "ER_DUP_ENTRY") {
          return { success: true, message: "You're already subscribed!" };
        }
        throw error;
      }
    }),

  // Public: Unsubscribe
  unsubscribe: publicQuery
    .input(
      z.object({
        email: z.string().email(),
      })
    )
    .mutation(async ({ input }) => {
      await getDb()
        .update(schema.newsletters)
        .set({ status: "unsubscribed" })
        .where(eq(schema.newsletters.email, input.email));
      return { success: true, message: "You have been unsubscribed." };
    }),

  // Admin: List all subscribers
  list: adminQuery
    .input(
      z.object({
        status: z.enum(["active", "unsubscribed"]).optional(),
        limit: z.number().min(1).max(500).default(100),
        offset: z.number().min(0).default(0),
      }).optional()
    )
    .query(async ({ input }) => {
      const params = input ?? { limit: 100, offset: 0 };
      const db = getDb();
      let query = db.select().from(schema.newsletters);
      if (params?.status) {
        query = query.where(eq(schema.newsletters.status, params.status)) as typeof query;
      }
      const items = await query.orderBy(desc(schema.newsletters.createdAt)).limit(params.limit).offset(params.offset);
      return { items, total: items.length };
    }),
});
