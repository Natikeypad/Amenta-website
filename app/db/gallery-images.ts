function path(file: string) {
  return `/images/gallery/${encodeURIComponent(file)}`;
}

function titleFromFile(file: string) {
  return file
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

const files: { file: string; category: string; featured?: boolean }[] = [
  { file: "Farmland7.jpg", category: "Farm", featured: true },
  { file: "farming.jpg", category: "Farm", featured: true },
  { file: "Farmland9.jpg", category: "Farm" },
  { file: "hero-farmland.jpg", category: "Farm" },
  { file: "hero-farmland2.jpg", category: "Farm" },
  { file: "planting.jpg", category: "Farm" },
  { file: "intial_work.jpg", category: "Farm" },
  { file: "Pond.jpg", category: "Infrastructure" },
  { file: "Map.png", category: "Farm" },
  { file: "Tractor2.jpg", category: "Equipment", featured: true },
  { file: "tractor.jpg", category: "Equipment" },
  { file: "Solar_Pump1.jpg", category: "Infrastructure", featured: true },
  { file: "solar-news.jpg", category: "Infrastructure" },
  { file: "solar donta.jpg", category: "Infrastructure" },
  { file: "Solar donta1.jpg", category: "Infrastructure" },
  { file: "irrigation.jpg", category: "Infrastructure" },
  { file: "Habab2.jpg", category: "Products" },
  { file: "habab-pro.jpg", category: "Products" },
  { file: "habab5.png", category: "Products" },
  { file: "habab9.png", category: "Products" },
  { file: "onion.jpg", category: "Harvest" },
  { file: "onion-por.jpg", category: "Harvest" },
  { file: "Onion_Fruit.png", category: "Harvest" },
  { file: "tomato.png", category: "Harvest" },
  { file: "tomato2.png", category: "Harvest" },
  { file: "tomato6.png", category: "Harvest" },
  { file: "tomat-sells.png", category: "Harvest" },
  { file: "Cassava.png", category: "Crops" },
  { file: "cassava3.jpg", category: "Crops" },
  { file: "cassavaaa.jpg", category: "Crops" },
  { file: "Ginger3.png", category: "Crops" },
  { file: "Ginger_farm2.png", category: "Crops" },
  { file: "HotSpicey.png", category: "Crops" },
  { file: "HotSpicey2.png", category: "Crops" },
  { file: "bull.jpg", category: "Livestock" },
  { file: "boni.jpg", category: "Livestock" },
  { file: "Product.jpg", category: "Products" },
  { file: "team.jpg", category: "Team" },
  { file: "training.jpg", category: "Team" },
  { file: "CEO.jpg", category: "Team" },
  { file: "ceo-photo2.jpg", category: "Team" },
  { file: "ceo-work.jpg", category: "Team" },
  { file: "ceo4.jpg", category: "Team" },
  { file: "The CEO.jpg", category: "Team" },
  { file: "min CEO.jpg", category: "Team" },
];

export const galleryImageEntries = files.map((entry, index) => ({
  title: titleFromFile(entry.file),
  image: path(entry.file),
  category: entry.category,
  displayOrder: index + 1,
  featured: entry.featured ?? false,
}));
