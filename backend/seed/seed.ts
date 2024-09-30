import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function seed() {
  const defaultEmail = 'test@test.com';
  const existingUser = await prisma.user.findUnique({
    where: { email: defaultEmail },
  });

  if (!existingUser) {
    await prisma.user.create({
      data: {
        name: 'Matias',
        surname: 'Sayas',
        email: defaultEmail,
        password: await bcrypt.hash('123456', 10),
        phoneNumber: '123456',
        role: 'USER',
      },
    });
  } else {
    console.log(
      'El usuario preestablecido ya existe. No se ha creado uno nuevo.',
    );
  }
}
