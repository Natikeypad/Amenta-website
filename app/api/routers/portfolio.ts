import { z } from "zod";
import { eq, asc } from "drizzle-orm";
import { createRouter, publicQuery, adminQuery } from "../middleware";
import { getDb } from "../queries/connection";
import * as schema from "@db/schema";

export const portfolioRouter = createRouter({
  // Public: List active portfolio projects
  list: publicQuery.query(async () => {
    const items = await getDb()
      .select()
      .from(schema.portfolioProjects)
      .where(eq(schema.portfolioProjects.active, true))
      .orderBy(asc(schema.portfolioProjects.displayOrder));
    return items;
  }),

  // Admin: Create project
  create: adminQuery
    .input(
      z.object({
        title: z.string().min(1).max(255),
        description: z.string().optional(),
        image: z.string().optional(),
        stat1Value: z.string().optional(),
        stat1Label: z.string().optional(),
        stat2Value: z.string().optional(),
        stat2Label: z.string().optional(),
        stat3Value: z.string().optional(),
        stat3Label: z.string().optional(),
        displayOrder: z.number().default(0),
        active: z.boolean().default(true),
      })
    )
    .mutation(async ({ input }) => {
      await getDb().insert(schema.portfolioProjects).values(input);
      return { success: true };
    }),

  // Admin: Update project
  update: adminQuery
    .input(
      z.object({
        id: z.number(),
        title: z.string().min(1).max(255).optional(),
        description: z.string().optional(),
        image: z.string().optional(),
        stat1Value: z.string().optional(),
        stat1Label: z.string().optional(),
        stat2Value: z.string().optional(),
        stat2Label: z.string().optional(),
        stat3Value: z.string().optional(),
        stat3Label: z.string().optional(),
        displayOrder: z.number().optional(),
        active: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      await getDb()
        .update(schema.portfolioProjects)
        .set(data)
        .where(eq(schema.portfolioProjects.id, id));
      return { success: true };
    }),

  // Admin: Delete project
  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await getDb()
        .delete(schema.portfolioProjects)
        .where(eq(schema.portfolioProjects.id, input.id));
      return { success: true };
    }),
});
