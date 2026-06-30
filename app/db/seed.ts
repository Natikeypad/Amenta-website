import { getDb } from "../api/queries/connection";
import * as schema from "./schema";
import { galleryImageEntries } from "./gallery-images";

async function seed() {
  const db = getDb();
  console.log("Seeding Amenta Agricultural Development PLC database...");

  // ─── Team Members ─────────────────────────────────────────────
  const existingTeam = await db.select().from(schema.teamMembers).limit(1);
  if (existingTeam.length === 0) {
    console.log("Seeding team members...");
    await db.insert(schema.teamMembers).values([
      {
        name: "Tamirat Moja",
        role: "Founder & CEO",
        bio: "Visionary entrepreneur with 15+ years in agricultural development. Founded Amenta to transform pastoral communities through sustainable farming. Specializes in forage systems and livestock management.",
        image: "/images/team/tamrat.jpg",
        email: "tamirat@amenta-agriculture.com",
        displayOrder: 1,
        active: true,
      },
      {
        name: "Natnael Tamrat",
        role: "Agricultural Director",
        bio: "Agronomist with expertise in forage seed production and irrigation systems. Oversees our 200-hectare farming operations. Leads training programs for local farmers.",
        image: "/images/team/nati.jpg",
        email: "natnael@amenta-agriculture.com",
        displayOrder: 2,
        active: true,
      },
      {
        name: "Befkralem Tamrat",
        role: "Livestock Manager",
        bio: "Veterinary specialist with a focus on sustainable livestock management. Manages our bull fattening and trading program. Developed our animal health protocols and feeding systems.",
        image: "/images/team/happy.jpg",
        email: "befkralem@amenta-agriculture.com",
        displayOrder: 3,
        active: true,
      },
    ]);
  }

  // ─── News / Blog Posts ────────────────────────────────────────
  const existingNews = await db.select().from(schema.newsPosts).limit(1);
  if (existingNews.length === 0) {
    console.log("Seeding news posts...");
    await db.insert(schema.newsPosts).values([
      {
        title: "Record Forage Seed Harvest in South Omo",
        slug: "record-forage-seed-harvest",
        excerpt: "Amenta PLC achieves 178,200kg forage seed production, setting new benchmarks for sustainable agriculture in pastoral regions.",
        content: "Amenta Agricultural Development PLC is proud to announce a record-breaking forage seed harvest of 178,200kg for the 2024 season. This achievement represents a 40% increase over the previous year and demonstrates the effectiveness of our modern cultivation techniques combined with traditional knowledge of the land. The harvest includes multiple varieties of forage seeds that will support livestock development across the South Omo region.",
        image: "/images/news/forage-harvest.jpg",
        category: "Production",
        tag: "AgriTech",
        author: "Amenta PLC",
        published: true,
        featured: true,
      },
      {
        title: "Empowering Pastoral Communities Through Training",
        slug: "empowering-pastoral-communities",
        excerpt: "Amenta launches new farmer education program, training 120 local pastoralists in modern forage and livestock management techniques.",
        content: "Our comprehensive training program has reached 120 pastoralists in the Nyangatom Woreda, equipping them with modern agricultural skills while respecting traditional practices. The program covers forage cultivation, irrigation techniques, livestock health management, and sustainable farming practices.",
        image: "/images/news/training.jpg",
        category: "Community",
        tag: "Training",
        author: "Amenta PLC",
        published: true,
        featured: false,
      },
      {
        title: "New Sustainable Irrigation Methods Implemented",
        slug: "sustainable-irrigation-methods",
        excerpt: "Amenta completes solar-powered irrigation system, reducing water usage by 40% while increasing crop yields across our 200-hectare farm.",
        content: "The installation of our new solar-powered irrigation system marks a significant milestone in Amenta's sustainability journey. The system reduces water consumption by 40% while simultaneously increasing crop yields through precision delivery. This project was made possible through partnerships with international development organizations.",
        image: "/images/news/irrigation.jpg",
        category: "Innovation",
        tag: "Sustainability",
        author: "Amenta PLC",
        published: true,
        featured: false,
      },
      {
        title: "Amenta PLC Expands Forage Seed Production",
        slug: "expands-forage-seed-production",
        excerpt: "Amenta PLC has increased its annual forage seed output to 178,000 kg, supporting local farmers and boosting livestock productivity across South Omo.",
        content: "With expanded production capacity, Amenta PLC is now the leading forage seed producer in Southern Ethiopia. Our expanded operations create employment for 45 dedicated staff members and support over 1,200 farming families in the region.",
        image: "/images/news/forage-expansion.jpg",
        category: "Production",
        tag: "AgriTech",
        author: "Amenta PLC",
        published: true,
        featured: true,
      },
      {
        title: "Solar Water Pumps Transform Irrigation",
        slug: "solar-water-pumps",
        excerpt: "Our new solar-powered pumps are providing sustainable irrigation solutions, reducing costs and environmental impact for our communities.",
        content: "The deployment of solar water pump technology has transformed irrigation practices across our 260-hectare operation. These pumps provide reliable water access while reducing operational costs and carbon emissions. The initiative serves as a model for sustainable agriculture in the Ethiopian lowlands.",
        image: "/images/news/solar-pumps.jpg",
        category: "Innovation",
        tag: "Sustainability",
        author: "Amenta PLC",
        published: true,
        featured: false,
      },
      {
        title: "Record Onion Harvest Achieved",
        slug: "record-onion-harvest",
        excerpt: "Amenta PLC celebrates a record-breaking onion harvest, improving food security and farmer incomes in the region.",
        content: "Our latest onion harvest has set new records for yield per hectare in the South Omo Zone. This success demonstrates the potential for commercial vegetable production in the region and opens new market opportunities for local farmers.",
        image: "/images/news/onion-harvest.jpg",
        category: "Production",
        tag: "Harvest",
        author: "Amenta PLC",
        published: true,
        featured: false,
      },
    ]);
  }

  // ─── Portfolio Projects ───────────────────────────────────────
  const existingProjects = await db.select().from(schema.portfolioProjects).limit(1);
  if (existingProjects.length === 0) {
    console.log("Seeding portfolio projects...");
    await db.insert(schema.portfolioProjects).values([
      {
        title: "Forage Seed Expansion",
        description: "Developing 80 hectares of specialized forage seed production along the Omo River, increasing local capacity for sustainable livestock farming.",
        image: "/images/projects/forage.jpg",
        stat1Value: "80",
        stat1Label: "Hectares",
        stat2Value: "178K",
        stat2Label: "Kg/Year",
        stat3Value: "5",
        stat3Label: "Varieties",
        displayOrder: 1,
        active: true,
      },
      {
        title: "Bull Export Program",
        description: "Specialized bull fattening and trading operation meeting international standards, creating new export opportunities for Ethiopian livestock.",
        image: "/images/projects/bull.jpg",
        stat1Value: "150",
        stat1Label: "Bulls/Year",
        stat2Value: "80%",
        stat2Label: "Export Growth",
        stat3Value: "45",
        stat3Label: "Jobs Created",
        displayOrder: 2,
        active: true,
      },
      {
        title: "Irrigation Infrastructure",
        description: "Construction of 8km irrigation canals and 100,000m³ reservoir to support year-round agricultural production in the semi-arid South Omo region.",
        image: "/images/projects/irrigation.jpg",
        stat1Value: "8",
        stat1Label: "Km Canals",
        stat2Value: "100K",
        stat2Label: "m³ Reservoir",
        stat3Value: "200",
        stat3Label: "Hectares Served",
        displayOrder: 3,
        active: true,
      },
    ]);
  }

  // ─── Gallery Images ───────────────────────────────────────────
  const existingGallery = await db.select().from(schema.galleryImages).limit(1);
  if (existingGallery.length === 0) {
    console.log("Seeding gallery images...");
    await db.insert(schema.galleryImages).values(galleryImageEntries);
  }

  // ─── Crops ───────────────────────────────────────────────────
  const existingCrops = await db.select().from(schema.crops).limit(1);
  if (existingCrops.length === 0) {
    console.log("Seeding crops...");
    await db.insert(schema.crops).values([
      {
        name: "Panicum",
        variety: "Panicum maximum",
        area: "35.00",
        areaUnit: "hectares",
        status: "growing",
        plantingDate: new Date("2025-03-15"),
        expectedYield: "45000.00",
        yieldUnit: "kg",
        location: "Block A - Omo River",
        notes: "Primary forage grass for livestock feed",
      },
      {
        name: "Sudan Grass",
        variety: "Sorghum sudanense",
        area: "25.00",
        areaUnit: "hectares",
        status: "harvesting",
        plantingDate: new Date("2025-02-01"),
        harvestDate: new Date("2025-07-15"),
        expectedYield: "32000.00",
        actualYield: "35000.00",
        yieldUnit: "kg",
        location: "Block B",
        notes: "Excellent drought resistance",
      },
      {
        name: "Cow Pea",
        variety: "Vigna unguiculata",
        area: "15.00",
        areaUnit: "hectares",
        status: "growing",
        plantingDate: new Date("2025-04-10"),
        expectedYield: "18000.00",
        yieldUnit: "kg",
        location: "Block C",
        notes: "Nitrogen-fixing legume",
      },
      {
        name: "Pigeon Pea",
        variety: "Cajanus cajan",
        area: "10.00",
        areaUnit: "hectares",
        status: "planted",
        plantingDate: new Date("2025-06-01"),
        expectedYield: "12000.00",
        yieldUnit: "kg",
        location: "Block D",
        notes: "Perennial legume, good for soil improvement",
      },
      {
        name: "Desmodium",
        variety: "Desmodium intortum",
        area: "8.00",
        areaUnit: "hectares",
        status: "growing",
        plantingDate: new Date("2025-03-20"),
        expectedYield: "8500.00",
        yieldUnit: "kg",
        location: "Block E",
        notes: "High protein forage for dairy cattle",
      },
      {
        name: "Onion",
        variety: "Bombay Red",
        area: "12.00",
        areaUnit: "hectares",
        status: "harvesting",
        plantingDate: new Date("2025-01-15"),
        harvestDate: new Date("2025-06-20"),
        expectedYield: "25000.00",
        actualYield: "28000.00",
        yieldUnit: "kg",
        location: "Vegetable Block",
        notes: "High-value cash crop for local markets",
      },
    ]);
  }

  // ─── Inventory Items ──────────────────────────────────────────
  const existingInventory = await db.select().from(schema.inventoryItems).limit(1);
  if (existingInventory.length === 0) {
    console.log("Seeding inventory items...");
    await db.insert(schema.inventoryItems).values([
      {
        name: "Panicum Seeds",
        category: "Seeds",
        quantity: "500.00",
        unit: "kg",
        minStock: "100.00",
        status: "in_stock",
        location: "Seed Store",
        supplier: "Amenta Seed Production",
      },
      {
        name: "Sudan Grass Seeds",
        category: "Seeds",
        quantity: "350.00",
        unit: "kg",
        minStock: "80.00",
        status: "in_stock",
        location: "Seed Store",
        supplier: "Amenta Seed Production",
      },
      {
        name: "NPK Fertilizer",
        category: "Fertilizers",
        quantity: "2000.00",
        unit: "kg",
        minStock: "500.00",
        status: "in_stock",
        location: "Fertilizer Shed",
        supplier: "Ethiopian Agricultural Supply",
      },
      {
        name: "Solar Pump Parts",
        category: "Equipment",
        quantity: "15.00",
        unit: "sets",
        minStock: "5.00",
        status: "in_stock",
        location: "Equipment Store",
        supplier: "SolarTech Ethiopia",
      },
      {
        name: "Drip Irrigation Tape",
        category: "Irrigation",
        quantity: "5000.00",
        unit: "meters",
        minStock: "1000.00",
        status: "low_stock",
        location: "Irrigation Store",
        supplier: "Netafim Ethiopia",
      },
      {
        name: "Veterinary Medicine",
        category: "Livestock",
        quantity: "25.00",
        unit: "bottles",
        minStock: "10.00",
        status: "in_stock",
        location: "Vet Clinic",
        supplier: "VetPharma Ethiopia",
      },
      {
        name: "Cattle Feed Supplement",
        category: "Livestock",
        quantity: "800.00",
        unit: "kg",
        minStock: "200.00",
        status: "in_stock",
        location: "Feed Store",
        supplier: "Amenta Feed Mill",
      },
      {
        name: "Diesel Fuel",
        category: "Fuel",
        quantity: "300.00",
        unit: "liters",
        minStock: "500.00",
        status: "low_stock",
        location: "Fuel Station",
        supplier: "Total Ethiopia",
      },
    ]);
  }

  console.log("Seeding complete!");
}

seed().catch(console.error);
