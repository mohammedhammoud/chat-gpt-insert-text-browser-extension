import { defineManifest } from '@crxjs/vite-plugin';

import packageJson from './package.json';

const { version } = packageJson;

const [major, minor, patch, label = '0'] = version
  .replace(/[^\d.-]+/g, '')
  .split(/[.-]/);

export default defineManifest(async () => ({
  action: { default_popup: 'index.html' },
  background: {
    service_worker: 'src/background.ts',
    type: 'module',
  },
  content_scripts: [
    {
      js: ['src/content.tsx'],
      matches: ['*://*/*'],
    },
  ],
  host_permissions: ['https://*.openai.com/'],
  manifest_version: 3,
  name: 'ChatGPT insert text browser extension',
  permissions: ['contextMenus', 'storage'],
  version: `${major}.${minor}.${patch}.${label}`,
  version_name: version,
}));
