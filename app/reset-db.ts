import { getDb } from "./api/queries/connection";

async function reset() {
  const db = getDb();
  await db.execute("DROP TABLE IF EXISTS news_posts");
  await db.execute("DROP TABLE IF EXISTS contacts");
  await db.execute("DROP TABLE IF EXISTS newsletters");
  await db.execute("DROP TABLE IF EXISTS team_members");
  await db.execute("DROP TABLE IF EXISTS gallery_images");
  await db.execute("DROP TABLE IF EXISTS portfolio_projects");
  await db.execute("DROP TABLE IF EXISTS crops");
  await db.execute("DROP TABLE IF EXISTS inventory_items");
  await db.execute("DROP TABLE IF EXISTS weather_data");
  await db.execute("DROP TABLE IF EXISTS activities");
  console.log("All tables dropped successfully");
}

reset().catch(console.error);
