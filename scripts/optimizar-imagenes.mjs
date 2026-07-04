/**
 * Convierte en bloque todas las imágenes de una carpeta de origen a .webp,
 * dejando el resultado en public/images (o la carpeta que indiques).
 *
 * Úsalo para las imágenes que se referencian como background-image en CSS
 * (los "hero" de cada página) o cualquier otra que viva en public/, ya que
 * esas NO pasan por el pipeline automático de <Image /> de Astro (ese
 * pipeline solo aplica a imágenes importadas desde src/).
 *
 * Uso:
 *   1. npm install sharp --save-dev   (ya está en package.json)
 *   2. Coloca tus fotos originales (jpg/png) en una carpeta, p. ej. "originales/"
 *   3. node scripts/optimizar-imagenes.mjs originales public/images
 */
import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";

const [, , inputDirArg, outputDirArg] = process.argv;
const inputDir = inputDirArg || "originales";
const outputDir = outputDirArg || "public/images";
const CALIDAD = 82; // 75-85 es un buen punto medio calidad/peso
const ANCHO_MAX = 1920; // evita subir imágenes más anchas de lo necesario

const extensionesValidas = new Set([".jpg", ".jpeg", ".png", ".tiff", ".gif"]);

async function main() {
  await mkdir(outputDir, { recursive: true });
  const archivos = await readdir(inputDir);
  const imagenes = archivos.filter((f) =>
    extensionesValidas.has(path.extname(f).toLowerCase())
  );

  if (imagenes.length === 0) {
    console.log(`No se encontraron imágenes en "${inputDir}".`);
    return;
  }

  console.log(`Convirtiendo ${imagenes.length} imágenes a WebP…`);

  for (const archivo of imagenes) {
    const nombreBase = path.basename(archivo, path.extname(archivo));
    // Sugerencia: renombra manualmente a kebab-case sin espacios/acentos
    // antes de correr el script, para que las rutas queden limpias.
    const destino = path.join(outputDir, `${nombreBase}.webp`);

    await sharp(path.join(inputDir, archivo))
      .resize({ width: ANCHO_MAX, withoutEnlargement: true })
      .webp({ quality: CALIDAD })
      .toFile(destino);

    console.log(`  ✓ ${archivo} → ${destino}`);
  }

  console.log("Listo. Actualiza las rutas .jpg/.png a .webp donde corresponda.");
}

main().catch((err) => {
  console.error("Error al optimizar imágenes:", err);
  process.exit(1);
});
