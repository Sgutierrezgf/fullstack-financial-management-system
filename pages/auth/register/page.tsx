"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, mappedRoles } from "@/schemas/authSchema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

type Inputs = {
  name: string;
  email: string;
  phone: string;
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

  const router = useRouter();
  const onSubmit = handleSubmit(async (data) => {
    if (data.password != data.confirmPassword) {
      return alert("El password no es el correcto");
    }

    const res = await fetch("/api/auth/register/register", {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        rol: data.rol,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // if (res.ok) {
    //   router.push("/auth/login");
    // }
  });

  const rolesOptions = Object.entries(mappedRoles).map(([key, value]) => (
    <option value={key} key={key}>
      {value}
    </option>
  ));

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-slate-200 font-bold text-4xl mb-4">
          Registro de usuario
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label
                htmlFor="name"
                className="text-slate-500 mb-2 block text-sm"
              >
                Nombre usuario
              </Label>
              <Input
                placeholder="Andres"
                type="text"
                id="name"
                {...register("name")}
                className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full border-none"
              />
              {errors.name?.message && (
                <span className="text-red-500 text-xs">
                  {errors.name?.message}
                </span>
              )}
            </div>
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
            <div className="flex flex-col space-y-1.5">
              <Label
                htmlFor="email"
                className="text-slate-500 mb-2 block text-sm"
              >
                Telefono
              </Label>
              <Input
                placeholder="3001234578"
                type="number"
                id="phone"
                {...register("phone")}
                className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full border-none"
              />
              {errors.phone?.message && (
                <span className="text-red-500 text-xs">
                  {errors.phone?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
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
            <div className="flex flex-col space-y-1.5">
              <label
                htmlFor="confirmPassword"
                className="text-slate-500 mb-2 block text-sm border-none"
              >
                Confirm Password
              </label>
              <Input
                placeholder="*****"
                type="password"
                id="confirmPassword"
                {...register("confirmPassword")}
                className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full border-none"
              />
              {errors.confirmPassword?.message && (
                <span className="text-red-500 text-xs">
                  {errors.confirmPassword?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col space-y-1.5 mb-5">
              <label
                htmlFor="rol"
                className="text-slate-500 mb-2 block text-sm"
              >
                Rol
              </label>
              <select
                id="rol"
                {...register("rol")}
                className="p-3 rounded block mb-5 bg-slate-900 text-slate-300 w-full"
              >
                {rolesOptions}
              </select>
              {errors.rol?.message && (
                <span className="text-red-500 text-xs">
                  {errors.rol?.message}
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

export default RegisterPage;
