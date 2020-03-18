import { useEffect, useState, useCallback } from 'react';
import requestFromWorker from '../lib/requestFromWorker';

export default function useProjectState(projectId, interval = null) {
  const [state, setState] = useState({
    status: {},
    graph: [],
    delta: {},
  });

  const getState = useCallback(async () => {
    try {
      const res = await requestFromWorker('get-project-state', projectId);
      setState(res);
    } catch (err) {
      console.error('Bad Error:', err);
    }
  }, [projectId]);

  useEffect(() => {
    if (interval !== null) {
      const id = setInterval(getState, interval);
      return () => clearInterval(id);
    } else {
      getState();
    }
  }, [projectId]);

  return {
    ...state,
    reloadProjectState: () => getState(),
  };
}
