export function formatearFechaSinTimezone(fecha: string | Date) {
  const d = new Date(fecha);
  const año = d.getUTCFullYear();
  const mes = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dia = String(d.getUTCDate()).padStart(2, "0");
  return `${año}-${mes}-${dia}`;
}
