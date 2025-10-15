import { prisma } from '/home/nathan_sean/atomus/src/lib/prisma.ts';

async function main() {
  await prisma.user.create({
    data: {
      id: 'test-user-1',
      name: 'Test User',
      email: 'test@example.com',
      passwordHash: 'hashed-password',
    },
  });
}

main();
