import { z } from "zod";
import { eq, desc } from "drizzle-orm";
import { createRouter, publicQuery, authedQuery, adminQuery } from "../middleware";
import { getDb } from "../queries/connection";
import * as schema from "@db/schema";

export const cropRouter = createRouter({
  // Public: List all crops
  list: publicQuery.query(async () => {
    const items = await getDb()
      .select()
      .from(schema.crops)
      .orderBy(desc(schema.crops.createdAt));
    return items;
  }),

  // Public: Get crop by ID
  getById: publicQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const rows = await getDb()
        .select()
        .from(schema.crops)
        .where(eq(schema.crops.id, input.id))
        .limit(1);
      return rows.at(0) ?? null;
    }),

  // Authed: Create crop
  create: authedQuery
    .input(
      z.object({
        name: z.string().min(1).max(255),
        variety: z.string().optional(),
        area: z.string().optional(),
        areaUnit: z.string().default("hectares"),
        status: z.enum(["planning", "planted", "growing", "harvesting", "completed"]).default("planning"),
        plantingDate: z.string().optional(),
        harvestDate: z.string().optional(),
        expectedYield: z.string().optional(),
        actualYield: z.string().optional(),
        yieldUnit: z.string().default("kg"),
        location: z.string().optional(),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      await getDb().insert(schema.crops).values({
        ...input,
        area: input.area ? input.area : null,
        plantingDate: input.plantingDate ? new Date(input.plantingDate) : null,
        harvestDate: input.harvestDate ? new Date(input.harvestDate) : null,
        expectedYield: input.expectedYield ? input.expectedYield : null,
        actualYield: input.actualYield ? input.actualYield : null,
      });
      return { success: true };
    }),

  // Authed: Update crop
  update: authedQuery
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(1).max(255).optional(),
        variety: z.string().optional(),
        area: z.string().optional(),
        areaUnit: z.string().optional(),
        status: z.enum(["planning", "planted", "growing", "harvesting", "completed"]).optional(),
        plantingDate: z.string().optional(),
        harvestDate: z.string().optional(),
        expectedYield: z.string().optional(),
        actualYield: z.string().optional(),
        yieldUnit: z.string().optional(),
        location: z.string().optional(),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      const updateData: Record<string, any> = { ...data };
      if (data.plantingDate) updateData.plantingDate = new Date(data.plantingDate);
      if (data.harvestDate) updateData.harvestDate = new Date(data.harvestDate);
      await getDb()
        .update(schema.crops)
        .set(updateData)
        .where(eq(schema.crops.id, id));
      return { success: true };
    }),

  // Admin: Delete crop
  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await getDb()
        .delete(schema.crops)
        .where(eq(schema.crops.id, input.id));
      return { success: true };
    }),
});
