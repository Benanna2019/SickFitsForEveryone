import { prisma } from "../src/db";
import { products } from "./data";

async function insertSeedData() {
  console.log(`🌱 Inserting Seed Data: ${products.length} Products`);
  for (const product of products) {
    console.log(`  🛍️ Adding Product: ${product.name}`);
    const { id } = await prisma.productImage.create({
      data: {
        image: product.photo.secure_url,
        altText: product.description,
      },
    });
    // @ts-ignore
    delete product.photo;
    // @ts-ignore
    product.photoId = id;
    // @ts-ignore
    await prisma.product.create({ data: product });
  }
  console.log(`✅ Seed Data Inserted: ${products.length} Products`);
  console.log(
    `👋 Please start the process with \`yarn dev\` or \`npm run dev\``
  );
  process.exit();
}

insertSeedData().then(() => console.log("data seeded..."));
