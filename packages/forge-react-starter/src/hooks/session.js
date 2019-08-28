import useAsync from 'react-use/lib/useAsync';
import api from '../libs/api';
import forge from '../libs/sdk';
import { removeToken } from '../libs/auth';

async function fetchSession() {
  try {
    const [{ status, data }, { state }] = await Promise.all([
      api.get('/api/session'),
      forge.getForgeState({}, { ignoreFields: ['state.protocols', /\.txConfig$/, /\.gas$/] }),
    ]);

    if (status === 400) {
      removeToken();
    }

    data.token = state.token;
    return data;
  } catch (err) {
    removeToken();
  }

  return {};
}

export default function useSession() {
  const state = useAsync(fetchSession);
  return state;
}
