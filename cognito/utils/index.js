function decodeCredentials(authorization) {
  // remove "Basic prefix"
  const base64 = authorization.split(' ')[1];
  // decode base64 auth string
  const credentials = Buffer.from(base64, 'base64');
  // split key and secret on ':'
  return credentials.toString('utf-8').split(':');
}

module.exports = { decodeCredentials };
