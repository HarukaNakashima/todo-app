const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const work = await prisma.category.upsert({
    where: {id: 1},
    update: {},
    create: {
      name: 'work'
    },
  });

  const private = await prisma.category.upsert({
    where: {id: 2},
    update: {},
    create: {
      name: 'private'
    },
  });

  const school = await prisma.category.upsert({
    where: {id: 3},
    update: {},
    create: {
      name: 'school'
    },
  });

  const nursery = await prisma.category.upsert({
    where: {id: 4},
    update: {},
    create: {
      name: 'nursery'
    },
  });
  ([
    { id: 1, name: 'work'},
    { id: 2, name: 'private'},
    { id: 3, name: 'school'},
    { id: 4, name: 'nursery'}
  ])
  console.log({ work, private, school, nursery});
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })