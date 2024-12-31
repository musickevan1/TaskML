/**
 * Development component for populating test data.
 * Only visible in development environment.
 */
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { populateTestTasks } from '../../services/testDataService';
import CyberButton from '../ui/CyberButton';

export default function PopulateTestData() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePopulate = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);

    try {
      await populateTestTasks(user.id);
      window.location.reload(); // Refresh to show new data
    } catch (err) {
      setError('Failed to populate test data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (import.meta.env.PROD) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <CyberButton
        onClick={handlePopulate}
        disabled={loading}
        variant="secondary"
        size="sm"
      >
        {loading ? 'Adding Test Data...' : 'Add Test Data'}
      </CyberButton>
      
      {error && (
        <p className="mt-2 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}