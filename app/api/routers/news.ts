import { z } from "zod";
import { eq, desc, and } from "drizzle-orm";
import { createRouter, publicQuery, adminQuery } from "../middleware";
import { getDb } from "../queries/connection";
import * as schema from "@db/schema";

export const newsRouter = createRouter({
  // Public: List published news posts
  list: publicQuery
    .input(
      z.object({
        category: z.string().optional(),
        tag: z.string().optional(),
        limit: z.number().min(1).max(50).default(10),
        offset: z.number().min(0).default(0),
      }).optional()
    )
    .query(async ({ input }) => {
      const params = input ?? { limit: 10, offset: 0 };
      const db = getDb();
      const conditions = [eq(schema.newsPosts.published, true)];
      if (params.category) {
        conditions.push(eq(schema.newsPosts.category, params.category));
      }
      if (params.tag) {
        conditions.push(eq(schema.newsPosts.tag, params.tag));
      }
      const items = await db
        .select()
        .from(schema.newsPosts)
        .where(and(...conditions))
        .orderBy(desc(schema.newsPosts.createdAt))
        .limit(params.limit)
        .offset(params.offset);
      return { items, total: items.length };
    }),

  // Public: Get a single news post by slug
  getBySlug: publicQuery
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const rows = await getDb()
        .select()
        .from(schema.newsPosts)
        .where(eq(schema.newsPosts.slug, input.slug))
        .limit(1);
      return rows.at(0) ?? null;
    }),

  // Public: Get featured news
  featured: publicQuery.query(async () => {
    const items = await getDb()
      .select()
      .from(schema.newsPosts)
      .where(eq(schema.newsPosts.featured, true))
      .orderBy(desc(schema.newsPosts.createdAt))
      .limit(5);
    return items;
  }),

  // Admin: Create a news post
  create: adminQuery
    .input(
      z.object({
        title: z.string().min(1).max(255),
        slug: z.string().min(1).max(255),
        excerpt: z.string().optional(),
        content: z.string().optional(),
        image: z.string().optional(),
        category: z.string().optional(),
        tag: z.string().optional(),
        published: z.boolean().default(true),
        featured: z.boolean().default(false),
        author: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      await getDb().insert(schema.newsPosts).values({
        title: input.title,
        slug: input.slug,
        excerpt: input.excerpt ?? null,
        content: input.content ?? null,
        image: input.image ?? null,
        category: input.category ?? null,
        tag: input.tag ?? null,
        published: input.published,
        featured: input.featured,
        author: input.author ?? null,
      });
      return { success: true };
    }),

  // Admin: Update a news post
  update: adminQuery
    .input(
      z.object({
        id: z.number(),
        title: z.string().min(1).max(255).optional(),
        slug: z.string().min(1).max(255).optional(),
        excerpt: z.string().optional(),
        content: z.string().optional(),
        image: z.string().optional(),
        category: z.string().optional(),
        tag: z.string().optional(),
        published: z.boolean().optional(),
        featured: z.boolean().optional(),
        author: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      await getDb()
        .update(schema.newsPosts)
        .set(data)
        .where(eq(schema.newsPosts.id, id));
      return { success: true };
    }),

  // Admin: Delete a news post
  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await getDb()
        .delete(schema.newsPosts)
        .where(eq(schema.newsPosts.id, input.id));
      return { success: true };
    }),
});
