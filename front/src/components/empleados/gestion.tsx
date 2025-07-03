"use client";

import { useState } from "react";
import CrearEmpleadoForm from "./alta";
import ListadoEmpleados from "./listado";

export default function GestionEmpleados() {
  const [opcion, setOpcion] = useState<"crear" | "ver">("ver");

  return (
    <>
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => setOpcion("ver")}
          className={`px-4 py-2 rounded ${
            opcion === "ver"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Ver Listado
        </button>
        <button
          onClick={() => setOpcion("crear")}
          className={`px-4 py-2 rounded ${
            opcion === "crear"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Crear Empleado
        </button>
      </div>

      {opcion === "crear" && (
        <CrearEmpleadoForm onSuccess={() => setOpcion("ver")} />
      )}
      {opcion === "ver" && <ListadoEmpleados />}
    </>
  );
}
