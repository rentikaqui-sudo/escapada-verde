
import { NextRequest, NextResponse } from "next/server";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

// Inicializar Google Sheets
const initSheet = async () => {
  try {
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID!, serviceAccountAuth);
    await doc.loadInfo();

    let sheet = doc.sheetsByIndex[0];
    if (!sheet) {
      sheet = await doc.addSheet({
        title: "Leads",
        headerValues: ["Fecha y Hora", "Nombre", "WhatsApp", "Correo", "Mensaje", "Finca de Interés", "Estado"],
      });
    }

    return sheet;
  } catch (error) {
    console.error("Error initializing Google Sheets:", error);
    return null;
  }
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, finca } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nombre, email y mensaje son requeridos" },
        { status: 400 }
      );
    }

    // Guardar en Google Sheets
    const sheet = await initSheet();
    if (sheet) {
      const currentDate = new Date();
      const rowData = {
        "Fecha y Hora": currentDate.toLocaleString("es-CO", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "America/Bogota",
        }),
        Nombre: name,
        WhatsApp: phone || "",
        Correo: email,
        Mensaje: message,
        "Finca de Interés": finca || "No especificada",
        Estado: "Nuevo",
      };

      await sheet.addRow(rowData);
    }

    const whatsappMessage = encodeURIComponent(
      `Hola! Me interesa conocer más sobre Escapada Verde.

Nombre: ${name}
Email: ${email}${phone ? `\nWhatsApp: ${phone}` : ""}${finca ? `\nFinca de interés: ${finca}` : ""}

${message ? `Mensaje: ${message}` : "Sin mensaje adicional"}`
    );

    return NextResponse.json({
      success: true,
      whatsappUrl: `https://api.whatsapp.com/send?phone=573218613644&text=${whatsappMessage}`,
    });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
