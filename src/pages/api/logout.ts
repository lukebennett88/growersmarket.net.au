import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

function logout(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      expires: new Date(0),
      sameSite: 'strict',
      path: '/',
    })
  );
  res.status(200).json({ success: true });
}

export { logout as default };
