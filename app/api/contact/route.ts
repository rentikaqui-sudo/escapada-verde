import { NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

async function getSheet() {
  try {
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID!, serviceAccountAuth);
    await doc.loadInfo();

    let sheet = doc.sheetsByIndex[0];
    if (!sheet) {
      sheet = await doc.addSheet({
        title: 'Leads',
        headerValues: ['Fecha y Hora', 'Nombre', 'WhatsApp', 'Correo', 'Mensaje', 'Finca de Interés'],
      });
    }

    return sheet;
  } catch (err) {
    console.error('Error en conexión con Sheets:', err);
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const sheet = await getSheet();
    if (!sheet) {
      return NextResponse.json({ error: 'No se pudo conectar con Google Sheets' }, { status: 500 });
    }

    await sheet.addRow({
      'Fecha y Hora': new Date().toLocaleString('es-CO'),
      'Nombre': body.name,
      'WhatsApp': body.phone,
      'Correo': body.email,
      'Mensaje': body.message,
      'Finca de Interés': body.property,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error guardando lead:', err);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}


