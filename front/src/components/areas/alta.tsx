"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { API_URL } from "@/utils/api";
type Props = {
  onSuccess: () => void;
};

export default function CrearAreaForm({ onSuccess }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ nombre: string }>();

  const [mensaje, setMensaje] = useState("");

  const onSubmit = async (data: { nombre: string }) => {
    const res = await fetch(`${API_URL}/api/areas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setMensaje("area creada correctamente");
      reset();
      onSuccess();
    } else {
      setMensaje("error al crear el area");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block">Nombre del área</label>
        <input
          type="text"
          {...register("nombre", {
            required: true,
            minLength: 3,
            maxLength: 100,
            pattern: {
              value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
              message: "El nombre solo puede contener letras y espacios",
            },
          })}
          className="w-full border p-2 rounded"
        />
        {errors.nombre && (
          <span className="text-red-500">
            {errors.nombre.message || "El nombre es obligatorio"}
          </span>
        )}
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Crear área
      </button>

      {mensaje && <p className="text-sm text-green-600 mt-2">{mensaje}</p>}
    </form>
  );
}
