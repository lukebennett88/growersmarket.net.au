import resolveConfig from 'tailwindcss/resolveConfig';

import tailwindConfig from '../../tailwind.config.js';

function getTailwindConfig() {
  return resolveConfig(tailwindConfig);
}

export { getTailwindConfig };
