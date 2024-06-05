"use client"
import { z } from "zod"
 
export const loginSchema = z.object({
  email: z.string().email({
    message: "Debes poner un correo con el formato nombre@email.com aqui",
  }),
  password: z.string().min(5, {
    message: "La contraseña debe ser minimo 5 caracteres",
  }),
})

const roles = ["ADMIN", "USER"] as const;

export type roles = (typeof roles)[number];

export const mappedRoles: {[key in roles]: string} = {
  ADMIN: "ADMIN",
  USER: "USER",
}

export const registerSchema = z.object({
  name: z.string().min(3, {
    message: "El nombre debe ser minimo 3 caracteres",
  }),
  email: z.string().email({
    message: "Debes poner un correo con el formato nombre@email.com aqui",
  }),
  password: z.string().min(5, {
    message: "La contraseña debe ser minimo 5 caracteres",
  }),
  confirmPassword: z.string().min(6, {
    message: "La contraseña debe ser minimo 5 caracteres",
  }),
  rol: z.enum(roles, {
    errorMap: () => ({ message: "Seleccione el rol" }),
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"]
})
 
 