// SPDX-License-Identifier: MPL-2.0

import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const vscePath = require.resolve('@vscode/vsce/vsce');
const environment = { ...process.env };

// Keep VSCE's subprocess environment package-manager-neutral, as in lang-pack.
delete environment.npm_config_manage_package_manager_versions;

const args = process.argv.slice(2);
if (args[0] === '--') {
  args.shift();
}

const exitCode = await new Promise((resolve, reject) => {
  const child = spawn(process.execPath, [vscePath, 'package', '--no-dependencies', ...args], {
    env: environment,
    stdio: 'inherit',
  });
  child.once('error', reject);
  child.once('exit', (code) => resolve(code ?? 1));
});

if (exitCode !== 0) {
  process.exitCode = exitCode;
}
