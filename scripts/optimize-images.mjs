// Converte os PNG/JPEG exportados do Figma em public/images para WebP (largura máx. 1600px).
import { readdir, unlink } from 'node:fs/promises'
import { join, parse } from 'node:path'
import sharp from 'sharp'

const dir = new URL('../public/images/', import.meta.url).pathname
for (const file of await readdir(dir)) {
  const { name, ext } = parse(file)
  if (!['.png', '.jpg', '.jpeg'].includes(ext.toLowerCase())) continue
  const input = join(dir, file)
  await sharp(input)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(join(dir, `${name}.webp`))
  await unlink(input)
  console.log(`${file} -> ${name}.webp`)
}
