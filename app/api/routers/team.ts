import { z } from "zod";
import { eq, asc } from "drizzle-orm";
import { createRouter, publicQuery, adminQuery } from "../middleware";
import { getDb } from "../queries/connection";
import * as schema from "@db/schema";

export const teamRouter = createRouter({
  // Public: List active team members
  list: publicQuery.query(async () => {
    const items = await getDb()
      .select()
      .from(schema.teamMembers)
      .where(eq(schema.teamMembers.active, true))
      .orderBy(asc(schema.teamMembers.displayOrder));
    return items;
  }),

  // Admin: Create team member
  create: adminQuery
    .input(
      z.object({
        name: z.string().min(1).max(255),
        role: z.string().min(1).max(255),
        bio: z.string().optional(),
        image: z.string().optional(),
        email: z.string().email().optional(),
        linkedin: z.string().optional(),
        displayOrder: z.number().default(0),
        active: z.boolean().default(true),
      })
    )
    .mutation(async ({ input }) => {
      await getDb().insert(schema.teamMembers).values(input);
      return { success: true };
    }),

  // Admin: Update team member
  update: adminQuery
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(1).max(255).optional(),
        role: z.string().min(1).max(255).optional(),
        bio: z.string().optional(),
        image: z.string().optional(),
        email: z.string().email().optional(),
        linkedin: z.string().optional(),
        displayOrder: z.number().optional(),
        active: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      await getDb()
        .update(schema.teamMembers)
        .set(data)
        .where(eq(schema.teamMembers.id, id));
      return { success: true };
    }),

  // Admin: Delete team member
  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await getDb()
        .delete(schema.teamMembers)
        .where(eq(schema.teamMembers.id, input.id));
      return { success: true };
    }),
});
