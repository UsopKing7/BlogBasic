export const formatearFecha = (fechaIso: string): string => {
  if (!fechaIso) return 'Sin fecha definida'

  try {
    const fecha = new Date(fechaIso)
    return fecha.toLocaleString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  } catch {
    return 'Fecha inválida'
  }
}
