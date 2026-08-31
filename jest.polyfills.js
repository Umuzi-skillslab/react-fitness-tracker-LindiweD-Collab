// Polyfills that must load before jsdom / react-router-dom initialize.
// jsdom's test environment doesn't provide TextEncoder/TextDecoder, which
// react-router-dom depends on transitively.
const { TextEncoder, TextDecoder } = require('node:util');

if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder;
}
