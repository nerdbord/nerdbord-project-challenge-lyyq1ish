const { PrismaClient } = require('@prisma/client');
const { BASE_CATEGORIES, COLORS_MAP } = require('../app/components/CategoriesList/categories');

const prisma = new PrismaClient();

async function main() {
  for (const baseCategory of BASE_CATEGORIES) {
    await prisma.category.upsert({
      where: { 
        name: baseCategory.name,
      },
      update: {},
      create: {
        name: baseCategory.name,
        icon: baseCategory.icon,
        color: COLORS_MAP[baseCategory.color],
      },
    });
  }

  console.log('Seed completed successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });