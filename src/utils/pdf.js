import { PDFDocument, PageSizes, StandardFonts, rgb } from "pdf-lib";

export const createPdf = async (title = "PDF Title", author = "PDF Author") => {
  const pdfDoc = await PDFDocument.create();

  // Metadata
  pdfDoc.setTitle(title);
  pdfDoc.setAuthor(author);
  pdfDoc.setSubject("Control de horarios");
  pdfDoc.setKeywords(["horarios", "empleados", "machine learning"]);
  pdfDoc.setProducer("MACHINE LEARNING");
  pdfDoc.setCreator("Sistema de Control de Biométrico");
  pdfDoc.setCreationDate(new Date());
  pdfDoc.setModificationDate(new Date());

  // Fonts
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Page settings
  const page = pdfDoc.addPage(PageSizes.Letter);
  const { width, height } = page.getSize();
  page.setFont(helveticaFont);
  page.setFontSize(10);

  // Title
  const date = new Date();
  const month = date.toLocaleDateString("es", { month: "long" });
  const year = date.getFullYear().toString();

  const titleText = `CONTROL DE HORARIOS MES: ${month.toUpperCase()}`;
  const titleWidth = helveticaBoldFont.widthOfTextAtSize(titleText, 12);
  page.drawText(titleText, {
    x: (width - titleWidth) / 2,
    y: height - 50,
    size: 12,
    font: helveticaBoldFont,
  });
  const yearWidth = helveticaBoldFont.widthOfTextAtSize(year, 10);
  page.drawText(year, {
    x: width - yearWidth - 100,
    y: height - 50,
    font: helveticaBoldFont,
  });

  // Header
  const data = {
    info: {
      Nombre: "Nombre Empleado",
      Empresa: "Machine Learning",
      Turno: "Tarde",
      "Ingreso limite": "9:15 - 14:45",
      "Horas acumuladas": "56 Horas",
    },
    attendance: {
      Retrasos: 1,
      Permisos: 1,
      Faltas: 0,
    },
    summarize: [
      {
        date: "01/2024",
        timekeeping: [
          {
            Fecha: "01/01/2024",
            Entrada: "14:30",
            Salida: "19:30",
            "Horas cumplidas Día": "5",
            "Horas acumuladas Mes": "5",
            "Horas acumuladas Total": "5",
            Atraso: "A tiempo",
          },
          {
            Fecha: "02/01/2024",
            Entrada: "14:30",
            Salida: "19:30",
            "Horas cumplidas Día": "5",
            "Horas acumuladas Mes": "5",
            "Horas acumuladas Total": "5",
            Atraso: "A tiempo",
          },
          {
            Fecha: "03/01/2024",
            Entrada: "14:30",
            Salida: "19:30",
            "Horas cumplidas Día": "5",
            "Horas acumuladas Mes": "5",
            "Horas acumuladas Total": "5",
            Atraso: "A tiempo",
          },
          {
            Fecha: "04/01/2024",
            Entrada: "14:30",
            Salida: "19:30",
            "Horas cumplidas Día": "5",
            "Horas acumuladas Mes": "5",
            "Horas acumuladas Total": "5",
            Atraso: "A tiempo",
          },
          {
            Fecha: "05/01/2024",
            Entrada: "14:30",
            Salida: "19:30",
            "Horas cumplidas Día": "5",
            "Horas acumuladas Mes": "5",
            "Horas acumuladas Total": "5",
            Atraso: "A tiempo",
          },
        ],
      },
      {
        date: "02/2024",
        timekeeping: [
          {
            Fecha: "01/02/2024",
            Entrada: "14:30",
            Salida: "19:30",
            "Horas cumplidas Día": "5",
            "Horas acumuladas Mes": "5",
            "Horas acumuladas Total": "5",
            Atraso: "A tiempo",
          },
          {
            Fecha: "02/02/2024",
            Entrada: "14:30",
            Salida: "19:30",
            "Horas cumplidas Día": "5",
            "Horas acumuladas Mes": "5",
            "Horas acumuladas Total": "5",
            Atraso: "A tiempo",
          },
          {
            Fecha: "03/02/2024",
            Entrada: "14:30",
            Salida: "19:30",
            "Horas cumplidas Día": "5",
            "Horas acumuladas Mes": "5",
            "Horas acumuladas Total": "5",
            Atraso: "A tiempo",
          },
          {
            Fecha: "04/02/2024",
            Entrada: "14:30",
            Salida: "19:30",
            "Horas cumplidas Día": "5",
            "Horas acumuladas Mes": "5",
            "Horas acumuladas Total": "5",
            Atraso: "A tiempo",
          },
          {
            Fecha: "05/02/2024",
            Entrada: "14:30",
            Salida: "19:30",
            "Horas cumplidas Día": "5",
            "Horas acumuladas Mes": "5",
            "Horas acumuladas Total": "5",
            Atraso: "A tiempo",
          },
        ],
      },
    ],
  };

  let lineStartX = width - 562;
  let lineEndX = (width - 50) / 2;
  let lineStartY = height - 72;
  let lineEndY = height - 72;

  let labelTextX = width - 522;
  let labelTextY = height - 70;
  let contentTextX = labelTextX + 65;
  let contentTextY = labelTextY;

  let count = 0;
  for (let key in data.info) {
    const labelText = key + ":";
    const contentText = data.info[key];
    if (count === 0) lineEndX = width - 50;
    else if (lineEndX === width - 50 && count < 2) lineEndX /= 2;
    page.drawLine({
      start: { x: lineStartX, y: lineStartY },
      end: { x: lineEndX, y: lineEndY },
      thickness: 1,
      color: rgb(0, 0, 0),
    });
    page.drawText(labelText, {
      x: labelTextX,
      y: labelTextY,
      color: rgb(0, 0, 0),
      font: helveticaBoldFont,
    });
    page.drawText(contentText, {
      x: contentTextX,
      y: contentTextY,
      color: rgb(0, 0, 0),
    });

    if (count === 2) {
      lineStartX = (width - 50) / 2;
      lineEndX = width - 50;
      lineStartY = height - 72;
      lineEndY = height - 72;

      labelTextX = lineStartX + 70;
      labelTextY = lineStartY + 2;

      contentTextX = labelTextX + 120;
      contentTextY = labelTextY;
    }
    lineStartY = lineEndY -= 15;
    labelTextY = contentTextY -= 15;
    count++;
  }

  labelTextX = width - 522;
  labelTextY = height - 115;
  contentTextX = labelTextX + 65;
  contentTextY = labelTextY;
  for (let key in data.attendance) {
    const labelText = key + ":";
    const contentText = data.attendance[key].toString();
    page.drawText(labelText, {
      x: labelTextX,
      y: labelTextY,
      color: rgb(0, 0, 0),
      font: helveticaBoldFont,
    });
    page.drawText(contentText, {
      x: contentTextX,
      y: contentTextY,
      color: rgb(0, 0, 0),
    });
    labelTextX = labelTextX + 170;
    contentTextX = labelTextX + 65;
  }

  let rectangleX = width - 562;
  let rectangleY = height - 138;
  let rectangleWidth = 32;
  let rectangleHeight = 18;
  labelTextX = rectangleX + 12;
  labelTextY = rectangleY + 4;

  for (let i = 0; i < 32; i++) {
    page.drawRectangle({
      x: rectangleX,
      y: rectangleY,
      width: rectangleWidth,
      height: rectangleHeight,
      borderWidth: 1,
      borderColor: rgb(0, 0, 0),
    });
    page.drawText("", {
      x: labelTextX,
      y: labelTextY,
      color: rgb(0, 0, 0),
    });
    rectangleY -= 18;
    labelTextY -= 18;
  }
  rectangleX += 32;
  rectangleY = height - 138;
  rectangleWidth = 64;

  labelTextX = rectangleX + 30;
  labelTextY = rectangleY + 4;

  for (let i = 0; i < 224; i++) {
    page.drawRectangle({
      x: rectangleX,
      y: rectangleY,
      width: rectangleWidth,
      height: rectangleHeight,
      borderWidth: 1,
      borderColor: rgb(0, 0, 0),
    });
    page.drawText("", {
      x: labelTextX,
      y: labelTextY,
      color: rgb(0, 0, 0),
    });
    rectangleY -= 18;
    labelTextY -= 18;

    if (i != 0 && (i + 1) % 32 === 0) {
      rectangleX += 64;
      rectangleY = height - 138;
      labelTextX = rectangleX + 30;
      labelTextY = rectangleY + 4;
    }
  }

  const pdfBytes = await pdfDoc.save();

  const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
  const pdfUrl = URL.createObjectURL(pdfBlob);

  window.open(pdfUrl, "_blank");
  //   const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
  //   const pdfUrl = URL.createObjectURL(pdfBlob);
  //   const link = document.createElement("a");
  //   link.href = pdfUrl;
  //   link.target = "_blank";
  //   link.setAttribute("download", "documento.pdf");
  //   link.click();
};
