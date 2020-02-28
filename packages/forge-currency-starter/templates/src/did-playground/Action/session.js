/* eslint-disable object-curly-newline */
import createSessionContext from '@arcblock/did-react/lib/Session';

const { SessionProvider, SessionContext, SessionConsumer, withSession } = createSessionContext('did.playground.token');
export { SessionProvider, SessionContext, SessionConsumer, withSession };
