import { z } from "zod";
import { eq, desc } from "drizzle-orm";
import { createRouter, publicQuery, authedQuery, adminQuery } from "../middleware";
import { getDb } from "../queries/connection";
import * as schema from "@db/schema";

export const inventoryRouter = createRouter({
  // Public: List all inventory items
  list: publicQuery.query(async () => {
    const items = await getDb()
      .select()
      .from(schema.inventoryItems)
      .orderBy(desc(schema.inventoryItems.createdAt));
    return items;
  }),

  // Public: Get item by ID
  getById: publicQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const rows = await getDb()
        .select()
        .from(schema.inventoryItems)
        .where(eq(schema.inventoryItems.id, input.id))
        .limit(1);
      return rows.at(0) ?? null;
    }),

  // Authed: Create item
  create: authedQuery
    .input(
      z.object({
        name: z.string().min(1).max(255),
        category: z.string().min(1).max(100),
        quantity: z.string(),
        unit: z.string().min(1).max(20),
        minStock: z.string().optional(),
        status: z.enum(["in_stock", "low_stock", "out_of_stock"]).default("in_stock"),
        location: z.string().optional(),
        supplier: z.string().optional(),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      await getDb().insert(schema.inventoryItems).values({
        ...input,
        quantity: input.quantity,
        minStock: input.minStock ?? "0",
      });
      return { success: true };
    }),

  // Authed: Update item
  update: authedQuery
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(1).max(255).optional(),
        category: z.string().min(1).max(100).optional(),
        quantity: z.string().optional(),
        unit: z.string().min(1).max(20).optional(),
        minStock: z.string().optional(),
        status: z.enum(["in_stock", "low_stock", "out_of_stock"]).optional(),
        location: z.string().optional(),
        supplier: z.string().optional(),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      await getDb()
        .update(schema.inventoryItems)
        .set(data)
        .where(eq(schema.inventoryItems.id, id));
      return { success: true };
    }),

  // Admin: Delete item
  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await getDb()
        .delete(schema.inventoryItems)
        .where(eq(schema.inventoryItems.id, input.id));
      return { success: true };
    }),
});
