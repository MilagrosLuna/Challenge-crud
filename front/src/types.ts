
export interface Area {
  id: number;
  nombre: string;
}

export interface Empleado {
  id?: number;
  nombreCompleto: string;
  dni: string;
  fechaNacimiento: string;
  esDesarrollador: boolean;
  isDeleted?: boolean; 
  descripcion: string;
  areaId: number;
}
