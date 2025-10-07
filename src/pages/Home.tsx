import { useNavigate } from 'react-router-dom';
import { Plus, BookOpen, Sparkles } from 'lucide-react';
import { Button } from '@/components/Common/Button';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            AI Use Case Canvas
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Plan, execute, and validate AI initiatives with a structured, phase-aware framework.
            From ideation to optimization, manage your AI projects effectively.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              icon={<Plus className="w-5 h-5" />}
              onClick={() => navigate('/dashboard')}
            >
              Get Started
            </Button>
            <Button
              variant="secondary"
              size="lg"
              icon={<BookOpen className="w-5 h-5" />}
              onClick={() => navigate('/templates')}
            >
              Browse Templates
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Sparkles className="w-8 h-8 text-blue-600" />}
            title="14 Strategic Sections"
            description="Comprehensive framework covering business strategy, execution planning, and validation metrics."
          />
          <FeatureCard
            icon={<Sparkles className="w-8 h-8 text-purple-600" />}
            title="5 Lifecycle Phases"
            description="Phase-aware guidance from ideation through POC, pilot, production, to optimization."
          />
          <FeatureCard
            icon={<Sparkles className="w-8 h-8 text-green-600" />}
            title="Real-time Auto-save"
            description="Never lose your work with automatic saving and progress tracking across all sections."
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600 text-sm">
            Built for AI Product Managers, Data Scientists, and Business Stakeholders
          </p>
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-card hover:shadow-lg transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
