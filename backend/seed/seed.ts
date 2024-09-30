import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from 'modules/auth/dto/register.dto';

const prisma = new PrismaClient();

export async function seed() {
  const defaultUsers: RegisterDto[] = [
    {
      name: 'Matias',
      surname: 'Sayas',
      email: 'test@test.com',
      password: await bcrypt.hash('123456', 10), // Asegúrate de hashear la contraseña
      phoneNumber: '123456',
      googleId: null, // O la lógica que necesites
    },
    // Puedes agregar más usuarios aquí
  ];

  for (const user of defaultUsers) {
    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!existingUser) {
      await prisma.user.create({
        data: {
          name: user.name,
          surname: user.surname,
          email: user.email,
          password: user.password,
          phoneNumber: user.phoneNumber,
          role: 'USER', // O cualquier rol predeterminado que necesites
        },
      });
      console.log(`Usuario creado: ${user.email}`);
    } else {
      console.log(`El usuario ${user.email} ya existe.`);
    }
  }
}

// Llama a esta función en el inicio de tu aplicación
