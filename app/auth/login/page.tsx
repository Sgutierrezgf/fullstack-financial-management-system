"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/authSchema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Inputs = {
  email: string;
  password: string;
};

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(loginSchema),
  });

  console.log(errors);

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Inicio de sesion</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);
          })}
        >
          <div className="grid w-full items-center gap-4">
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
          </div>
          <Button>Iniciar sesion</Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default LoginPage;
