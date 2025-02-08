const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImages() {
  const imageDir = path.join(__dirname, '../public/bigposts');
  const files = fs.readdirSync(imageDir);
  
  for (const file of files) {
    if (file.endsWith('.webp')) {
      // 创建小尺寸版本
      await sharp(path.join(imageDir, file))
        .resize(400)
        .webp({ quality: 80 })
        .toFile(path.join(imageDir, file.replace('.webp', '-small.webp')));
        
      // 优化原图
      await sharp(path.join(imageDir, file))
        .webp({ quality: 85 })
        .toFile(path.join(imageDir, `optimized-${file}`));
    }
  }
} 