import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from './components/Common/ErrorBoundary';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { CanvasEditor } from './pages/CanvasEditor';
import { Templates } from './pages/Templates';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter basename="/ai-use-case-canvas">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/canvas/:id" element={<CanvasEditor />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
