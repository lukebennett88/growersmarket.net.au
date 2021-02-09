import { initAuth } from '@lib/init-auth';
import { unsetAuthCookies } from 'next-firebase-auth';

initAuth();

async function handler(req, res) {
  try {
    await unsetAuthCookies(req, res);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return res.status(500).json({ error: 'Unexpected error.' });
  }
  return res.status(200).json({ status: true });
}

export default handler;
