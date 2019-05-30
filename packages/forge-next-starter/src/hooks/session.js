import useAsync from 'react-use/lib/useAsync';
import api from '../libs/api';
import { removeToken } from '../libs/auth';

async function fetchSession() {
  try {
    const res = await api.get('/api/session');
    if (res.status === 400) {
      removeToken();
    }
    return res.data;
  } catch (err) {
    removeToken();
  }

  return {};
}

export default function useSession() {
  const state = useAsync(fetchSession);
  return state;
}
