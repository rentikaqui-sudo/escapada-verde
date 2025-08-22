
import { NextRequest, NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// Inicia la conexión con Google Sheets
const initSheet = async () => {
  try {
    console.log('Initializing Google Sheets connection...');
    const serviceAccountAuth = new JWT({
      // Usa variables de entorno para mayor seguridad
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      // Esta línea es crucial para que los saltos de línea funcionen en Vercel
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    console.log('Connecting to spreadsheet ID:', process.env.GOOGLE_SHEET_ID);
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    console.log('Spreadsheet loaded successfully:', doc.title);
    
    let sheet = doc.sheetsByIndex[0];
    if (!sheet) {
      console.log('Creating new sheet...');
      sheet = await doc.addSheet({ 
        title: 'Leads',
        headerValues: ['Fecha y Hora', 'Nombre', 'WhatsApp', 'Correo', 'Mensaje', 'Finca de Interés', 'Estado']
      });
      console.log('New sheet created');
    } else {
      console.log('Using existing sheet:', sheet.title);
    }
    
    return sheet;
  } catch (error) {
    console.error('Error initializing Google Sheets:', error);
    return null;
  }
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, finca } = body;

    // Valida que los campos requeridos existan
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Nombre, email y mensaje son requeridos' },
        { status: 400 }
      );
    }

    // Lógica para guardar en Google Sheets
    try {
      console.log('Attempting to save to Google Sheets...');
      const sheet = await initSheet();
      if (sheet) {
        console.log('Sheet initialized successfully, adding row...');
        const currentDate = new Date();
        const rowData = {
          'Fecha y Hora': currentDate.toLocaleString('es-CO', {
            year: 'numeric',
            month: '2-digit', 
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'America/Bogota'
          }),
          'Nombre': name,
          'WhatsApp': phone || '',
          'Correo': email,
          'Mensaje': message,
          'Finca de Interés': finca || 'No especificada',
          'Estado': 'Nuevo'
        };
        console.log('Row data:', rowData);
        await sheet.addRow(rowData);
        console.log('Row added successfully to Google Sheets');
      } else {
        console.error('Failed to initialize Google Sheets');
      }
    } catch (sheetsError) {
      console.error('Error saving to Google Sheets:', sheetsError);
      console.error('Sheets error details:', JSON.stringify(sheetsError, null, 2));
    }

    // Genera el mensaje de WhatsApp
    const whatsappMessage = encodeURIComponent(`Hola! Me interesa conocer más sobre Escapada Verde.
Nombre: ${name}
Email: ${email}${phone ? `
WhatsApp: ${phone}` : ''}${finca ? `
Finca de interés: ${finca}` : ''}
${message ? `Mensaje: ${message}` : 'Sin mensaje adicional'}`);
    
    return NextResponse.json({
      success: true,
      whatsappUrl: `https://api.whatsapp.com/send?phone=573218613644&text=${whatsappMessage}`
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
