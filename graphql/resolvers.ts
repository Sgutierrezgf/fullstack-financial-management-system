// graphql/resolvers.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const resolvers = {
    Query: {
      users: async () => await prisma.user.findMany(),
    },
    Mutation: {
      registerUser: async (_: any, args: any) => {
        const { name, email, phone, password, rol } = args;
  
        // Verifica si el correo electrónico o el número de teléfono ya existen en la base de datos
        const existingUser = await prisma.user.findFirst({
          where: {
            OR: [
              { email },
              { phone },
            ],
          },
        });
  
        if (existingUser) {
          throw new Error("El correo electrónico o el número de teléfono ya están en uso.");
        }
  
        // Encripta la contraseña con bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);
  
        // Crea el nuevo usuario en la base de datos
        return await prisma.user.create({
          data: {
            name,
            email,
            phone,
            password: hashedPassword,
            rol,
          },
        });
      },
    },
  };
  
  export default resolvers;