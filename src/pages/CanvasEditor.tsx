import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCanvas } from '@/hooks/useCanvas';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcut';
import { Canvas } from '@/components/Canvas/Canvas';
import { Modal } from '@/components/Common/Modal';
import { Button } from '@/components/Common/Button';
import { Spinner } from '@/components/Common/Spinner';
import { Alert } from '@/components/Common/Alert';
import { exportToPDF } from '@/utils/export/pdf';
import { downloadJSON } from '@/utils/export/json';
import { downloadMarkdown } from '@/utils/export/markdown';

export function CanvasEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { canvas, loading, error, save, updateCanvas } = useCanvas(id);

  const [showExportModal, setShowExportModal] = useState(false);

  const handleSave = () => {
    save();
  };

  const handleExport = () => {
    setShowExportModal(true);
  };

  // Keyboard shortcuts
  useKeyboardShortcuts([
    {
      shortcut: { key: 's', ctrl: true },
      callback: handleSave,
      enabled: !!canvas,
    },
    {
      shortcut: { key: 'e', ctrl: true },
      callback: handleExport,
      enabled: !!canvas,
    },
    {
      shortcut: { key: 'Escape' },
      callback: () => setShowExportModal(false),
      enabled: showExportModal,
    },
  ]);

  const handleExportFormat = (format: 'pdf' | 'json' | 'markdown') => {
    if (!canvas) return;

    switch (format) {
      case 'pdf':
        exportToPDF(canvas);
        break;
      case 'json':
        downloadJSON(canvas);
        break;
      case 'markdown':
        downloadMarkdown(canvas);
        break;
    }

    setShowExportModal(false);
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spinner size="lg" label="Loading canvas..." />
      </div>
    );
  }

  if (error || !canvas) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <Alert variant="error" title="Error Loading Canvas">
            {error || 'Canvas not found'}
          </Alert>
          <div className="mt-4">
            <Button variant="primary" fullWidth onClick={handleBack}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Canvas
        canvas={canvas}
        onUpdate={updateCanvas}
        onSave={handleSave}
        onExport={handleExport}
        onBack={handleBack}
      />

      {/* Export Modal */}
      <Modal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Export Canvas"
        size="sm"
      >
        <div className="space-y-3">
          <p className="text-sm text-gray-600 mb-4">
            Choose a format to export your canvas:
          </p>

          <Button
            variant="secondary"
            fullWidth
            onClick={() => handleExportFormat('pdf')}
          >
            Export as PDF
          </Button>

          <Button
            variant="secondary"
            fullWidth
            onClick={() => handleExportFormat('markdown')}
          >
            Export as Markdown
          </Button>

          <Button
            variant="secondary"
            fullWidth
            onClick={() => handleExportFormat('json')}
          >
            Export as JSON
          </Button>

          <Button
            variant="ghost"
            fullWidth
            onClick={() => setShowExportModal(false)}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
}
