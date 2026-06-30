import { z } from "zod";
import { eq, desc } from "drizzle-orm";
import { createRouter, publicQuery, adminQuery } from "../middleware";
import { getDb } from "../queries/connection";
import * as schema from "@db/schema";

export const contactRouter = createRouter({
  // Public: Submit a contact form
  submit: publicQuery
    .input(
      z.object({
        name: z.string().min(1).max(255),
        email: z.string().email().max(320),
        subject: z.string().min(1).max(255),
        message: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      await getDb().insert(schema.contacts).values({
        name: input.name,
        email: input.email,
        subject: input.subject,
        message: input.message,
        status: "new",
      });
      return { success: true, message: "Thank you! Your message has been sent." };
    }),

  // Admin: List all contacts
  list: adminQuery
    .input(
      z.object({
        status: z.enum(["new", "read", "replied", "archived"]).optional(),
        limit: z.number().min(1).max(100).default(50),
        offset: z.number().min(0).default(0),
      }).optional()
    )
    .query(async ({ input }) => {
      const params = input ?? { limit: 50, offset: 0 };
      const db = getDb();
      let query = db.select().from(schema.contacts);
      if (params?.status) {
        query = query.where(eq(schema.contacts.status, params.status)) as typeof query;
      }
      const items = await query.orderBy(desc(schema.contacts.createdAt)).limit(params.limit).offset(params.offset);
      const countResult = await db.select({ count: schema.contacts.id }).from(schema.contacts);
      return { items, total: countResult.length };
    }),

  // Admin: Update contact status
  updateStatus: adminQuery
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["new", "read", "replied", "archived"]),
      })
    )
    .mutation(async ({ input }) => {
      await getDb()
        .update(schema.contacts)
        .set({ status: input.status })
        .where(eq(schema.contacts.id, input.id));
      return { success: true };
    }),
});
