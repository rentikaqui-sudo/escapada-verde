
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'

export interface FormData {
  nombre: string
  numero: string
  correo: string
  fecha: string
  fincaInteres: string
  timestamp?: string
}

export async function addToGoogleSheets(data: FormData) {
  try {
    console.log('📊 Guardando en Google Sheets:', data)
    
    // Obtener credenciales desde variables de entorno
    const GOOGLE_SHEETS_PRIVATE_KEY = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n')
    const GOOGLE_SHEETS_CLIENT_EMAIL = process.env.GOOGLE_SHEETS_CLIENT_EMAIL
    const GOOGLE_SHEETS_DOCUMENT_ID = process.env.GOOGLE_SHEETS_DOCUMENT_ID || '1opSSgrQ6hNhCWWY5pWfmSqa3rMBaB6Ufn_1_wK1AmVI'
    
    if (!GOOGLE_SHEETS_PRIVATE_KEY || !GOOGLE_SHEETS_CLIENT_EMAIL || !GOOGLE_SHEETS_DOCUMENT_ID) {
      console.log('Google Sheets credentials not configured, skipping...')
      return { success: false, error: 'Credentials not configured' }
    }

    // Configurar autenticación con credenciales reales
    const serviceAccountAuth = new JWT({
      email: GOOGLE_SHEETS_CLIENT_EMAIL,
      key: GOOGLE_SHEETS_PRIVATE_KEY,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    // Conectar con la hoja de cálculo
    const doc = new GoogleSpreadsheet(GOOGLE_SHEETS_DOCUMENT_ID, serviceAccountAuth)
    await doc.loadInfo()

    // Obtener la primera hoja o crearla si no existe
    let sheet = doc.sheetsByIndex[0]
    if (!sheet) {
      sheet = await doc.addSheet({
        title: 'Consultas Escapada Verde',
        headerValues: [
          'Fecha y Hora',
          'Nombre',
          'WhatsApp',
          'Correo',
          'Fecha Deseada',
          'Finca de Interés',
          'Estado'
        ]
      })
    }

    // Verificar si ya tiene headers
    await sheet.loadHeaderRow()
    if (!sheet.headerValues || sheet.headerValues.length === 0) {
      await sheet.setHeaderRow([
        'Fecha y Hora',
        'Nombre', 
        'WhatsApp',
        'Correo',
        'Fecha Deseada',
        'Finca de Interés',
        'Estado'
      ])
    }

    // Agregar la nueva fila
    const timestamp = new Date().toLocaleString('es-CO', {
      timeZone: 'America/Bogota',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })

    await sheet.addRow({
      'Fecha y Hora': timestamp,
      'Nombre': data.nombre,
      'WhatsApp': data.numero,
      'Correo': data.correo,
      'Fecha Deseada': data.fecha || 'No especificada',
      'Finca de Interés': data.fincaInteres || 'No especificada',
      'Estado': 'Nuevo'
    })

    console.log('✅ Datos guardados exitosamente en Google Sheets')
    return { success: true, message: 'Datos guardados exitosamente en Google Sheets' }
    
  } catch (error) {
    console.error('Error adding to Google Sheets:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}
