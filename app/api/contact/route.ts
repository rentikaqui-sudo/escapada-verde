
import { NextRequest, NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// Simplified file storage for now (in production, use a proper database)
import fs from 'fs';
import path from 'path';

// Initialize Google Sheets
const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_CLIENT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

    console.log('Connecting to spreadsheet ID: 1opSSgrQ6hNhCWWY5pWfmSqa3rMBaB6Ufn_1_wK1AmVI');
    const doc = new GoogleSpreadsheet('1opSSgrQ6hNhCWWY5pWfmSqa3rMBaB6Ufn_1_wK1AmVI', serviceAccountAuth);
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

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Nombre, email y mensaje son requeridos' },
        { status: 400 }
      );
    }

    // Save to local file (simplified for demo - use database in production)
    const contactData = {
      id: Date.now().toString(),
      name,
      email,
      phone: phone || '',
      message,
      finca: finca || '',
      createdAt: new Date().toISOString()
    };

    try {
      const dataDir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      
      const filePath = path.join(dataDir, 'contacts.jsonl');
      const dataLine = JSON.stringify(contactData) + '\n';
      fs.appendFileSync(filePath, dataLine);
    } catch (fileError) {
      console.error('Error saving to file:', fileError);
    }

    // Save to Google Sheets
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

    // Generate WhatsApp message (simplified to avoid rejections)
    const whatsappMessage = encodeURIComponent(`Hola! Me interesa conocer más sobre Escapada Verde.

Nombre: ${name}
Email: ${email}${phone ? `
WhatsApp: ${phone}` : ''}${finca ? `
Finca de interés: ${finca}` : ''}

${message ? `Mensaje: ${message}` : 'Sin mensaje adicional'}`);
    
    return NextResponse.json({
      success: true,
      id: contactData.id,
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
