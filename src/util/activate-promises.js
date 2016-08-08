import es6Promise from 'es6-promise';

// We need to call this function to make Promise() global, the polyfill doesn't do it automatically
es6Promise.polyfill();
