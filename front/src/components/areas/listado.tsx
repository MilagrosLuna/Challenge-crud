"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/utils/api";
type Area = {
  id: number;
  nombre: string;
  isDeleted: boolean;
};

export default function ListadoAreas() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [editando, setEditando] = useState<Area | null>(null);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [guardando, setGuardando] = useState(false);

  const fetchAreas = async () => {
    try {
      const res = await fetch(`${API_URL}/api/areas`);
      const data = await res.json();
      setAreas(data.filter((a: Area) => !a.isDeleted));
    } catch (err) {
      console.error("Error al obtener áreas:", err);
    }
  };

  useEffect(() => {
    fetchAreas();
  }, []);

  const eliminar = async (id: number) => {
    await fetch(`${API_URL}/api/areas/${id}`, { method: "DELETE" });
    await fetchAreas();
  };

  const guardarEdicion = async () => {
    if (!editando) return;
    setGuardando(true);
    await fetch(`${API_URL}/api/areas/${editando.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: nuevoNombre }),
    });
    setEditando(null);
    setNuevoNombre("");
    await fetchAreas();
    setGuardando(false);
  };

  return (
    <div className="space-y-2">
      <div>
        {areas.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No hay áreas registradas.
          </div>
        ) : (
          areas.map((area) => (
            <div
              key={area.id}
              className="flex justify-between items-center p-3 bg-white rounded shadow mb-3"
            >
              <span className="font-medium text-gray-800">{area.nombre}</span>
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setEditando(area);
                    setNuevoNombre(area.nombre);
                  }}
                  className="text-blue-600 hover:underline"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminar(area.id)}
                  className="text-red-600 hover:underline"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {editando && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Editar Área</h2>
            <input
              type="text"
              value={nuevoNombre}
              onChange={(e) => setNuevoNombre(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditando(null)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={guardarEdicion}
                disabled={guardando}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
