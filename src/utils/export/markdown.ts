import type { Canvas } from '@/types/canvas.types';
import { CANVAS_STRUCTURE } from '@/data/canvasStructure';
import { formatDate, formatPhase, formatStatus, formatReadiness } from '../formatting';

/**
 * Export canvas to Markdown format
 */
export function exportToMarkdown(canvas: Canvas): string {
  const sections: string[] = [];

  // Header
  sections.push(`# ${canvas.useCaseName}`);
  sections.push('');
  sections.push(`**AI Use Case Canvas**`);
  sections.push('');

  // Metadata
  sections.push('## Metadata');
  sections.push('');
  sections.push(`- **Owner:** ${canvas.useCaseOwner}`);
  sections.push(`- **Phase:** ${formatPhase(canvas.phase)}`);
  sections.push(`- **Status:** ${formatStatus(canvas.status)}`);
  sections.push(`- **Created:** ${formatDate(canvas.createdAt)}`);
  sections.push(`- **Last Updated:** ${formatDate(canvas.updatedAt)}`);
  sections.push('');

  // Readiness
  sections.push('## Readiness Assessment');
  sections.push('');
  sections.push(`- **Strategic Layer:** ${formatReadiness(canvas.readiness.strategic)}`);
  sections.push(`- **Execution Layer:** ${formatReadiness(canvas.readiness.execution)}`);
  sections.push(`- **Validation Layer:** ${formatReadiness(canvas.readiness.validation)}`);
  sections.push('');

  // Tags
  if (canvas.tags.length > 0) {
    sections.push('## Tags');
    sections.push('');
    sections.push(canvas.tags.map(tag => `\`${tag}\``).join(', '));
    sections.push('');
  }

  sections.push('---');
  sections.push('');

  // Strategic Layer
  sections.push('## Strategic Layer: WHY & WHAT');
  sections.push('');
  sections.push('*Define the business case and strategic alignment*');
  sections.push('');

  CANVAS_STRUCTURE.filter(s => s.layer === 'strategic').forEach(sectionDef => {
    const sectionData = canvas.strategic[sectionDef.id as keyof typeof canvas.strategic];
    sections.push(...formatSection(sectionDef.title, sectionDef.questions, sectionData.answers, sectionData.notes));
  });

  sections.push('---');
  sections.push('');

  // Execution Layer
  sections.push('## Execution Layer: HOW & WHO');
  sections.push('');
  sections.push('*Design the solution and mobilize resources*');
  sections.push('');

  CANVAS_STRUCTURE.filter(s => s.layer === 'execution').forEach(sectionDef => {
    const sectionData = canvas.execution[sectionDef.id as keyof typeof canvas.execution];
    sections.push(...formatSection(sectionDef.title, sectionDef.questions, sectionData.answers, sectionData.notes));
  });

  sections.push('---');
  sections.push('');

  // Validation Layer
  sections.push('## Validation Layer: MEASURE & GOVERN');
  sections.push('');
  sections.push('*Ensure responsible AI and continuous improvement*');
  sections.push('');

  CANVAS_STRUCTURE.filter(s => s.layer === 'validation').forEach(sectionDef => {
    const sectionData = canvas.validation[sectionDef.id as keyof typeof canvas.validation];
    sections.push(...formatSection(sectionDef.title, sectionDef.questions, sectionData.answers, sectionData.notes));
  });

  // Footer
  sections.push('---');
  sections.push('');
  sections.push(`*Generated on ${formatDate(new Date())}*`);
  sections.push('');

  return sections.join('\n');
}

/**
 * Format a section for markdown
 */
function formatSection(
  title: string,
  questions: string[],
  answers: string[],
  notes: string
): string[] {
  const lines: string[] = [];

  lines.push(`### ${title}`);
  lines.push('');

  questions.forEach((question, index) => {
    lines.push(`**${question}**`);
    lines.push('');
    const answer = answers[index] || '*Not answered*';
    lines.push(answer);
    lines.push('');
  });

  if (notes && notes.trim().length > 0) {
    lines.push('**Notes:**');
    lines.push('');
    lines.push(notes);
    lines.push('');
  }

  return lines;
}

/**
 * Download markdown file
 */
export function downloadMarkdown(canvas: Canvas): void {
  const markdown = exportToMarkdown(canvas);
  const blob = new Blob([markdown], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${canvas.useCaseName.replace(/[^a-z0-9]/gi, '_')}_canvas.md`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
