"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import EmpleadoForm from "./form";
import type { Area } from "@/types";
import { API_URL } from "@/utils/api";
type Props = {
  onSuccess: () => void;
};

type FormData = {
  nombreCompleto: string;
  dni: string;
  fechaNacimiento: string;
  esDesarrollador: boolean;
  descripcion: string;
  areaId: number;
};

export default function CrearEmpleadoForm({ onSuccess }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const [areas, setAreas] = useState<Area[]>([]);
  const [mensaje, setMensaje] = useState("");

  const onSubmit = async (data: FormData) => {
    const res = await fetch(`${API_URL}/api/empleados`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setMensaje("Empleado registrado correctamente 🎉");
      reset();
      onSuccess();
    } else {
      setMensaje("Error al registrar empleado");
    }
  };

  useEffect(() => {
    fetch(`${API_URL}/api/areas`)
      .then((res) => res.json())
      .then((data) => setAreas(data));
  }, []);

  return (
    <>
      <EmpleadoForm
        onSubmit={onSubmit}
        areas={areas}
        submitText="Crear empleado"
      />
      {mensaje && (
        <p
          className={`mt-2 ${
            mensaje.includes("correctamente")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {mensaje}
        </p>
      )}
    </>
  );
}
