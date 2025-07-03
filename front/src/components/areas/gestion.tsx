"use client";

import { useState } from "react";
import CrearAreaForm from "./alta";
import ListadoAreas from "./listado";

export default function GestionAreas() {
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
          Crear Área
        </button>
      </div>

      {opcion === "crear" && (
        <CrearAreaForm onSuccess={() => setOpcion("ver")} />
      )}
      {opcion === "ver" && <ListadoAreas />}
    </>
  );
}
