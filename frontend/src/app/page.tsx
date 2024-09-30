"use client";

import { ROUTES } from "@/constants";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("AUTH_JWT_TOKEN");

    if (!token) {
      // Si no hay token, redirige a la página de autenticación
      router.push(ROUTES.auth.login);
    } else {
      // Si hay token, puedes decidir redirigir a la lista de tareas o donde necesites
      router.push(ROUTES.admin.tasks.list);
    }
  }, [router]);

  return (
    <div>
      <h1>Cargando...</h1>
    </div>
  );
}
