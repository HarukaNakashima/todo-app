const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const user1 = await prisma.user.upsert({
      where: {id: 1},
      update: {},
      create: {
        name: 'haruka'
      },
    });
  
    const task1 = await prisma.task.upsert({
      where: {id: 1},
      update: {},
      create: {
        categoryId: 1,
        title: 'todoアプリ作成',
        detail: "8月17日までに完成させる。３つのdockerコンテナを接続させて環境構築。",
        completed: false
      },
    });
  
    const task2 = await prisma.task.upsert({
      where: {id: 2},
      update: {},
      create: {
        categoryId: 3,
        title: '雑巾づくり',
        detail: '古いタオルがあるだけまとめて作っておく。24日までに。',
        completed: false
      },
    });
  
    const task3 = await prisma.task.upsert({
      where: {id: 3},
      update: {},
      create: {
        categoryId: 4,
        title: '保護者会会計報告作成',
        detail: '9月の中間報告用。8月末に会長さんに一度見せる。',
        completed: false
      },
    });
    console.log({ user1, task1, task2, task3});
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