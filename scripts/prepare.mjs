/**
 * Safe husky install: skip when .git is missing (ZIP / non-git clone).
 */
import { accessSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

try {
  accessSync(path.join(root, '.git'));
} catch {
  process.exit(0);
}

const result = spawnSync('npx', ['husky'], {
  cwd: root,
  stdio: 'inherit',
  shell: true,
});
process.exit(result.status ?? 0);
