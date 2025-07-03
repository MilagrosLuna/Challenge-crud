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
         className={`px-4 py-2 rounded transition-colors duration-200 ${
      opcion === "ver"
        ? "bg-blue-600 text-white hover:bg-blue-700"
        : "bg-gray-200 text-gray-800 hover:bg-blue-100 hover:text-blue-700"
    }`}
        >
          Ver Listado
        </button>
        <button
          onClick={() => setOpcion("crear")}
         className={`px-4 py-2 rounded transition-colors duration-200 ${
      opcion === "crear"
        ? "bg-green-600 text-white hover:bg-green-700"
        : "bg-gray-200 text-gray-800 hover:bg-green-100 hover:text-green-700"
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
