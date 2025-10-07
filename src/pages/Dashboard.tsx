import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Grid, List } from 'lucide-react';
import { useCanvases } from '@/hooks/useCanvas';
import { filterCanvases, deleteCanvas as deleteCanvasStorage, duplicateCanvas as duplicateCanvasStorage } from '@/utils/storage';
import type { Phase, ReadinessLevel, CanvasStatus } from '@/types/canvas.types';
import { Button } from '@/components/Common/Button';
import { Modal } from '@/components/Common/Modal';
import { CanvasCard } from '@/components/Dashboard/CanvasCard';
import { SearchBar } from '@/components/Dashboard/SearchBar';
import { FilterPanel } from '@/components/Dashboard/FilterPanel';
import { EmptyState } from '@/components/Common/EmptyState';
import { Spinner } from '@/components/Common/Spinner';

export function Dashboard() {
  const navigate = useNavigate();
  const { canvases, loading, refresh } = useCanvases();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhases, setSelectedPhases] = useState<Phase[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<CanvasStatus[]>([]);
  const [selectedReadiness, setSelectedReadiness] = useState<ReadinessLevel[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showNewCanvasModal, setShowNewCanvasModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [canvasToDelete, setCanvasToDelete] = useState<string | null>(null);

  // New canvas form
  const [newCanvasName, setNewCanvasName] = useState('');
  const [newUseCaseName, setNewUseCaseName] = useState('');
  const [newOwner, setNewOwner] = useState('');

  // Filter canvases
  const filteredCanvases = filterCanvases({
    searchQuery,
    phase: selectedPhases.length > 0 ? selectedPhases : undefined,
    status: selectedStatuses.length > 0 ? selectedStatuses : undefined,
    readiness: selectedReadiness.length > 0 ? selectedReadiness : undefined,
  });

  const handleCreateCanvas = () => {
    if (!newCanvasName || !newUseCaseName || !newOwner) return;

    // Import and use the canvas factory
    import('@/utils/canvasFactory').then(({ createEmptyCanvas }) => {
      const newCanvas = createEmptyCanvas(newCanvasName, newUseCaseName, newOwner);
      import('@/utils/storage').then(({ saveCanvas }) => {
        saveCanvas(newCanvas);
        setShowNewCanvasModal(false);
        setNewCanvasName('');
        setNewUseCaseName('');
        setNewOwner('');
        refresh();
        navigate(`/canvas/${newCanvas.id}`);
      });
    });
  };

  const handleDeleteCanvas = (id: string) => {
    setCanvasToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (canvasToDelete) {
      deleteCanvasStorage(canvasToDelete);
      setShowDeleteModal(false);
      setCanvasToDelete(null);
      refresh();
    }
  };

  const handleDuplicateCanvas = (id: string) => {
    const duplicate = duplicateCanvasStorage(id);
    if (duplicate) {
      refresh();
    }
  };

  const clearFilters = () => {
    setSelectedPhases([]);
    setSelectedStatuses([]);
    setSelectedReadiness([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spinner size="lg" label="Loading canvases..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Canvases</h1>
              <p className="text-sm text-gray-600 mt-1">
                {canvases.length} {canvases.length === 1 ? 'canvas' : 'canvases'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* View Mode Toggle */}
              <div className="hidden sm:flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-white shadow-sm text-gray-900'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  title="Grid view"
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white shadow-sm text-gray-900'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  title="List view"
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              <Button
                variant="primary"
                icon={<Plus className="w-5 h-5" />}
                onClick={() => setShowNewCanvasModal(true)}
              >
                New Canvas
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0 space-y-4">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <FilterPanel
              selectedPhases={selectedPhases}
              selectedStatuses={selectedStatuses}
              selectedReadiness={selectedReadiness}
              onPhaseChange={setSelectedPhases}
              onStatusChange={setSelectedStatuses}
              onReadinessChange={setSelectedReadiness}
              onClearAll={clearFilters}
            />
          </div>

          {/* Canvas Grid/List */}
          <div className="flex-1">
            {filteredCanvases.length === 0 ? (
              <EmptyState
                title={searchQuery || selectedPhases.length > 0 ? 'No canvases found' : 'No canvases yet'}
                description={
                  searchQuery || selectedPhases.length > 0
                    ? 'Try adjusting your search or filters'
                    : 'Create your first AI Use Case Canvas to get started'
                }
                action={
                  !searchQuery && selectedPhases.length === 0 && (
                    <Button
                      variant="primary"
                      icon={<Plus className="w-5 h-5" />}
                      onClick={() => setShowNewCanvasModal(true)}
                    >
                      Create Canvas
                    </Button>
                  )
                }
              />
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {filteredCanvases.map((canvas) => (
                  <CanvasCard
                    key={canvas.id}
                    canvas={canvas}
                    onOpen={(id) => navigate(`/canvas/${id}`)}
                    onDelete={handleDeleteCanvas}
                    onDuplicate={handleDuplicateCanvas}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New Canvas Modal */}
      <Modal
        isOpen={showNewCanvasModal}
        onClose={() => setShowNewCanvasModal(false)}
        title="Create New Canvas"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Canvas Name
            </label>
            <input
              type="text"
              value={newCanvasName}
              onChange={(e) => setNewCanvasName(e.target.value)}
              placeholder="e.g., Customer Churn Prediction"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Use Case Name
            </label>
            <input
              type="text"
              value={newUseCaseName}
              onChange={(e) => setNewUseCaseName(e.target.value)}
              placeholder="e.g., Predict and prevent customer churn"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Owner
            </label>
            <input
              type="text"
              value={newOwner}
              onChange={(e) => setNewOwner(e.target.value)}
              placeholder="Your name"
              className="input-field"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="secondary"
              fullWidth
              onClick={() => setShowNewCanvasModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              fullWidth
              onClick={handleCreateCanvas}
              disabled={!newCanvasName || !newUseCaseName || !newOwner}
            >
              Create Canvas
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Canvas"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete this canvas? This action cannot be undone.
          </p>

          <div className="flex gap-3">
            <Button
              variant="secondary"
              fullWidth
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button variant="danger" fullWidth onClick={confirmDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
