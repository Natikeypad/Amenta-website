import { getDb } from "../api/queries/connection";
import * as schema from "./schema";
import { galleryImageEntries } from "./gallery-images";

async function seedGallery() {
  const db = getDb();
  console.log("Refreshing gallery images...");
  await db.delete(schema.galleryImages);
  await db.insert(schema.galleryImages).values(galleryImageEntries);
  console.log(`Gallery updated with ${galleryImageEntries.length} images.`);
}

seedGallery().catch(console.error);
