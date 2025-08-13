
// Sistema de respaldo para Google Sheets usando método público
export interface FormData {
  nombre: string
  numero: string
  correo: string
  fecha: string
  fincaInteres: string
}

export async function saveToLocalStorage(data: FormData) {
  try {
    // Obtener datos existentes
    const existingData = JSON.parse(localStorage.getItem('escapada_verde_leads') || '[]')
    
    // Agregar nuevo registro con timestamp
    const newRecord = {
      ...data,
      timestamp: new Date().toLocaleString('es-CO', {
        timeZone: 'America/Bogota',
        year: 'numeric',
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }),
      id: Date.now()
    }
    
    existingData.push(newRecord)
    
    // Guardar en localStorage
    localStorage.setItem('escapada_verde_leads', JSON.stringify(existingData))
    
    console.log('✅ Lead guardado localmente:', newRecord)
    
    return { success: true, data: newRecord }
  } catch (error) {
    console.error('❌ Error guardando lead:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' }
  }
}

export function getAllLeads() {
  try {
    return JSON.parse(localStorage.getItem('escapada_verde_leads') || '[]')
  } catch {
    return []
  }
}

export function downloadLeadsCSV() {
  const leads = getAllLeads()
  if (leads.length === 0) return
  
  // Crear CSV
  const headers = ['Fecha y Hora', 'Nombre', 'WhatsApp', 'Correo', 'Fecha Deseada', 'Finca de Interés']
  const csvContent = [
    headers.join(','),
    ...leads.map((lead: any) => [
      lead.timestamp,
      lead.nombre,
      lead.numero, 
      lead.correo,
      lead.fecha || 'No especificada',
      lead.fincaInteres || 'No especificada'
    ].map(field => `"${field}"`).join(','))
  ].join('\n')
  
  // Descargar
  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `leads-escapada-verde-${new Date().toISOString().split('T')[0]}.csv`
  a.click()
  window.URL.revokeObjectURL(url)
}
