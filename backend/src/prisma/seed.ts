import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Crie alguns usuários
  await prisma.user.create({
    data: {
      login: 'carlos@mail.com',
      password: 'CarlosSecurePass!',
      name: 'Carlos',
      surname: 'Fernandez',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
