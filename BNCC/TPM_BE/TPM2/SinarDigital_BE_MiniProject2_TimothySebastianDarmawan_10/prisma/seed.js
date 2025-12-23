const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create a Category
  const category = await prisma.category.create({
    data: { name: 'Fiction' },
  });

  // Create 20 Dummy Books
  const booksData = [];
  for (let i = 1; i <= 20; i++) {
    booksData.push({
      title: `Book Title ${i}`,
      description: `This is the dummy description for book ${i}`,
      categoryId: category.id,
      imageUrl: null
    });
  }

  await prisma.book.createMany({ data: booksData });
  console.log('Seeding completed: 20 books added.');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());