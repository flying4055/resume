// Gitee Pages 部署脚本：构建生产包 → 推送到远程 pages 分支
// 推送后需到 https://gitee.com/leon4055/resume/pages 手动点「更新」生效
import { execSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');
const tmp = resolve(root, '.deploy-pages');

const run = (cmd, cwd = root) => execSync(cmd, { cwd, stdio: 'inherit' });

console.log('→ 构建生产包…');
run('pnpm build');

if (!existsSync(dist)) throw new Error('dist 不存在，构建失败');

rmSync(tmp, { recursive: true, force: true });
mkdirSync(tmp);
cpSync(dist, tmp, { recursive: true });

console.log('→ 打包 pages 分支…');
run('git init -q', tmp);
run('git checkout -q --orphan pages', tmp);
run('git add -A', tmp);
run('git commit -q -m "deploy: Gitee Pages 构建产物"', tmp);

console.log('→ 推送到 Gitee…');
run('git push -q https://gitee.com/leon4055/resume.git pages', tmp);

rmSync(tmp, { recursive: true, force: true });
console.log('✓ 完成。到 Gitee 仓库 Pages 页面点击「更新」即可生效。');
