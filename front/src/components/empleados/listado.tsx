"use client";

import { useEffect, useState } from "react";
import EmpleadoForm from "./form";
import type { Empleado, Area } from "@/types";
import { formatearFechaSinTimezone } from "@/utils/fecha";
import { API_URL } from "@/utils/api";

export default function ListadoEmpleados() {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [editando, setEditando] = useState<Empleado | null>(null);
  const [areas, setAreas] = useState<Area[]>([]);

  const fetchEmpleados = async () => {
    const res = await fetch(`${API_URL}/api/empleados`);
    const data = await res.json();
    setEmpleados(data.filter((e: Empleado) => !e.isDeleted));
  };

  const fetchAreas = async () => {
    const res = await fetch(`${API_URL}/api/areas`);
    const data = await res.json();
    setAreas(data);
  };

  useEffect(() => {
    fetchEmpleados();
    fetchAreas();
  }, []);

  const editarEmpleado = async (data: Omit<Empleado, "isDeleted">) => {
    if (!editando) return;

    const camposModificados: Partial<Omit<Empleado, "id" | "isDeleted">> = {};

    if (data.nombreCompleto !== editando.nombreCompleto)
      camposModificados.nombreCompleto = data.nombreCompleto;

    if (data.dni !== editando.dni) camposModificados.dni = data.dni;

    if (
      new Date(data.fechaNacimiento).toISOString() !==
      new Date(editando.fechaNacimiento).toISOString()
    )
      camposModificados.fechaNacimiento = new Date(
        data.fechaNacimiento
      ).toISOString();

    if (data.esDesarrollador !== editando.esDesarrollador)
      camposModificados.esDesarrollador = data.esDesarrollador;

    if (data.descripcion !== editando.descripcion)
      camposModificados.descripcion = data.descripcion;

    if (parseInt(data.areaId as any) !== editando.areaId)
      camposModificados.areaId = parseInt(data.areaId as any);

    if (Object.keys(camposModificados).length === 0) {
      console.log("No hay cambios para guardar");
      setEditando(null);
      return;
    }

    const res = await fetch(`${API_URL}/api/empleados/${editando.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(camposModificados),
    });

    if (res.ok) {
      setEditando(null);
      await fetchEmpleados();
    }
  };

  const eliminar = async (id: number) => {
    await fetch(`${API_URL}/api/empleados/${id}`, { method: "DELETE" });
    await fetchEmpleados();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {empleados.map((empleado) => (
        <div
          key={empleado.id}
          className="flex flex-col justify-between h-full p-4 bg-white rounded-lg shadow border border-gray-200"
        >
          <div className="space-y-1">
            <p className="text-lg font-semibold text-gray-800">
              {empleado.nombreCompleto}
            </p>
            <p className="text-sm text-gray-600">DNI: {empleado.dni}</p>
            <p className="text-sm text-gray-600">
              Fecha de nacimiento:{" "}
              {formatearFechaSinTimezone(empleado.fechaNacimiento)}
            </p>
            <p className="text-sm text-gray-600">
              Rol:{" "}
              {empleado.esDesarrollador ? "Desarrollador" : "No desarrollador"}
            </p>
            <p className="text-sm text-gray-600">
              Área:{" "}
              {areas.find((a) => a.id === empleado.areaId)?.nombre ||
                "Área no encontrada"}
            </p>
            <p className="text-sm text-gray-500 italic">
              {empleado.descripcion}
            </p>
          </div>

          <div className="flex gap-3 mt-4 justify-end">
            <button
              onClick={() =>
                setEditando({
                  ...empleado,
                  fechaNacimiento: formatearFechaSinTimezone(
                    empleado.fechaNacimiento
                  ),
                })
              }
              className="text-blue-600 font-medium hover:underline"
            >
              Editar
            </button>
            <button
              onClick={() => empleado.id !== undefined && eliminar(empleado.id)}
              className="text-red-600 font-medium hover:underline"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}

      {editando && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md max-h-full overflow-auto">
            <h2 className="text-lg font-bold mb-4">Editar empleado</h2>
            <EmpleadoForm
              onSubmit={editarEmpleado}
              onCancel={() => setEditando(null)}
              defaultValues={editando}
              areas={areas}
              submitText="Guardar cambios"
            />
          </div>
        </div>
      )}
    </div>
  );
}
