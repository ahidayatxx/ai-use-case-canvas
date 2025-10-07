import jsPDF from 'jspdf';
import type { Canvas } from '@/types/canvas.types';
import { CANVAS_STRUCTURE } from '@/data/canvasStructure';
import { formatDate, formatPhase, formatStatus, formatReadiness } from '../formatting';

/**
 * Export canvas to PDF format
 */
export function exportToPDF(canvas: Canvas): void {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  let yPosition = margin;

  // Helper to add new page if needed
  const checkPageBreak = (requiredSpace: number) => {
    if (yPosition + requiredSpace > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin;
    }
  };

  // Header
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text(canvas.useCaseName, margin, yPosition);
  yPosition += 12;

  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text('AI Use Case Canvas', margin, yPosition);
  yPosition += 15;

  // Metadata
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Metadata', margin, yPosition);
  yPosition += 8;

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  const metadata = [
    `Owner: ${canvas.useCaseOwner}`,
    `Phase: ${formatPhase(canvas.phase)}`,
    `Status: ${formatStatus(canvas.status)}`,
    `Created: ${formatDate(canvas.createdAt)}`,
    `Last Updated: ${formatDate(canvas.updatedAt)}`,
  ];

  metadata.forEach(line => {
    pdf.text(line, margin, yPosition);
    yPosition += 6;
  });

  yPosition += 5;

  // Readiness
  checkPageBreak(30);
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Readiness Assessment', margin, yPosition);
  yPosition += 8;

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  const readiness = [
    `Strategic Layer: ${formatReadiness(canvas.readiness.strategic)}`,
    `Execution Layer: ${formatReadiness(canvas.readiness.execution)}`,
    `Validation Layer: ${formatReadiness(canvas.readiness.validation)}`,
  ];

  readiness.forEach(line => {
    pdf.text(line, margin, yPosition);
    yPosition += 6;
  });

  yPosition += 10;

  // Strategic Layer
  checkPageBreak(20);
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Strategic Layer: WHY & WHAT', margin, yPosition);
  yPosition += 10;

  CANVAS_STRUCTURE.filter(s => s.layer === 'strategic').forEach(sectionDef => {
    const sectionData = canvas.strategic[sectionDef.id as keyof typeof canvas.strategic];
    yPosition = addSectionToPDF(pdf, sectionDef.title, sectionDef.questions, sectionData.answers, margin, contentWidth, yPosition, pageHeight);
  });

  // Execution Layer
  checkPageBreak(20);
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Execution Layer: HOW & WHO', margin, yPosition);
  yPosition += 10;

  CANVAS_STRUCTURE.filter(s => s.layer === 'execution').forEach(sectionDef => {
    const sectionData = canvas.execution[sectionDef.id as keyof typeof canvas.execution];
    yPosition = addSectionToPDF(pdf, sectionDef.title, sectionDef.questions, sectionData.answers, margin, contentWidth, yPosition, pageHeight);
  });

  // Validation Layer
  checkPageBreak(20);
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Validation Layer: MEASURE & GOVERN', margin, yPosition);
  yPosition += 10;

  CANVAS_STRUCTURE.filter(s => s.layer === 'validation').forEach(sectionDef => {
    const sectionData = canvas.validation[sectionDef.id as keyof typeof canvas.validation];
    yPosition = addSectionToPDF(pdf, sectionDef.title, sectionDef.questions, sectionData.answers, margin, contentWidth, yPosition, pageHeight);
  });

  // Footer on last page
  const totalPages = pdf.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    pdf.text(
      `Page ${i} of ${totalPages}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
  }

  // Save PDF
  const filename = `${canvas.useCaseName.replace(/[^a-z0-9]/gi, '_')}_canvas.pdf`;
  pdf.save(filename);
}

/**
 * Add a section to PDF
 */
function addSectionToPDF(
  pdf: jsPDF,
  title: string,
  questions: string[],
  answers: string[],
  margin: number,
  contentWidth: number,
  yPosition: number,
  pageHeight: number
): number {
  const lineHeight = 6;

  // Check if we need a new page for section title
  if (yPosition + 20 > pageHeight - margin) {
    pdf.addPage();
    yPosition = margin;
  }

  // Section title
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text(title, margin, yPosition);
  yPosition += 10;

  // Questions and answers
  questions.forEach((question, index) => {
    // Check space for question
    if (yPosition + 15 > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin;
    }

    // Question
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    const questionLines = pdf.splitTextToSize(question, contentWidth);
    questionLines.forEach((line: string) => {
      pdf.text(line, margin, yPosition);
      yPosition += lineHeight;
    });

    yPosition += 2;

    // Answer
    pdf.setFont('helvetica', 'normal');
    const answer = answers[index] || 'Not answered';
    const answerLines = pdf.splitTextToSize(answer, contentWidth);

    answerLines.forEach((line: string) => {
      if (yPosition + lineHeight > pageHeight - margin) {
        pdf.addPage();
        yPosition = margin;
      }
      pdf.text(line, margin, yPosition);
      yPosition += lineHeight;
    });

    yPosition += 8;
  });

  yPosition += 5;

  return yPosition;
}

/**
 * Alternative: Export using html2canvas approach
 * This is commented out but can be used if you want to capture the actual UI
 */
/*
import html2canvas from 'html2canvas';

export async function exportToPDFFromHTML(elementId: string, filename: string): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Element not found');
    return;
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;
  const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
  const imgX = (pdfWidth - imgWidth * ratio) / 2;
  const imgY = 0;

  pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
  pdf.save(filename);
}
*/
