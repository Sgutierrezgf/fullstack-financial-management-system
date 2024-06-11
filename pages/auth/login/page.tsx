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

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-slate-200 font-bold text-4xl mb-4">
          Inicio de sesion
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);
          })}
        >
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label
                htmlFor="email"
                className="text-slate-500 mb-2 block text-sm"
              >
                Correo electronico
              </Label>
              <Input
                placeholder="nombre@email.com"
                type="email"
                id="email"
                {...register("email")}
                className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full border-none"
              />
              {errors.email?.message && (
                <span className="text-red-500 text-xs">
                  {errors.email?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col space-y-1.5 mb-5">
              <Label
                htmlFor="password"
                className="text-slate-500 mb-2 block text-sm"
              >
                Contraseña
              </Label>
              <Input
                placeholder="*****"
                type="password"
                id="password"
                {...register("password")}
                className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full border-none"
              />
              {errors.password?.message && (
                <span className="text-red-500 text-xs">
                  {errors.password?.message}
                </span>
              )}
            </div>
          </div>
          <Button className="w-full bg-blue-500 text-white p-3 rounded-lg">
            Iniciar sesion
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default LoginPage;
