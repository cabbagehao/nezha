import { build } from 'vite';
import fs from 'fs-extra';
import path from 'path';

async function buildPages() {
  // 正常构建
  await build();

  const routes = [
    '/characters',
    '/qa'
  ];

  // 为每个路由复制 index.html
  const distDir = path.resolve(__dirname, '../dist');
  for (const route of routes) {
    const dir = path.join(distDir, route);
    await fs.ensureDir(dir);
    await fs.copy(
      path.join(distDir, 'index.html'),
      path.join(dir, 'index.html')
    );
  }
}

buildPages(); 