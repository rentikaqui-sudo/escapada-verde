import { NextRequest, NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// Simplified file storage for now (in production, use a proper database)
import fs from 'fs';
import path from 'path';

// Initialize Google Sheets
const initSheet = async () => {
  try {
    console.log('Initializing Google Sheets connection...');
    const serviceAccountAuth = new JWT({
      email: "sheets-service@escapada-verde-leads.iam.gserviceaccount.com",
      key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC2Obj8q1xA0gmJ\nFig8/F32DLjW97UhRSbKve2wnW77L7igX5fWP7kauvjJeOxk9nE8Pt+KHnnm3PXk\nfYdP7VD4G1StN3eVN8cegmu9FKEdbrFdj4NBsOMc5YDiHe4X15G1rFu7ppu80WHp\ngg9iyUFN4nWf40UsfhYdiY4/v3pdcmEtyqM8RVRYuuf4E8K8Z5bGQ3NxtPdNJqWY\nB8zTdc5tQEd+1UY2c8xCYi0JfPEasatYkunwrXxAugpH83AU2VSGV1n+OnoTjN89\nsdC9MWpKYU88ejaCH3uSMVqTu0gUIzY8boEuVmndRQCkyaWPsPkRXtbMbtvl4y5t\nuqcLFTsnAgMBAAECggEAQlaoQB/YMWblfskYs/8B6+m8vtGl2KtWkHdtWR8vQHWi\nhovWeHJxXkhT+vCxSp4nIhIXii5HHaMyR1DlmlTgZbp5bKflOmb4b+R1+XtRnifm\nnRN6asdNHv90GJ1hyL87NgK90IY6axZkyUAGfuWahxKa1K7Fx4lNXspthUqdbvfw\nIhk4AsMjatiu6RdkbGnApsByuy5E08r6wk6Lv03xrAhqGyk6nGjSPQ/unNH/FWqH\nT7R2ah/S8h0XUHAZTrrOthifE1Wm4X4u4eIm+GunNWMhag3FANFDe7KHeSD5fgnX\ndxMfEK9EQOao05sfMUsMVMSUxaLVdJHNrUIF/LGEnQKBgQDZszjJkvWRXktPLSvP\nz5hiXOveomkjtrdXbMc4ZRjUKl7f/K106rsdXSbDnPalN2F/xXbZwUXCC40YS94r\nVULEzKy67c1xE9mfPXtUqJOnguNkCSpzZhz4+g6CJm7GTAeykemSE1vXqG0fFeQ+\n5JmVLxGn6Yw4KRYH6XczDhmirQKBgQDWSMuQuvHRtes8LJ1pzzLBngfFswR472dw\nk6a06YZN3R3uLG+XrhE69xW4l4zpl42lGAztaJZ4t+Bd1LXl96f4q5yxKoCoaszf\n2Wb9q6N//unmydhagJ253rOMIq2ZzOvwEkr4LJwgf+Oru+igp12RZD9K9tNkMibd\nuWKdkzkjowKBgHSZ98qPehQYa0HHMfYmfLoChxtB5gqI7P5YdwQPshLBdvuFfOpo\nZzw9DmwrgDfRx9kFzLipOlHKmhHvYNnY2uBJuCKPCECOnzsZVRttB1jrVBvahPA2\nO0JnvKmdKCvxwRW17WKeF80Umw3RTeUZz+EFyvEiuEXES9aFB6FC5hwpAoGBANEb\nxJr985FkZ6QXHZ3ttmg/IPKKWajyZwzy6VHOOWOujdCoyFVKZkIWcLnsGnSxkmYz\nbBoZYA150pd+Reuem+oM/iHdiiPP5RHlA540ap8zUWoIOvtGW6TQcIImLSbTVMK3\n9zTrw4frhW9HNiHgcWy6WRF8gJlcX5UrndKLoszlAoGBAJiPrT/YdPK5ImFP+5cp\nur2zq98Xp9tAJQezVeom651jcU2uey44VBO0O76J9q3k15daEzb3tluYo2L6ICuM\nkyH4wUAes8Ct3SuPJcza2t2BpbTg0JK75k28pRhmkwcLTfpXHozB0p8MODCGjoE5\nBjG5U3H0U0UYErck8KkyjjEW\n-----END PRIVATE KEY-----\n",
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

