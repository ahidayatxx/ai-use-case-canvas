import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/Common/Button';
import { EmptyState } from '@/components/Common/EmptyState';

export function Templates() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Templates</h1>
              <p className="text-sm text-gray-600 mt-1">
                Pre-built templates for common AI use cases
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <EmptyState
          title="Templates Coming Soon"
          description="Pre-built templates for Predictive Maintenance, Customer Churn, Document Processing, Fraud Detection, and Recommendation Engines will be available here."
          action={
            <Button variant="primary" onClick={() => navigate('/dashboard')}>
              Go to Dashboard
            </Button>
          }
        />
      </div>
    </div>
  );
}
