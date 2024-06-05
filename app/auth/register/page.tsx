"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, mappedRoles } from "@/schemas/authSchema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  rol: string;
};

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(registerSchema),
  });

  console.log(errors);

  const rolesOptions = Object.entries(mappedRoles).map(([key, value]) => (
    <option value={key} key={key}>
      {value}
    </option>
  ));

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Registro de usuario</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);
          })}
        >
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nombre usuario</Label>
              <Input
                placeholder="Andres"
                type="text"
                id="name"
                {...register("name")}
              />
              {errors.name?.message && <p>{errors.name?.message}</p>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Correo electronico</Label>
              <Input
                placeholder="nombre@email.com"
                type="email"
                id="email"
                {...register("email")}
              />
              {errors.email?.message && <p>{errors.email?.message}</p>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                placeholder="*****"
                type="password"
                id="password"
                {...register("password")}
              />
              {errors.password?.message && <p>{errors.password?.message}</p>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword?.message && (
                <p>{errors.confirmPassword?.message}</p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="roles">Rol</label>
              <select id="roles" {...register("rol")}>
                {rolesOptions}
              </select>
              {errors.rol?.message && <p>{errors.rol?.message}</p>}
            </div>
          </div>
          <Button>Iniciar sesion</Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default RegisterPage;
