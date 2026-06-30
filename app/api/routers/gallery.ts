import { z } from "zod";
import { eq, asc } from "drizzle-orm";
import { createRouter, publicQuery, adminQuery } from "../middleware";
import { getDb } from "../queries/connection";
import * as schema from "@db/schema";

export const galleryRouter = createRouter({
  // Public: List gallery images
  list: publicQuery
    .input(
      z.object({
        category: z.string().optional(),
        featured: z.boolean().optional(),
      }).optional()
    )
    .query(async ({ input }) => {
      const db = getDb();
      let query = db.select().from(schema.galleryImages);

      if (input?.category) {
        query = query.where(eq(schema.galleryImages.category, input.category)) as typeof query;
      }
      if (input?.featured !== undefined) {
        query = query.where(eq(schema.galleryImages.featured, input.featured)) as typeof query;
      }

      const items = await query.orderBy(asc(schema.galleryImages.displayOrder));
      return items;
    }),

  // Admin: Create gallery image
  create: adminQuery
    .input(
      z.object({
        title: z.string().optional(),
        image: z.string().min(1),
        category: z.string().optional(),
        description: z.string().optional(),
        displayOrder: z.number().default(0),
        featured: z.boolean().default(false),
      })
    )
    .mutation(async ({ input }) => {
      await getDb().insert(schema.galleryImages).values(input);
      return { success: true };
    }),

  // Admin: Update gallery image
  update: adminQuery
    .input(
      z.object({
        id: z.number(),
        title: z.string().optional(),
        image: z.string().optional(),
        category: z.string().optional(),
        description: z.string().optional(),
        displayOrder: z.number().optional(),
        featured: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      await getDb()
        .update(schema.galleryImages)
        .set(data)
        .where(eq(schema.galleryImages.id, id));
      return { success: true };
    }),

  // Admin: Delete gallery image
  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await getDb()
        .delete(schema.galleryImages)
        .where(eq(schema.galleryImages.id, input.id));
      return { success: true };
    }),
});
