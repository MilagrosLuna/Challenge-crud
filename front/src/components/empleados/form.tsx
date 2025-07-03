"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import type { Empleado, Area } from "@/types";

type Props = {
  onSubmit: (data: Omit<Empleado, "id" | "isDeleted">) => Promise<void>;
  onCancel?: () => void;
  defaultValues?: Partial<Empleado>;
  areas: Area[];
  submitText?: string;
};

export default function EmpleadoForm({
  onSubmit,
  onCancel,
  defaultValues,
  areas,
  submitText = "Guardar",
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<Empleado, "id" | "isDeleted">>({
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <label className="block mb-1 font-semibold text-gray-700">
          Nombre completo
        </label>
        <input
          type="text"
          {...register("nombreCompleto", {
            required: "El nombre es obligatorio",
            pattern: {
              value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
              message: "El nombre solo puede contener letras y espacios",
            },
          })}
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.nombreCompleto ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Ej: Juan Pérez"
        />
        {errors.nombreCompleto && (
          <p className="mt-1 text-red-600 text-sm">
            {errors.nombreCompleto.message}
          </p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-semibold text-gray-700">DNI</label>
        <input
          type="text"
          {...register("dni", {
            required: "El DNI es obligatorio",
            pattern: {
              value: /^[0-9]+$/,
              message: "El DNI solo puede contener números",
            },
          })}
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.dni ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Ej: 12345678"
        />
        {errors.dni && (
          <p className="mt-1 text-red-600 text-sm">{errors.dni.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-semibold text-gray-700">
          Fecha de nacimiento
        </label>
        <input
          type="date"
          {...register("fechaNacimiento", {
            required: "La fecha de nacimiento es obligatoria",
            validate: (value) => {
              const selectedDate = new Date(value);
              const today = new Date();
              return selectedDate <= today || "La fecha no puede ser futura";
            },
          })}
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.fechaNacimiento ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.fechaNacimiento && (
          <p className="mt-1 text-red-600 text-sm">
            {errors.fechaNacimiento.message}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          {...register("esDesarrollador")}
          id="esDesarrollador"
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label
          htmlFor="esDesarrollador"
          className="font-semibold text-gray-700"
        >
          ¿Es desarrollador?
        </label>
      </div>

      <div>
        <label className="block mb-1 font-semibold text-gray-700">
          Descripción
        </label>
        <textarea
          {...register("descripcion", { required: true })}
          className={`w-full border rounded px-3 py-2 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.descripcion ? "border-red-500" : "border-gray-300"
          }`}
          rows={4}
          placeholder="Descripción del empleado"
        />
        {errors.descripcion && (
          <p className="mt-1 text-red-600 text-sm">Campo requerido</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-semibold text-gray-700">Área</label>
        <select
          {...register("areaId", { required: true })}
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.areaId ? "border-red-500" : "border-gray-300"
          }`}
          defaultValue=""
        >
          <option value="" disabled>
            Seleccioná un área
          </option>
          {areas.map((area) => (
            <option key={area.id} value={area.id}>
              {area.nombre}
            </option>
          ))}
        </select>
        {errors.areaId && (
          <p className="mt-1 text-red-600 text-sm">Campo requerido</p>
        )}
      </div>

      <div className="flex gap-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-300 text-gray-800 font-semibold py-2 rounded hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
        )}

        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
        >
          {submitText}
        </button>
      </div>
    </form>
  );
}
