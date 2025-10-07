# AI Use Case Canvas

A comprehensive web application for planning, executing, and validating AI initiatives through a structured, phase-aware framework.

![AI Use Case Canvas](./public/preview.png)

## Overview

The AI Use Case Canvas helps AI Product Managers, Data Scientists, and Business Stakeholders navigate the AI development lifecycle with a systematic approach. From ideation to optimization, this tool provides guidance through 14 strategic sections organized into 3 layers.

## Features

- **14 Strategic Sections**: Comprehensive framework covering business strategy, execution planning, and validation metrics
- **5 Lifecycle Phases**: Phase-aware guidance (Ideation → POC → Pilot → Production → Optimization)
- **3 Organizational Layers**: Strategic, Execution, and Validation perspectives
- **Real-time Auto-save**: Never lose your work with automatic saving
- **Export Capabilities**: Export canvases as PDF, Markdown, or JSON
- **Template Library**: Pre-built templates for common AI use cases
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Keyboard Shortcuts**: Quick actions with Ctrl+S (save), Ctrl+E (export)
- **Accessibility**: ARIA labels and keyboard navigation support

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v6
- **Storage**: Browser localStorage
- **Icons**: Lucide React
- **Export**: jsPDF, html2canvas

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-canvas
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
ai-canvas/
├── src/
│   ├── components/          # React components
│   │   ├── Canvas/         # Canvas editor components
│   │   ├── Common/         # Reusable UI components
│   │   └── Dashboard/      # Dashboard components
│   ├── data/               # Static data and templates
│   │   ├── canvasStructure.ts   # 14 section definitions
│   │   ├── phaseConfig.ts       # Phase configuration
│   │   └── templates.ts         # Pre-built templates
│   ├── hooks/              # Custom React hooks
│   │   ├── useCanvas.ts         # Canvas state management
│   │   ├── useAutoSave.ts       # Auto-save functionality
│   │   └── useKeyboardShortcut.ts
│   ├── pages/              # Page components
│   │   ├── Home.tsx            # Landing page
│   │   ├── Dashboard.tsx       # Canvas management
│   │   ├── CanvasEditor.tsx    # Canvas editor
│   │   └── Templates.tsx       # Template library
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   │   ├── storage.ts          # localStorage operations
│   │   ├── calculations.ts     # Completion/readiness
│   │   ├── validation.ts       # Zod schemas
│   │   └── export/             # Export utilities
│   └── App.tsx             # Root component
├── public/                 # Static assets
└── package.json
```

## Canvas Structure

### Three Layers

1. **Strategic Layer** (Blue)
   - Business Problem
   - Desired Outcome
   - Value Hypothesis

2. **Execution Layer** (Orange)
   - AI Solution Design
   - Data Requirements
   - Technical Architecture
   - Stakeholder Map
   - Team & Resources
   - Change Management

3. **Validation Layer** (Green)
   - Success Metrics
   - Testing Strategy
   - Risk Assessment
   - AI Governance
   - Scaling & Operations

### Five Phases

1. **Ideation**: Define the problem and value proposition
2. **POC**: Validate technical feasibility
3. **Pilot**: Test with limited users
4. **Production**: Full deployment
5. **Optimization**: Monitor and improve

Each section adapts its guidance based on the current phase.

## Usage Guide

### Creating a Canvas

1. Click **"New Canvas"** on the Dashboard
2. Enter Canvas Name, Use Case Name, and Owner
3. Click **"Create Canvas"**

### Editing a Canvas

1. Select a phase (Ideation, POC, Pilot, Production, or Optimization)
2. Complete sections by answering guiding questions
3. View tips and examples by clicking the info icon
4. Auto-save runs every 2 seconds
5. Manual save with **Ctrl+S** or the Save button

### Exporting a Canvas

1. Click **"Export"** or press **Ctrl+E**
2. Choose format: PDF, Markdown, or JSON
3. File downloads automatically

### Using Templates

1. Navigate to **Templates**
2. Browse available templates
3. Click **"Use Template"** to create a pre-filled canvas

## Keyboard Shortcuts

- **Ctrl+S**: Save canvas
- **Ctrl+E**: Export canvas
- **Escape**: Close modal

## Data Storage

All data is stored locally in your browser's localStorage. No data is sent to external servers. To backup your canvases:

1. Export each canvas as JSON
2. Save JSON files to cloud storage or local backup

To restore:
1. Import JSON files back into the application

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Sections

To add a new section to the canvas:

1. Update `src/types/canvas.types.ts` with new section interface
2. Add section definition to `src/data/canvasStructure.ts`
3. Update `src/utils/canvasFactory.ts` to include in empty canvas
4. Add phase relevance in `src/data/phaseConfig.ts`

### Creating Templates

Add new templates in `src/data/templates.ts`:

```typescript
{
  id: 'template-id',
  name: 'Template Name',
  description: 'Description',
  category: 'category',
  industry: 'Industry',
  aiType: ['AI Type'],
  prefilledSections: {
    // Pre-filled section data
  }
}
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## License

MIT License - see LICENSE file for details

## Acknowledgments

Built with modern web technologies for AI practitioners worldwide.

## Support

For issues, questions, or contributions, please visit the [GitHub repository](https://github.com/yourusername/ai-canvas).

---

**Built for AI Product Managers, Data Scientists, and Business Stakeholders**
