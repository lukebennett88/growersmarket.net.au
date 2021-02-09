/* eslint-disable @typescript-eslint/no-floating-promises */
function setTokenCookie(token: string) {
  fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });
}

function removeTokenCookie() {
  fetch('/api/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });
}

export { removeTokenCookie, setTokenCookie };
