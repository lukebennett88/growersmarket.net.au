function setTokenCookie(token: string) {
  fetch('/api/login', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });
}

function removeTokenCookie() {
  fetch('/api/logout', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });
}

export { setTokenCookie, removeTokenCookie };
