import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';

type Data = {
  message?: string;
  name?: string;
  phone?: string;
  email?: string;
  rol?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const data = req.body;

    const userFound = await prisma.user.findUnique({
      where: {
        email: data.email,
        },
        });
    
    if (userFound) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const userPhoneFound = await prisma.user.findUnique({
      where: {
        phone: data.phone
      }
    })

    if (userPhoneFound) {
      return res.status(400).json({ message: 'Phone already exists' });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: hashedPassword,
        rol: data.rol,
      },
    });
  console.log(newUser, 'soy el usuario');
  
    const {password, ...user } = newUser;

    return res.status(201).json(user);

    } catch (error: any) {
      return res.status(500).json({ message: error.message });
      }
      }
